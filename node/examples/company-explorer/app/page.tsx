'use client';

import {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import type {CompanyDetails} from '@stockfit/api';

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function domainFrom(url?: string | null): string | null {
    if (!url) return null;
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return null;
    }
}

// StockFit's logoUrl isn't always populated. When it's missing, fall back to the
// company's favicon (via Google) derived from its website domain.
function logoFor(company: CompanyDetails): string | null {
    if (company.logoUrl) return company.logoUrl;
    const domain = domainFrom(company.webUrl);
    return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;
}

export default function Home() {
    const [symbol, setSymbol] = useState('');
    const [company, setCompany] = useState<CompanyDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const q = symbol.trim();
        if (!q) return;
        setLoading(true);
        setError(null);
        setCompany(null);
        setSearched(true);
        try {
            const res = await fetch(`/api/company?symbol=${encodeURIComponent(q)}`);
            const body = await res.json();
            if (!res.ok) setError(body.error ?? 'Something went wrong');
            else setCompany(body as CompanyDetails);
        } catch {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <h1>Company Explorer</h1>
            <p className="subtitle">Search any US ticker. Powered by the StockFit API SDK (token stays on the server).</p>

            <form onSubmit={onSubmit}>
                <input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Ticker, e.g. AAPL"
                    aria-label="Ticker symbol"
                    autoFocus
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching…' : 'Search'}
                </button>
            </form>

            {error && <p className="message error">{error}</p>}
            {!error && !company && searched && !loading && <p className="message">No results.</p>}

            {company && (
                <article className="card">
                    <div className="card-head">
                        {logoFor(company) && (
                            <img
                                className="logo"
                                src={logoFor(company)!}
                                alt={`${company.name} logo`}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        )}
                        <div>
                            <h2>{company.name}</h2>
                            <div className="tags">
                                {(company.symbols ?? []).map((s, i) => {
                                    const exchange = company.exchanges?.[i];
                                    return (
                                        <span className="tag" key={`${s}:${exchange ?? i}`}>
                                            {exchange ? `${s}:${exchange}` : s}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <Field label="Sector" value={company.sector} />
                        <Field label="Industry" value={company.industry} />
                        <Field label="Employees" value={company.employees?.toLocaleString()} />
                        <Field
                            label="Headquarters"
                            value={[company.city, company.state, company.country].filter(Boolean).join(', ')}
                        />
                        <Field label="Fiscal year end" value={company.fiscalYearEndMonth ? MONTHS[company.fiscalYearEndMonth] : undefined} />
                        <Field label="IPO date" value={company.ipoDate} />
                    </div>

                    {company.description && (
                        <div className="description">
                            <ReactMarkdown>{company.description}</ReactMarkdown>
                        </div>
                    )}

                    {company.webUrl && (
                        <p style={{marginTop: 16}}>
                            <a href={company.webUrl} target="_blank" rel="noreferrer">
                                {company.webUrl}
                            </a>
                        </p>
                    )}
                </article>
            )}
        </main>
    );
}

function Field({label, value}: {label: string; value?: string | null}) {
    if (!value) return null;
    return (
        <div>
            <div className="field-label">{label}</div>
            <div className="field-value">{value}</div>
        </div>
    );
}
