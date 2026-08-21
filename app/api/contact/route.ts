import { NextResponse } from "next/server";
import { Resend } from "resend";

// The form posts here. Keep everything server-side: the API key must never
// reach the browser, and the recipient address stays out of the page source
// so it cannot be scraped off the client bundle.
export const runtime = "nodejs";

const MAX = { name: 100, email: 200, message: 4000 };

/** Rough shape check — enough to reject junk before spending an API call. */
function validate(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name) return { error: "Please enter your name." };
  if (name.length > MAX.name) return { error: "That name is too long." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (email.length > MAX.email) return { error: "That email address is too long." };
  if (message.length < 10) return { error: "Please write at least a few words." };
  if (message.length > MAX.message) return { error: "That message is too long." };

  return { data: { name, email, message } };
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a hidden field no human ever fills in. Answer 200 so bots
  // cannot tell they were caught and retry with a different shape.
  if (String(body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { name, email, message } = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Configuration gap, not the visitor's fault — say so plainly and log it
    // so the cause is obvious in the server output.
    console.error("[contact] RESEND_API_KEY or CONTACT_TO is not set");
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email me directly." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      // Hitting reply in the inbox answers the visitor, not the robot address.
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `${name} <${email}>\n\n${message}`,
      html:
        `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    if (error) {
      console.error("[contact] resend rejected the send:", error);
      return NextResponse.json({ error: "Could not send the message. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected failure:", err);
    return NextResponse.json({ error: "Could not send the message. Please try again." }, { status: 500 });
  }
}
