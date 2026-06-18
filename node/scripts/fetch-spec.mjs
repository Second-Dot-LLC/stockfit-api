// Snapshot the public OpenAPI spec into ./openapi.json (the generator's input).
// Default source is production; override with STOCKFIT_SPEC_URL for a local dev server,
// e.g. STOCKFIT_SPEC_URL=http://localhost:5000/docs/openapi.json npm run fetch-spec
import fs from 'fs';

const url = process.env.STOCKFIT_SPEC_URL || 'https://api.stockfit.io/docs/openapi.json';

const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to fetch spec from ${url}: ${res.status} ${res.statusText}`);
const spec = await res.json();

const pathCount = Object.keys(spec.paths ?? {}).length;
fs.writeFileSync('openapi.json', JSON.stringify(spec, null, 2) + '\n');
console.log(`Wrote openapi.json from ${url} (${pathCount} paths)`);
