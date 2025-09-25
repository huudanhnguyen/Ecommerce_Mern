import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SliderForm from '../../../components/forms/SliderForm';
import { createSlider } from '../../../services/slider';

const SliderCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await createSlider(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Slider created successfully');
        navigate('/admin/sliders');
      } else {
        toast.error('Failed to create slider');
      }
    } catch (error) {
      console.error('Error creating slider:', error);
      toast.error(error.response?.data?.message || 'Failed to create slider');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <SliderForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default SliderCreate;
