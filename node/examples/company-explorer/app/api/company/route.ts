import {NextRequest, NextResponse} from 'next/server';
import {createClient, companyDetails} from '@stockfit/api';

// Configure the SDK once, on the server, with the secret token. Because this
// module only runs in the Next.js server runtime, the token never reaches the
// browser — the page calls THIS route, and this route calls StockFit.
const token = process.env.STOCKFIT_TOKEN;
if (token) createClient({token});

export async function GET(req: NextRequest) {
    if (!token) {
        return NextResponse.json({error: 'STOCKFIT_TOKEN is not set on the server'}, {status: 500});
    }

    const symbol = req.nextUrl.searchParams.get('symbol')?.trim();
    if (!symbol) {
        return NextResponse.json({error: 'Provide a ?symbol= query parameter'}, {status: 400});
    }

    const {data, error, response} = await companyDetails({query: {symbol}});

    if (error || !data) {
        const status = response?.status ?? 502;
        const message = status === 404 || status === 400 ? `No company found for "${symbol}"` : 'Upstream API error';
        return NextResponse.json({error: message}, {status});
    }

    return NextResponse.json(data);
}
