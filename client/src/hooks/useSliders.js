import { useState, useEffect } from 'react';
import { getSliders } from '../services/slider';

export const useSliders = (params = {}) => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSliders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getSliders({
        isActive: true,
        ...params
      });
      
      if (response.data.success) {
        setSliders(response.data.sliders);
      } else {
        setError('Failed to fetch sliders');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch sliders');
      console.error('Error fetching sliders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, [JSON.stringify(params)]);

  return {
    sliders,
    loading,
    error,
    refetch: fetchSliders
  };
};

export default useSliders;
