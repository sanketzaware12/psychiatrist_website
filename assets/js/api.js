/* Provisional API layer. Backend developer: confirm endpoints and payloads, then edit ONLY this file.
   Leave API_BASE_URL empty until a real backend exists: forms then show a demo state and never claim data was saved. */
const API_BASE_URL = ""; // e.g. "http://localhost:8080" in development
const API_ENDPOINTS = { appointment: "/api/appointments", contact: "/api/contact-inquiries" };
const API_FIELDS = {
  appointment: ["fullName", "mobile", "email", "date", "slot", "type", "message", "consent"],
  contact: ["name", "email", "message"]
};
async function apiSubmit(kind, data) {
  if (!API_BASE_URL) return { demo: true };
  const body = {};
  API_FIELDS[kind].forEach(k => { body[k] = data[k]; });
  try {
    const res = await fetch(API_BASE_URL + API_ENDPOINTS[kind], {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
    });
    let json = null; try { json = await res.json(); } catch (e) {}
    if (res.ok) return { ok: true, data: json };
    if (res.status === 400 || res.status === 422) return { validation: (json && json.errors) || {}, message: json && json.message };
    return { error: "server" };
  } catch (e) { return { error: "network" }; }
}
