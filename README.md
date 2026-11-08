# Public privacy policy — deployment handoff

For a **single-file HTML/CSS policy**, use `../privacy-policy.html`. It embeds all typography, artwork and styles, includes English only, and does not need JavaScript or companion files. Upload that one file to a public HTTPS host and enter its final public URL in Console. It has the same reviewed policy content and hosting-log qualifications as this multi-file site.

This is a standalone HTML/CSS/JavaScript site, with English only, responsive navigation, print styling and an English policy readable without JavaScript. No npm install or build is required. Fonts and logo are local. The supplied site has no cookies, localStorage, forms, trackers, analytics or remote runtime dependencies.

Upload this entire directory to your chosen public HTTPS host. Enter the final direct page URL in Google Play Console. Confirm HTTP 200, no login, no geographic block, no download response, working fonts/assets and mobile readability. A private preview or local file is not a public policy URL.

Before publishing, review the host/CDN's technical logs, retention and access settings. The policy distinguishes those connection logs from the offline app. It does not assert that the website host collects nothing. Set host protections appropriate to that provider. Suggested common headers: `X-Content-Type-Options: nosniff` and `Referrer-Policy: no-referrer`.

For this **multi-file** site, a suggested CSP is `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'`.

The **standalone `privacy-policy.html`** uses inline CSS and data-URI images/fonts. A matching CSP is `default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`. Configure these as HTTP response headers and test your final host; provider defaults may need adjustment.

The public page contains publisher-supplied contact details: **abdoucartage@outlook.com**, **+212634569876**, and the company address. The same details are in the app and offline policy. No verification email or call was sent. Enter the email in Google Play's mandatory support field and monitor the selected channels. The policy explains that separate support correspondence is handled outside the offline app.

Edit `policy-content.json`, then run `python tool/build_policy_site.py` from the project root to regenerate `index.html`, `policy-data.js`, `PRIVACY.md` and the English offline in-app policy file together. The build helper does not deploy anything. Rebuild the Flutter app after changing bundled policy files.
