import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ResearchReport } from '../types';

export function useResearchReports() {
  const [data, setData] = useState<ResearchReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('research_reports')
        .select('*')
        .order('date', { ascending: false });

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          impact: r.impact,
          date: r.date,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
