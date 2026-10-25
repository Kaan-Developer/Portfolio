const base = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
if (!base || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_KEY");
  process.exit(2);
}
const url = `${base}/functions/v1/contact`;
const run = Date.now();
let failed = 0;

async function call(label, init, expected) {
  const res = await fetch(url, init);
  const ok = res.status === expected;
  if (!ok) failed++;
  console.log(`${ok ? "OK  " : "FAIL"} ${label}: got ${res.status}, expected ${expected}`);
}
const post = (body, headers = { apikey: key }) => ({
  method: "POST",
  headers: { "Content-Type": "application/json", ...headers },
  body: typeof body === "string" ? body : JSON.stringify(body),
});
const valid = (email) => ({ name: "Smoke", email, subject: "project", message: "smoke test" });

await call("no apikey", post(valid("smoke-x@example.invalid"), {}), 401);
await call("GET rejected", { method: "GET", headers: { apikey: key } }, 405);
await call("malformed JSON", post("{not json"), 400);
await call("invalid email", post(valid("a@")), 400);
await call("invalid subject", post({ ...valid("smoke-x@example.invalid"), subject: "hack" }), 400);
await call("message too long", post({ ...valid("smoke-x@example.invalid"), message: "x".repeat(1001) }), 400);
await call("honeypot filled", post({ ...valid("smoke-x@example.invalid"), website: "bot" }), 200);

const email = `smoke-${run}@example.invalid`;
for (let i = 1; i <= 4; i++) {
  await call(`rate limit request ${i}`, post(valid(email)), i <= 3 ? 200 : 429);
}
process.exit(failed ? 1 : 0);
