// src/pages/account/MyAccount.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  updateUserProfile,
  changePassword,
  uploadAvatar,
} from "../../apis/user";
import { toast } from "react-toastify";
import { setUser } from "../../store/userSlice";
import { vietnamProvinces, districts } from "../../constants/vietnamProvinces";

const MyAccount = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // ✅ Validation schema
  const validationSchema = Yup.object({
    firstname: Yup.string().required("Tên là bắt buộc"),
    lastname: Yup.string().required("Họ là bắt buộc"),
    email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    mobile: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
    state: Yup.string().required("Vui lòng chọn tỉnh/thành phố"),
  });

  // ✅ Load dữ liệu user khi mở trang
  useEffect(() => {
    if (currentUser) {
      setInitialValues({
        firstname: currentUser.firstname || "",
        lastname: currentUser.lastname || "",
        email: currentUser.email || "",
        mobile: currentUser.mobile || "",
        address: currentUser.address || "",
        city: currentUser.city || "",
        state: currentUser.state || "",
        zipcode: currentUser.zipcode || "",
      });

      if (currentUser.state && districts[currentUser.state]) {
        setAvailableDistricts(districts[currentUser.state]);
      }
      if (currentUser.avatar) {
        setAvatarPreview(currentUser.avatar); // ✅ Load avatar khi vào trang
      }
    }
  }, [currentUser]);

  // ✅ Khi đổi tỉnh/thành phố
  const handleStateChange = (stateCode, setFieldValue) => {
    setFieldValue("state", stateCode);
    setFieldValue("city", "");
    if (stateCode && districts[stateCode]) {
      setAvailableDistricts(districts[stateCode]);
    } else {
      setAvailableDistricts([]);
    }
  };

  // ✅ Submit cập nhật profile
  const handleSubmitProfile = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await updateUserProfile(values);
      if (response?.data?.success) {
        dispatch(setUser(response.data.user));
        toast.success("Cập nhật thông tin thành công!");
      } else {
        toast.error("Cập nhật thông tin thất bại!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật!");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // ✅ Đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận không khớp!");
      return;
    }

    try {
      const response = await changePassword({ currentPassword, newPassword });
      if (response?.data?.success) {
        toast.success("Đổi mật khẩu thành công!");
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Đổi mật khẩu thất bại!");
    }
  };

  // ✅ Upload avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      toast.error("Vui lòng chọn ảnh trước!");
      return;
    }
    toast.info("Đang upload avatar, vui lòng chờ..."); // ✅ Hiện thông báo chờ
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await uploadAvatar(formData);
      if (response?.data?.success) {
        dispatch(setUser(response.data.user));
        toast.success("Cập nhật avatar thành công!");
        setAvatarFile(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload avatar thất bại!");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-10">
      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Thông Tin Cá Nhân</h1>
        </div>
        <div className="p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitProfile}
            enableReinitialize={true}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="space-y-6">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Tên *</label>
                    <Field
                      name="firstname"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.firstname && touched.firstname && (
                      <p className="text-red-500 text-sm">{errors.firstname}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Họ *</label>
                    <Field
                      name="lastname"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.lastname && touched.lastname && (
                      <p className="text-red-500 text-sm">{errors.lastname}</p>
                    )}
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Email *</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Số điện thoại *</label>
                    <Field
                      name="mobile"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.mobile && touched.mobile && (
                      <p className="text-red-500 text-sm">{errors.mobile}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm mb-1">Địa chỉ</label>
                  <Field
                    as="textarea"
                    name="address"
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {/* Province / District / Zip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">
                      Tỉnh/Thành phố *
                    </label>
                    <Field
                      as="select"
                      name="state"
                      className="w-full px-3 py-2 border rounded-md"
                      onChange={(e) =>
                        handleStateChange(e.target.value, setFieldValue)
                      }
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {vietnamProvinces.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Quận/Huyện</label>
                    <Field
                      as="select"
                      name="city"
                      className="w-full px-3 py-2 border rounded-md"
                      disabled={availableDistricts.length === 0}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {availableDistricts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Mã bưu điện</label>
                    <Field
                      name="zipcode"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {loading ? "Đang cập nhật..." : "Cập nhật"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Đổi mật khẩu</h2>
        </div>
        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Mật khẩu hiện tại</label>
            <input
              type="password"
              name="currentPassword"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md"
            >
              Lưu mật khẩu
            </button>
          </div>
        </form>
      </div>

      {/* Upload Avatar */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Ảnh đại diện</h2>
        </div>
        <div className="p-6 space-y-4">
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          <div className="flex justify-end">
            <button
              onClick={handleUploadAvatar}
              className="px-6 py-2 bg-purple-600 text-white rounded-md"
            >
              Lưu ảnh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
