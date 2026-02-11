import { useState, useEffect } from 'react';

interface CryptoNewsItem {
    id: string;
    title: string;
    published_at: string;
    source: string;
    currencies: string[];
    sentiment: 'bullish' | 'bearish' | 'neutral';
    votes: { positive: number; negative: number };
}

interface CacheData {
    items: CryptoNewsItem[];
    fetchedAt: number;
}

const CACHE_KEY = 'mel-cryptopanic-cache';
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours in ms

function getCachedData(): CacheData | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const cached: CacheData = JSON.parse(raw);
        if (Date.now() - cached.fetchedAt > CACHE_TTL) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
        return cached;
    } catch {
        return null;
    }
}

function setCachedData(items: CryptoNewsItem[]) {
    const cacheData: CacheData = { items, fetchedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

function getSentiment(votes: { positive?: number; negative?: number }): 'bullish' | 'bearish' | 'neutral' {
    const pos = votes?.positive || 0;
    const neg = votes?.negative || 0;
    if (pos > neg && pos >= 3) return 'bullish';
    if (neg > pos && neg >= 3) return 'bearish';
    return 'neutral';
}

export function useCryptoNews() {
    const [data, setData] = useState<CryptoNewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cached = getCachedData();
        if (cached) {
            setData(cached.items);
            setLoading(false);
            return;
        }

        const fetchNews = async () => {
            try {
                const isDev = import.meta.env.DEV;
                let url: string;

                if (isDev) {
                    // Dev: use Vite proxy with client-side token
                    const token = import.meta.env.VITE_CRYPTOPANIC_TOKEN;
                    if (!token) {
                        setError('CRYPTOPANIC_TOKEN_NOT_SET');
                        setLoading(false);
                        return;
                    }
                    url = `/api/cryptopanic/posts/?auth_token=${token}&public=true&kind=news&filter=hot&currencies=BTC,ETH,SOL&regions=en`;
                } else {
                    // Production: use Vercel serverless function (token is server-side, never exposed)
                    url = `/api/cryptopanic?kind=news&filter=hot&currencies=BTC,ETH,SOL&regions=en`;
                }

                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`API_STATUS_${res.status}`);
                }

                const json = await res.json();
                const results = json.results || [];

                const items: CryptoNewsItem[] = results.map((r: any) => ({
                    id: String(r.id),
                    title: r.title || 'UNTITLED',
                    published_at: r.published_at || '',
                    source: r.source?.title || 'UNKNOWN',
                    currencies: (r.instruments || r.currencies || []).map((c: any) => c.code),
                    sentiment: getSentiment(r.votes || {}),
                    votes: {
                        positive: r.votes?.positive || 0,
                        negative: r.votes?.negative || 0,
                    },
                }));

                setCachedData(items);
                setData(items);
            } catch (err: any) {
                setError(err.message || 'FETCH_FAILED');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return { data, loading, error };
}
