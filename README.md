# Psychiatrist Clinic Website (frontend)
Static HTML/CSS/vanilla JS. No build step. Run: `python3 -m http.server 8000`, open http://localhost:8000
Pages: index, about, services, book-consultation, contact, privacy, terms.

## Edit
- Clinic name, doctor, address, phone, email, hours and testimonials are DUMMY data: replace before launch. Privacy and Terms are DRAFTS needing clinic/legal approval.
- Images: assets/images/*.svg are sample illustrations (dummy). Swap each <img src="assets/images/x.svg"> for a real photo when available.
- Confirm Online Consultation is offered, or remove it (index, services, footer).
- Header/footer markup is repeated on each page; keep them identical when editing.
- Testimonials are sample placeholders. Replace with real, consented ones or remove.

## Backend contract (provisional, for the Spring Boot developer)
Set `API_BASE_URL` in `assets/js/api.js` (empty = demo mode, nothing sent or saved). Endpoint paths and field lists live only in that file.
- `POST /api/appointments`: `{"fullName":"Sample Person","mobile":"+910000000000","email":"sample@example.com","date":"2026-11-05","slot":"Morning (9am–12pm)","type":"Psychiatric Consultation","message":"","consent":true}`
- `POST /api/contact-inquiries`: `{"name":"Sample Person","email":"sample@example.com","message":"Hello"}`
- Success: `201 {"id":123,"status":"PENDING"}`. Validation: `400/422 {"message":"...","errors":{"mobile":"Invalid number"}}` (keys = field names). Other errors: 5xx.
- CORS: allow the frontend dev origin (e.g. http://localhost:8000) for POST and `Content-Type`.
- Incomplete until integration: saving requests, confirmations, everything admin.
- Admin (separate secure Spring Boot module): login, list/view bookings, update status, manage services, testimonials, inquiries, approved content. No admin exists in this frontend.
- Forms never store data in localStorage, URLs or logs.

## Self-Check (assessment.html)
Private PHQ-9 / GAD-7 screening, one question per screen, gauge result, tips, crisis card (Tele-MANAS 14416, 112), WhatsApp share, print/PDF. Nothing is stored or sent. Clinic WhatsApp number is set once in assets/js/whatsapp.js (`WA_NUMBER`) and used by the floating button and Self-Check. Verify crisis numbers before launch.

## Calm Corner and WhatsApp confirm
calm.html: 4s in / 6s out guided breathing (1/2/5 min), linked from Self-Check result and footer. Booking: after a successful request (or demo mode) a card offers a pre-filled WhatsApp confirmation (assets/js/booking-wa.js). Number set in assets/js/whatsapp.js.

## Popups (overlays)
Book a Consultation, Self-Check quiz/result and Calm Corner open as popups (assets/js/modals.js + assets/css/modals.css). Any link to book-consultation.html or calm.html opens the popup on every page; the standalone pages still work if opened directly. Booking form markup lives in modals.js (ids prefixed bk-); form logic is shared via forms.js.

## Home hero background
Image: assets/images/hero-bg.jpg, styles in assets/css/hero-bg.css. Swap the file (same name) to change it. Use a 1920px-wide image for large screens.

## Premium design layer
`assets/css/premium.css` + `assets/js/premium.js` (linked last on every page) re-colour the site and add hover effects and animations. Content and card shapes are unchanged. Colours are the variables at the top of premium.css (`--sl`, `--gold`, `--ink`...). To go back to the old look, remove those two includes from the pages.
