import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  UserPlus,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// 🔹 Dữ liệu giả lập
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Pending" },
  { id: 3, name: "Alex Lee", email: "alex@example.com", role: "Moderator", status: "Banned" },
  { id: 4, name: "Maria Tran", email: "maria@example.com", role: "User", status: "Active" },
  { id: 5, name: "David Pham", email: "david@example.com", role: "User", status: "Active" },
  { id: 6, name: "Linh Nguyen", email: "linh@example.com", role: "Moderator", status: "Pending" },
  { id: 7, name: "Henry Vu", email: "henry@example.com", role: "User", status: "Active" },
  { id: 8, name: "Anna Vo", email: "anna@example.com", role: "Admin", status: "Banned" },
  { id: 9, name: "Tom Tran", email: "tom@example.com", role: "User", status: "Active" },
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterRole, setFilterRole] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔹 Lọc + tìm kiếm
  const filteredUsers = users.filter(
    (u) =>
      (filterStatus === "All" || u.status === filterStatus) &&
      (filterRole === "All" || u.role === filterRole) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  // 🔹 Chia trang
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔹 CRUD
  const handleAdd = () => {
    const newUser = {
      id: users.length + 1,
      name: "New User",
      email: "new@example.com",
      role: "User",
      status: "Pending",
    };
    setUsers([...users, newUser]);
  };

  const handleEdit = (id) => setSelectedUser(users.find((u) => u.id === id));
  const handleSave = () => {
    setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
    setSelectedUser(null);
  };
  const handleDelete = (id) => setUsers(users.filter((u) => u.id !== id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <UserPlus className="text-main" /> Quản lý người dùng
        </h2>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-3 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Plus size={16} /> Thêm mới
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm">
            <Upload size={16} /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="Active">Hoạt động</option>
            <option value="Pending">Chờ duyệt</option>
            <option value="Banned">Bị cấm</option>
          </select>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
          >
            <option value="All">Tất cả vai trò</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-white p-6 rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Tên</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Vai trò</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">{u.id}</td>
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 flex items-center gap-2">
                  <Shield size={16} className="text-gray-400" /> {u.role}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : u.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(u.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view - Mobile */}
      <div className="block md:hidden space-y-4">
        {paginatedUsers.map((u) => (
          <div
            key={u.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">{u.name}</h3>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  u.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : u.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {u.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{u.email}</p>
            <p className="flex items-center text-sm text-gray-600">
              <Shield size={14} className="mr-1 text-gray-400" /> {u.role}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(u.id)}
                className="flex-1 py-1 bg-blue-50 text-blue-600 rounded text-sm"
              >
                <Edit size={14} className="inline mr-1" /> Sửa
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="flex-1 py-1 bg-red-50 text-red-600 rounded text-sm"
              >
                <Trash2 size={14} className="inline mr-1" /> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Trang {currentPage} / {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold">Chỉnh sửa người dùng</h3>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <select
              value={selectedUser.role}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="User">User</option>
            </select>
            <select
              value={selectedUser.status}
              onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Active">Hoạt động</option>
              <option value="Pending">Chờ duyệt</option>
              <option value="Banned">Bị cấm</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-main text-white rounded-lg hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
