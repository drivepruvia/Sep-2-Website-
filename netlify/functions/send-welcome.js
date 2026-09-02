import nodemailer from "nodemailer";

const RECENT_SEND_TTL_MS = 10 * 60 * 1000;
const recentSends = new Map();
const BETA_URL = "https://drivepruvia.com/beta";
const BOOKING_URL = "https://drivepruvia.com/book-email";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanupRecentSends(now) {
  for (const [email, expiresAt] of recentSends.entries()) {
    if (expiresAt <= now) recentSends.delete(email);
  }
}

export async function handler(event) {
  if (!event.body) {
    return { statusCode: 200, body: "send-welcome function is alive" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const data = body.payload?.data || body.data || body;
  const email = normalizeEmail(data.email);
  const name = String(data.name || "there").trim() || "there";

  if (!email) {
    return { statusCode: 400, body: "Missing email" };
  }

  const now = Date.now();
  cleanupRecentSends(now);

  if (recentSends.has(email)) {
    return { statusCode: 200, body: "Welcome email already sent recently" };
  }

  const isLocalDryRun =
    process.env.SKIP_WELCOME_EMAIL === "true" ||
    (process.env.NETLIFY_DEV === "true" &&
      (!process.env.SMTP_USER || !process.env.SMTP_PASS));

  if (isLocalDryRun) {
    recentSends.set(email, now + RECENT_SEND_TTL_MS);
    console.log(`Dry run: skipped welcome email to ${email}`);
    return { statusCode: 200, body: "Welcome email skipped in local dry run" };
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return { statusCode: 500, body: "SMTP credentials are not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: "mail.spacemail.com",
    port: 465,
    secure: true,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const safeName = escapeHtml(name);

  try {
    await transporter.sendMail({
    from: `"DrivePruvia" <${process.env.SMTP_USER}>`,
    to: email,
    bcc: "drivepruvia@protonmail.com",
    subject: "You're in — welcome to the Pruvia beta",
    text: `Hi ${name},

You're in — Welcome to the Drive Pruvia beta.

Pruvia breaks down DMV requirements, creates a structured practice plan based on your family's needs and those requirements, and tracks progress toward the road test.

Right now, we're testing our early beta. Your experience with it will help us make the full program clearer and more useful for families.

Sign up for the beta:
${BETA_URL}

If you're a parent, guardian, or teen driver, we'd love to hear what practice driving feels like from your side of the passenger seat. You can talk with us before or during testing, or simply share your experience in general.

Share feedback or book a 25-minute call:
${BOOKING_URL}

You can also reply directly to this email.

The DrivePruvia Team`,
    html: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to the Pruvia beta</title>
  </head>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, Helvetica, sans-serif; color:#172033;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fb; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 18px 45px rgba(23,32,51,0.08);">
            <tr>
              <td style="background:#172033; padding:34px 32px;">
                <div style="font-size:14px; letter-spacing:0.16em; text-transform:uppercase; color:#8fd3ff; font-weight:700;">DrivePruvia</div>
                <h1 style="margin:14px 0 0; color:#ffffff; font-size:32px; line-height:1.15; font-weight:800;">You're in — welcome to the beta.</h1>
                <p style="margin:14px 0 0; color:#d9e4f2; font-size:16px; line-height:1.6;">A calmer, more structured way to coach a teen driver starts here.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px;">
                <p style="margin:0 0 18px; font-size:17px; line-height:1.65;">Hi ${safeName},</p>
                <p style="margin:0 0 18px; font-size:17px; line-height:1.65;">Pruvia breaks down DMV requirements, creates a structured practice plan based on your family's needs and those requirements, and tracks progress toward the road test.</p>
                <p style="margin:0 0 18px; font-size:17px; line-height:1.65;">Right now, we're testing one lesson plan. Your experience with it will help us make the full program clearer and more useful for families.</p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:26px 0;">
                  <tr>
                    <td style="border-radius:999px; background:#2563eb;">
                      <a href="${BETA_URL}" style="display:inline-block; padding:14px 24px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:700;">Sign Up for the Beta</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 18px; font-size:17px; line-height:1.65;">If you're a parent, guardian, or teen driver, we'd love to hear what practice driving feels like from your side of the passenger seat. You can talk with us before or during testing, or simply share your experience in general.</p>
                <p style="margin:0; font-size:15px; line-height:1.65;"><a href="${BOOKING_URL}" style="color:#2563eb; font-weight:700;">Share feedback or book a 25-minute call</a></p>
                <p style="margin:24px 0 0; font-size:15px; line-height:1.65; color:#5f6b7a;">Prefer email? Just reply with any thoughts or questions. Every bit of feedback helps us build something more useful.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px; background:#f0f4f9; color:#6b7788; font-size:13px; line-height:1.6;">Thank you for helping us build DrivePruvia.<br />The DrivePruvia Team</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });
  } catch (error) {
    console.error("Welcome email delivery failed", {
      code: error?.code,
      command: error?.command,
      message: error instanceof Error ? error.message : String(error),
    });
    return { statusCode: 502, body: "Welcome email delivery failed" };
  }

  recentSends.set(email, now + RECENT_SEND_TTL_MS);
  return { statusCode: 200, body: "Welcome email sent" };
}
