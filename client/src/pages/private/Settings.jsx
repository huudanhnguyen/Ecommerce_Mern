import React, { useState } from "react";

const Settings = () => {
  const [form, setForm] = useState({
    siteName: "My Dashboard",
    email: "admin@example.com",
    theme: "light",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600 mb-6">Settings</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Site Name</label>
          <input
            type="text"
            name="siteName"
            value={form.siteName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Admin Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Theme</label>
          <select
            name="theme"
            value={form.theme}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Settings;
