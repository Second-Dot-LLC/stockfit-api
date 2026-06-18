import {client} from './generated/client.gen';

// Re-export the generated endpoint functions and types. We deliberately do NOT
// re-export the generated barrel (./generated) to avoid colliding with the
// hey-api `createClient`/`client` symbols — our own `createClient` is the public one.
export * from './generated/sdk.gen';
export * from './generated/types.gen';

export interface StockFitClientOptions {
    /** Your StockFit API token (looks like `fl_...`). */
    token: string;
    /** Override the API base URL. Defaults to the production endpoint. */
    baseUrl?: string;
}

const DEFAULT_BASE_URL = 'https://api.stockfit.io/v1';

/**
 * Configure the SDK with your API token. Call this once before using any
 * endpoint function; every generated function shares the configured client.
 *
 * ```ts
 * import {createClient, incomeStatement} from '@stockfit/api';
 *
 * createClient({token: process.env.STOCKFIT_TOKEN!});
 * const {data} = await incomeStatement({query: {symbol: 'AAPL'}});
 * ```
 */
export function createClient(options: StockFitClientOptions) {
    client.setConfig({
        baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
        headers: {
            Authorization: `Bearer ${options.token}`,
        },
    });
    return client;
}
