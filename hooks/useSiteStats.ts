import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SiteStat } from '../types';

export function useSiteStats() {
  const [data, setData] = useState<SiteStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('site_stats')
        .select('*')
        .order('sort_order');

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          label: r.label,
          value: r.value,
          suffix: r.suffix,
          subDetail: r.sub_detail,
          color: r.color,
          sortOrder: r.sort_order,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
