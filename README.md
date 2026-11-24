# SmartBiz Africa

A mobile-responsive marketplace MVP for discovering and listing services, built as a static web app that can be published with GitHub Pages.

## Included in this MVP
- Responsive landing page and service marketplace
- Search by keyword, category and Kenyan location
- Demo account creation (browser local storage only)
- Create and save demo service listings (browser local storage only)
- WhatsApp contact links for providers
- Installable PWA shell and basic offline caching
- No build tools or paid dependencies required

## Run locally
Open `index.html` in a browser, or use a local static server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a GitHub repository named `smartbiz-africa`.
2. Upload all project files and folders from this ZIP to the repository root (not the ZIP file itself).
3. Commit the files to the `main` branch.
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch **main** and folder **/(root)**, then Save.
7. Wait for GitHub Pages to publish. The expected URL is `https://YOUR-USERNAME.github.io/smartbiz-africa/`.

For a user site repository named `YOUR-USERNAME.github.io`, the URL instead is `https://YOUR-USERNAME.github.io/`.

## Important: MVP limitations
This is a frontend prototype, not yet a production marketplace. Accounts and listings are stored in the visitor's browser and are not shared between users or devices. Demo data is not secure authentication. WhatsApp links are contact shortcuts, not in-app messaging. No real payments, subscriptions, payouts, database, admin moderation, identity verification or server-side security are implemented.

Before accepting real customers or money, add:
- A backend API (for example Laravel/PHP) and MySQL database
- Secure password hashing, sessions/tokens, validation, rate limiting and role-based access
- Provider verification, listing moderation, reporting and privacy/terms pages
- M-Pesa Daraja integration on a secure server; never put consumer keys, passkeys or secrets in frontend code or GitHub
- Payment status verification, refunds, reconciliation, audit logs and customer support
- Backups, HTTPS, monitoring and Kenyan data-protection compliance

## Suggested next milestones
1. Backend API and shared MySQL data
2. Real customer/provider registration and login
3. Provider profile pages, bookings and enquiries
4. M-Pesa STK Push and verified payment webhooks
5. Admin moderation and recurring provider subscriptions
6. Capacitor Android packaging after the web app is stable

## License
Add a license file before accepting external contributions. Choose a license deliberately based on how you want others to reuse the code.
