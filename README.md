[Preview](<Screenshot 2026-06-16 194431.png>)

## Admin workspace

The admin application uses a separate route-group layout from the public
storefront. Admin pages require a signed, HTTP-only session cookie.

Configure these server-only environment variables before signing in:

- `ADMIN_EMAIL` — the administrator email address.
- `ADMIN_PASSWORD` — a strong, unique admin password.
- `ADMIN_SESSION_SECRET` — a random secret of at least 32 characters. Generate
  one with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`.

The deployment returns an unavailable response for admin sign-in until all
three variables are configured. Never expose them through `NEXT_PUBLIC_*`
variables or commit their values.

The existing Products, Orders, Customers, and Settings screens still use
client-side demo data; they are not connected to a production database. The
dashboard reports unavailable sales and inventory metrics rather than using
sample numbers. Persistent store operations require a database and order API.