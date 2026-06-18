import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Company Explorer · StockFit API',
    description: 'Search SEC-registered companies with the StockFit API SDK.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
