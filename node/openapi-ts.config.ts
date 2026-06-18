import {defineConfig} from '@hey-api/openapi-ts';

// Generates a typed fetch client from the committed openapi.json snapshot.
// Refresh the snapshot with `npm run fetch-spec` (optionally STOCKFIT_SPEC_URL=...).
export default defineConfig({
    input: './openapi.json',
    output: {
        path: './src/generated',
    },
    plugins: ['@hey-api/client-fetch'],
});
