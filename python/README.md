# stockfit-api

Official Python SDK for the [StockFit API](https://developer.stockfit.io): SEC EDGAR financials, filings, fund and ETF data, ownership, insider transactions, and earnings.

Fully typed, generated from the StockFit OpenAPI spec. Sync and async, built on `httpx`.

## Install

```bash
pip install stockfit-api
```

Requires Python 3.9+.

## Usage

```python
from stockfit_api import AuthenticatedClient
from stockfit_api.api.company import company_details
from stockfit_api.api.financials import income_statement
from stockfit_api.models import IncomeStatementPeriod

client = AuthenticatedClient(base_url="https://api.stockfit.io/v1", token="fl_...")

profile = company_details.sync(client=client, symbol="AAPL")
print(profile.name)

income = income_statement.sync(client=client, symbol="AAPL", period=IncomeStatementPeriod.ANNUAL)
print(income)
```

Endpoint functions are grouped by area under `stockfit_api.api.*` (e.g. `company`, `financials`, `etfmf`, `sec_filings`, `ownership`, `earnings`, `price`). Query parameters are plain keyword arguments. Parameters with a fixed set of values (like `period`) are typed enums in `stockfit_api.models` (e.g. `IncomeStatementPeriod.ANNUAL`).

### Async

Every endpoint also exposes an async variant:

```python
profile = await company_details.asyncio(client=client, symbol="AAPL")
```

## Authentication

Get an API token from your [StockFit developer account](https://developer.stockfit.io). `AuthenticatedClient` sends it as a Bearer token automatically.

## License

MIT, Copyright Second Dot LLC. Use of the StockFit API itself is governed by the StockFit terms of service and your subscription.
