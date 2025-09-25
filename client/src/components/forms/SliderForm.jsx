import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: Yup.string()
    .max(500, 'Description must be less than 500 characters'),
  link: Yup.string()
    .url('Must be a valid URL'),
  buttonText: Yup.string()
    .max(50, 'Button text must be less than 50 characters'),
  position: Yup.number()
    .min(0, 'Position must be 0 or greater'),
  type: Yup.string()
    .oneOf(['banner', 'slider', 'advertisement'], 'Invalid type'),
  isActive: Yup.boolean(),
  startDate: Yup.date(),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after start date')
});

const SliderForm = ({ initialData, onSubmit, loading = false }) => {
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  const [imageFile, setImageFile] = useState(null);

  const initialFormik = {
    title: initialData?.title || '',
    description: initialData?.description || '',
    link: initialData?.link || '',
    buttonText: initialData?.buttonText || '',
    position: initialData?.position || 0,
    type: initialData?.type || 'banner',
    isActive: initialData?.isActive ?? true,
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
    image: null
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      setImageFile(file);
      setFieldValue('image', file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (setFieldValue) => {
    setImageFile(null);
    setImagePreview(null);
    setFieldValue('image', null);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      formData.append('link', values.link || '');
      formData.append('buttonText', values.buttonText || '');
      formData.append('position', values.position.toString());
      formData.append('type', values.type);
      formData.append('isActive', values.isActive.toString());
      formData.append('startDate', values.startDate || '');
      formData.append('endDate', values.endDate || '');
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await onSubmit(formData);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error('Failed to save slider');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {initialData ? 'Edit Slider' : 'Create New Slider'}
        </h2>

        <Formik
          enableReinitialize
          initialValues={initialFormik}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                  placeholder="Enter slider title"
                />
                {errors.title && touched.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                  placeholder="Enter slider description"
                />
                {errors.description && touched.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Link and Button Text */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                    Link URL
                  </label>
                  <Field
                    type="url"
                    id="link"
                    name="link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                    placeholder="https://example.com"
                  />
                  {errors.link && touched.link && (
                    <p className="mt-1 text-sm text-red-600">{errors.link}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <Field
                    type="text"
                    id="buttonText"
                    name="buttonText"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                    placeholder="Learn More"
                  />
                  {errors.buttonText && touched.buttonText && (
                    <p className="mt-1 text-sm text-red-600">{errors.buttonText}</p>
                  )}
                </div>
              </div>

              {/* Type and Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <Field
                    as="select"
                    id="type"
                    name="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                  >
                    <option value="banner">Banner</option>
                    <option value="slider">Slider</option>
                    <option value="advertisement">Advertisement</option>
                  </Field>
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <Field
                    type="number"
                    id="position"
                    name="position"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                  />
                  {errors.position && touched.position && (
                    <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                  )}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <Field
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <Field
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                  />
                  {errors.endDate && touched.endDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-32 w-auto object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(setFieldValue)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-main hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-main"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image"
                              name="image"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, setFieldValue)}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  className="h-4 w-4 text-main focus:ring-main border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-main hover:bg-blue-700"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {initialData ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    initialData ? 'Update Slider' : 'Create Slider'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SliderForm;
