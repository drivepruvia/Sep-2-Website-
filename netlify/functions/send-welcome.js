import nodemailer from "nodemailer";

const RECENT_SEND_TTL_MS = 10 * 60 * 1000;
const recentSends = new Map();
const BETA_URL = "https://drivepruvia.com/beta";
const BOOKING_URL = "https://drivepruvia.com/book-email";
const DARK_EMAIL = process.env.WELCOME_EMAIL_THEME?.toLowerCase() !== "light";
const EMAIL_COLORS = DARK_EMAIL
  ? { canvas: "#0c1216", card: "#11191e", ink: "#f0f3f5", muted: "#aab5bc", line: "#35434b", footer: "#080d10", footerMuted: "#aab5bc" }
  : { canvas: "#eff2f4", card: "#f9fafb", ink: "#172325", muted: "#596266", line: "#d6dcdf", footer: "#172325", footerMuted: "#cbd3d7" };

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

  if (recentSends.has(email) && process.env.NETLIFY_DEV !== "true") {
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
  <body style="margin:0; padding:0; background:${EMAIL_COLORS.canvas}; font-family:Arial, Helvetica, sans-serif; color:${EMAIL_COLORS.ink};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${EMAIL_COLORS.canvas}; padding:36px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px; background:${EMAIL_COLORS.card}; border-top:4px solid #0248f7;">
            <tr>
              <td style="padding:32px 36px 22px; border-bottom:1px solid ${EMAIL_COLORS.line};">
                <div style="font-size:22px; letter-spacing:-0.04em; color:${EMAIL_COLORS.ink}; font-weight:800;">PRUVIA</div>
                <div style="margin-top:8px; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${EMAIL_COLORS.muted}; font-weight:700;">Better practice. Together.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:42px 36px;">
                <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:#0248f7; font-weight:700;">Early access</div>
                <h1 style="margin:14px 0 22px; color:${EMAIL_COLORS.ink}; font-size:40px; line-height:1.08; letter-spacing:-0.04em; font-weight:700;">You're in.<br />Let's hit the road.</h1>
                <p style="margin:0 0 18px; font-size:17px; line-height:1.65;">Hi ${safeName},</p>
                <p style="margin:0 0 18px; font-size:17px; line-height:1.65; color:${EMAIL_COLORS.muted};">Pruvia gives parents a clear practice plan, simple coaching prompts, and a way to follow progress toward the road test.</p>
                <p style="margin:0 0 18px; font-size:17px; line-height:1.65; color:${EMAIL_COLORS.muted};">The current beta is an early lesson experience. Your feedback will help us make the full program clearer and more useful for families.</p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:26px 0;">
                  <tr>
                    <td style="border-radius:4px; background:#0248f7;">
                      <a href="${BETA_URL}" style="display:inline-block; padding:16px 22px; color:#ffffff; text-decoration:none; font-size:16px; font-weight:700;">Try the Pruvia beta &nbsp;↗</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:30px 0 10px; font-size:15px; line-height:1.65; color:${EMAIL_COLORS.muted};">Want to help shape what comes next?</p>
                <p style="margin:0; font-size:16px; line-height:1.65;"><a href="${BOOKING_URL}" style="color:#0248f7; font-weight:700;">Book a 25-minute call &nbsp;↗</a></p>
                <p style="margin:26px 0 0; padding-top:22px; border-top:1px solid ${EMAIL_COLORS.line}; font-size:14px; line-height:1.65; color:${EMAIL_COLORS.muted};">You can also reply directly to this email with feedback or questions.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 36px; background:${EMAIL_COLORS.footer}; color:${EMAIL_COLORS.footerMuted}; font-size:13px; line-height:1.7;">For the day they drive on their own.<br /><span style="color:#ffffff; font-weight:700;">The Pruvia team</span></td>
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
