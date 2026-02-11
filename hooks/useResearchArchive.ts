import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ResearchArchiveItem } from '../types';

export function useResearchArchive() {
  const [data, setData] = useState<ResearchArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('research_archive_items')
        .select('*')
        .order('date', { ascending: false });

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          fileId: r.file_id,
          title: r.title,
          excerpt: r.excerpt,
          date: r.date,
          sector: r.sector,
          riskLevel: r.risk_level,
          status: r.status,
          security: r.security,
          tokens: r.tokens,
          readTime: r.read_time,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
