// src/components/Admin/UserForm.jsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { buildFormData } from "../../utils/buildFormData";
import Avatar from "../Avatar";

const UserForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [previewAvatar, setPreviewAvatar] = useState("");

  // xử lý preview ảnh khi load initialData
  useEffect(() => {
    if (initialData) {
      setPreviewAvatar(initialData.avatar || "");
    }
  }, [initialData]);

  // initial values
  const initialFormik = {
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    mobile: initialData?.mobile || "",
    role: initialData?.role || "user",
    isBlocked: initialData?.isBlocked ?? false,
    // giữ avatar hiện có trong values để khi update gửi về backend
    avatar: initialData?.avatar || null,
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialFormik}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, values }) => {
        const handleAvatarChange = (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setFieldValue("avatar", file);
          const url = URL.createObjectURL(file);
          setPreviewAvatar(url);
        };

        const removeAvatar = () => {
          setFieldValue("avatar", null);
          setPreviewAvatar("");
        };

        return (
          <Form className="space-y-4">
            {/* First Name + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <Field 
                name="firstName" 
                placeholder="First Name" 
                className="border p-2 w-full rounded" 
              />
              <Field 
                name="lastName" 
                placeholder="Last Name" 
                className="border p-2 w-full rounded" 
              />
            </div>

            {/* Email + Mobile */}
            <div className="grid grid-cols-2 gap-4">
              <Field 
                name="email" 
                type="email" 
                placeholder="Email" 
                className="border p-2 w-full rounded" 
              />
              <Field 
                name="mobile" 
                placeholder="Mobile" 
                className="border p-2 w-full rounded" 
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-1 font-semibold">Role</label>
              <Field as="select" name="role" className="border p-2 w-full rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
            </div>

            {/* isBlocked */}
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                <Field type="checkbox" name="isBlocked" />
                Blocked
              </label>
            </div>

            {/* Avatar */}
            <div>
              <label className="block mb-1 font-semibold">Avatar</label>
              <div className="flex items-center gap-4">
                {previewAvatar ? (
                  <div className="relative inline-block">
                    <img 
                      src={previewAvatar} 
                      alt="avatar" 
                      className="w-28 h-28 object-cover rounded-full border" 
                    />
                    <button 
                      type="button" 
                      onClick={removeAvatar} 
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <Avatar
                    name={initialData?.firstName || "User"}
                    size="2xl"
                    showBorder={true}
                  />
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button 
                type="submit" 
                disabled={loading} 
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                {loading ? "⏳ Processing..." : initialData ? "Update User" : "Create User"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserForm;
