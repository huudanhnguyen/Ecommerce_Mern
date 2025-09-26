import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateUserProfile, getCurrentUser } from '../../apis/user';
import { toast } from 'react-toastify';
import { setUser } from '../../store/userSlice';
import { vietnamProvinces, districts } from '../../constants/vietnamProvinces';

const MyAccount = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  });

  // Validation schema
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(2, 'Tên phải có ít nhất 2 ký tự')
      .max(50, 'Tên không được quá 50 ký tự')
      .required('Tên là bắt buộc'),
    lastname: Yup.string()
      .min(2, 'Họ phải có ít nhất 2 ký tự')
      .max(50, 'Họ không được quá 50 ký tự')
      .required('Họ là bắt buộc'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
    mobile: Yup.string()
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ')
      .required('Số điện thoại là bắt buộc'),
    address: Yup.string()
      .min(10, 'Địa chỉ phải có ít nhất 10 ký tự')
      .max(200, 'Địa chỉ không được quá 200 ký tự'),
    city: Yup.string()
      .min(2, 'Thành phố phải có ít nhất 2 ký tự')
      .max(50, 'Thành phố không được quá 50 ký tự'),
    state: Yup.string()
      .required('Vui lòng chọn tỉnh/thành phố'),
    zipcode: Yup.string()
      .matches(/^[0-9]{5,6}$/, 'Mã bưu điện không hợp lệ')
  });

  // Load user data
  useEffect(() => {
    if (currentUser) {
      setInitialValues({
        firstname: currentUser.firstname || '',
        lastname: currentUser.lastname || '',
        email: currentUser.email || '',
        mobile: currentUser.mobile || '',
        address: currentUser.address || '',
        city: currentUser.city || '',
        state: currentUser.state || '',
        zipcode: currentUser.zipcode || ''
      });
      
      // Load districts for current state
      if (currentUser.state && districts[currentUser.state]) {
        setAvailableDistricts(districts[currentUser.state]);
      }
    }
  }, [currentUser]);

  // Handle state change
  const handleStateChange = (stateName, setFieldValue) => {
    setFieldValue('state', stateName);
    setFieldValue('city', ''); // Reset city when state changes
    
    if (stateName && districts[stateName]) {
      setAvailableDistricts(districts[stateName]);
    } else {
      setAvailableDistricts([]);
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await updateUserProfile(values);
      if (response?.data?.success) {
        dispatch(setUser(response.data.user));
        toast.success('Cập nhật thông tin thành công!');
      } else {
        toast.error('Cập nhật thông tin thất bại!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Có lỗi xảy ra khi cập nhật thông tin!');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Tài Khoản Của Tôi</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin cá nhân và tài khoản của bạn</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông Tin Cá Nhân</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                        Tên *
                      </label>
                      <Field
                        type="text"
                        id="firstname"
                        name="firstname"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstname && touched.firstname ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nhập tên của bạn"
                      />
                      {errors.firstname && touched.firstname && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ *
                      </label>
                      <Field
                        type="text"
                        id="lastname"
                        name="lastname"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastname && touched.lastname ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nhập họ của bạn"
                      />
                      {errors.lastname && touched.lastname && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông Tin Liên Hệ</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nhập email của bạn"
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                        Số Điện Thoại *
                      </label>
                      <Field
                        type="tel"
                        id="mobile"
                        name="mobile"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.mobile && touched.mobile ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nhập số điện thoại"
                      />
                      {errors.mobile && touched.mobile && (
                        <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Địa Chỉ</h2>
                  <div className="space-y-4">
                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Địa Chỉ
                      </label>
                      <Field
                        as="textarea"
                        id="address"
                        name="address"
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address && touched.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nhập địa chỉ chi tiết"
                      />
                      {errors.address && touched.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* State */}
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          Tỉnh/Thành Phố *
                        </label>
                        <Field
                          as="select"
                          id="state"
                          name="state"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.state && touched.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                          onChange={(e) => handleStateChange(e.target.value, setFieldValue)}
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {vietnamProvinces.map((province) => (
                            <option key={province.code} value={province.name}>
                              {province.name}
                            </option>
                          ))}
                        </Field>
                        {errors.state && touched.state && (
                          <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          Quận/Huyện
                        </label>
                        <Field
                          as="select"
                          id="city"
                          name="city"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.city && touched.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          disabled={availableDistricts.length === 0}
                        >
                          <option value="">Chọn quận/huyện</option>
                          {availableDistricts.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </Field>
                        {errors.city && touched.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>

                      {/* Zipcode */}
                      <div>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
                          Mã Bưu Điện
                        </label>
                        <Field
                          type="text"
                          id="zipcode"
                          name="zipcode"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.zipcode && touched.zipcode ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Mã bưu điện"
                        />
                        {errors.zipcode && touched.zipcode && (
                          <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Đang cập nhật...' : 'Cập Nhật Thông Tin'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

