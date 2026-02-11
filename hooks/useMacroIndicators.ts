import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MacroIndicator } from '../types';

export function useMacroIndicators() {
  const [data, setData] = useState<MacroIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('macro_indicators')
        .select('*')
        .order('date');

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          date: r.date,
          time: r.time,
          region: r.region,
          impact: r.impact,
          indicator: r.indicator,
          estimate: r.estimate,
          actual: r.actual,
          previous: r.previous,
          status: r.status,
          signal: r.signal,
          briefing: r.briefing,
          impactTargets: r.impact_targets,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
