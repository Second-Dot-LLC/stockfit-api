"""Snapshot the public OpenAPI spec into ./openapi.json (the generator's input).

Default source is production; override with STOCKFIT_SPEC_URL for a local dev server, e.g.
    STOCKFIT_SPEC_URL=http://localhost:5000/docs/openapi.json python scripts/fetch_spec.py
"""
import json
import os
import urllib.request

url = os.environ.get("STOCKFIT_SPEC_URL", "https://api.stockfit.io/docs/openapi.json")

with urllib.request.urlopen(url) as resp:
    spec = json.load(resp)

with open("openapi.json", "w", encoding="utf-8") as f:
    json.dump(spec, f, indent=2)
    f.write("\n")

print(f"Wrote openapi.json from {url} ({len(spec.get('paths', {}))} paths)")
