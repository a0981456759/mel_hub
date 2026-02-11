import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../types';

export function useTeamMembers() {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('team_members')
        .select('*')
        .order('id');

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          code: r.code,
          status: r.status,
          name: r.name,
          role: r.role,
          specialty: r.specialty,
          bio: r.bio,
          image: r.image,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
