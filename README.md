# Pruvia Static Site

## Local development

Run the Vite app only:

```bash
npm run dev
```

Run the full Netlify-style app locally, including `/.netlify/functions/*`:

```bash
npx netlify-cli dev
```

To test the signup flow without sending real welcome emails, use dry-run mode:

```bash
$env:SKIP_WELCOME_EMAIL="true"
npx netlify-cli dev
```

Then open the local Netlify URL, submit an email, and check the terminal logs for:

```text
Dry run: skipped welcome email to parent@example.com
```

Production still requires `SMTP_USER` and `SMTP_PASS` in Netlify environment variables.

## Booking QR tracking

Use a placement-specific URL as the destination encoded in each QR code:

```text
https://YOUR-DOMAIN/book/crc
https://YOUR-DOMAIN/book/library
```

The `/book/:source` route records the scan in the Netlify Blobs store named
`booking-scans`, then redirects to the Microsoft Bookings page. Each event stores
the source, UTC timestamp, UTM campaign fields, referrer, user agent, likely-bot
flag, request ID, and coarse location when Netlify provides it. Raw IP addresses,
coordinates, and postal codes are not stored.

Sources may contain lowercase letters, numbers, underscores, and hyphens (up to
50 characters), so new placements can be created without code changes. Invalid
sources are recorded as `unknown`.

To override the booking destination without changing code, set the Netlify
environment variable:

```text
BOOKING_URL=https://outlook.office.com/book/your-booking-page
```

Stored events can be viewed in the Netlify dashboard under Blobs. Tracking
failures are logged but never block the redirect.

## Validation

```bash
npm run build
npm run lint
```
