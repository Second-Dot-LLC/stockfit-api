# @stockfit/api

Official TypeScript / Node.js SDK for the [StockFit API](https://api.stockfit.io) — SEC EDGAR financials, filings, fund and ETF data, ownership, insider transactions, and earnings.

Fully typed, generated from the StockFit OpenAPI spec.

## Install

```bash
npm install @stockfit/api
```

Requires Node.js 18+ (uses the built-in `fetch`).

## Authentication

Get an API token from your [StockFit account](https://api.stockfit.io). Configure the client once, then call any endpoint function:

```ts
import {createClient, incomeStatement, companyDetails} from '@stockfit/api';

createClient({token: process.env.STOCKFIT_TOKEN!});

const income = await incomeStatement({query: {symbol: 'AAPL'}});
console.log(income.data);

const profile = await companyDetails({query: {symbol: 'AAPL'}});
console.log(profile.data);
```

Tree-shakeable: import only the endpoints you use.

## Configuration

```ts
createClient({
    token: 'fl_...',
    baseUrl: 'https://api.stockfit.io/v1', // optional override
});
```

## License

MIT © Second Dot LLC. Use of the StockFit API itself is governed by the StockFit terms of service / subscription.
