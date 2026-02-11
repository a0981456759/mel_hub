import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const token = process.env.CRYPTOPANIC_TOKEN;

    if (!token) {
        return res.status(500).json({ error: 'CRYPTOPANIC_TOKEN not configured' });
    }

    // Build query params from request, but always override auth_token with server-side value
    const params = new URLSearchParams({
        auth_token: token,
        public: 'true',
        kind: (req.query.kind as string) || 'news',
        filter: (req.query.filter as string) || 'hot',
        currencies: (req.query.currencies as string) || 'BTC,ETH,SOL',
        regions: (req.query.regions as string) || 'en',
    });

    try {
        const response = await fetch(
            `https://cryptopanic.com/api/developer/v2/posts/?${params.toString()}`
        );

        if (!response.ok) {
            return res.status(response.status).json({ error: `CryptoPanic API returned ${response.status}` });
        }

        const data = await response.json();

        // Cache for 12 hours on Vercel CDN
        res.setHeader('Cache-Control', 's-maxage=43200, stale-while-revalidate=3600');
        return res.status(200).json(data);
    } catch (err: any) {
        return res.status(500).json({ error: err.message || 'Failed to fetch from CryptoPanic' });
    }
}
