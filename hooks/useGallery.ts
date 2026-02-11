import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { GalleryItem } from '../types';

export function useGallery() {
  const [data, setData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('gallery_items')
        .select('*')
        .order('id');

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          camId: r.cam_id,
          location: r.location,
          timestamp: r.timestamp,
          imageUrl: r.image_url,
          description: r.description,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
