import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SliderForm from '../../../components/forms/SliderForm';
import { getSliderById, updateSlider } from '../../../services/slider';

const SliderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        setFetching(true);
        const response = await getSliderById(id);
        if (response.data.success) {
          setSlider(response.data.slider);
        } else {
          toast.error('Failed to fetch slider');
          navigate('/admin/sliders');
        }
      } catch (error) {
        console.error('Error fetching slider:', error);
        toast.error('Failed to fetch slider');
        navigate('/admin/sliders');
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchSlider();
    }
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await updateSlider(id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Slider updated successfully');
        navigate('/admin/sliders');
      } else {
        toast.error('Failed to update slider');
      }
    } catch (error) {
      console.error('Error updating slider:', error);
      toast.error(error.response?.data?.message || 'Failed to update slider');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main"></div>
      </div>
    );
  }

  if (!slider) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Slider not found</h2>
          <button
            onClick={() => navigate('/admin/sliders')}
            className="px-4 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Sliders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <SliderForm 
        initialData={slider} 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </div>
  );
};

export default SliderEdit;
