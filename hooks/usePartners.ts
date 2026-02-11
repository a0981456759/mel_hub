import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Partner } from '../types';

export function usePartners() {
    const [data, setData] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data: rows, error: err } = await supabase
                .from('partners')
                .select('*')
                .order('sort_order', { ascending: true });

            if (err) {
                setError(err.message);
            } else if (rows) {
                setData(rows.map((r: any) => ({
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    logoUrl: r.logo_url,
                    website: r.website,
                    socialX: r.social_x,
                    socialInstagram: r.social_instagram,
                    socialLinkedin: r.social_linkedin,
                    sortOrder: r.sort_order,
                })));
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return { data, loading, error };
}
