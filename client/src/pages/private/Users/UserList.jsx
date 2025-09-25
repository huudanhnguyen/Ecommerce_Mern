import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, deleteUser, toggleBlockUser } from "../../../apis/user";
import Avatar from "../../../components/Avatar";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Users,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldOff,
} from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const itemsPerPage = 10;

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers({ page: 1, limit: 100 });
      if (Array.isArray(data.users)) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search + Filter
  const filteredUsers = users.filter(
    (u) =>
      (filterRole === "All" || u.role === filterRole) &&
      (u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u._id?.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle chọn user
  const toggleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  // Chọn tất cả
  const toggleSelectAll = () => {
    const idsOnPage = paginatedUsers.map((u) => u._id);
    if (idsOnPage.every((id) => selectedUsers.includes(id))) {
      setSelectedUsers((prev) => prev.filter((id) => !idsOnPage.includes(id)));
    } else {
      setSelectedUsers((prev) => [...new Set([...prev, ...idsOnPage])]);
    }
  };

  // Xóa 1 user
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa user này không?")) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u._id !== id));
        setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
      } catch (error) {
        console.error("❌ Error deleting user:", error);
        alert("Lỗi khi xóa user!");
      }
    }
  };

  // Xóa nhiều users
  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) {
      alert("Vui lòng chọn ít nhất 1 user để xóa.");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xóa các users đã chọn không?")) {
      try {
        await Promise.all(selectedUsers.map((id) => deleteUser(id)));
        setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u._id)));
        setSelectedUsers([]);
      } catch (error) {
        console.error("❌ Error deleting selected users:", error);
        alert("Lỗi khi xóa users!");
      }
    }
  };

  // Toggle block user
  const handleToggleBlock = async (id) => {
    try {
      await toggleBlockUser(id);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
    } catch (error) {
      console.error("❌ Error toggling block user:", error);
      alert("Lỗi khi thay đổi trạng thái user!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-main" /> User Management
        </h2>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/users/create"
            className="flex items-center gap-2 px-3 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Plus size={16} /> Add User
          </Link>
          <button className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm">
            <Upload size={16} /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm">
            <Download size={16} /> Export
          </button>
          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
          >
            <Trash2 size={16} /> Delete Selected
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search user..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
          >
            <option value="All">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-white p-6 rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={
                    paginatedUsers.length > 0 &&
                    paginatedUsers.every((u) => selectedUsers.includes(u._id))
                  }
                />
              </th>
              <th className="p-3 text-left">Avatar</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(u._id)}
                    onChange={() => toggleSelect(u._id)}
                  />
                </td>
                <td className="p-3">
                  <Avatar
                    src={u.avatar}
                    name={`${u.firstName} ${u.lastName}`}
                    size="md"
                    showBorder={true}
                  />
                </td>
                <td className="p-3 font-medium">
                  {u.firstName} {u.lastName}
                </td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      u.isBlocked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {u.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <Link
                    to={`/admin/users/edit/${u._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleToggleBlock(u._id)}
                    className={`p-2 rounded ${
                      u.isBlocked
                        ? "text-green-600 hover:bg-green-50"
                        : "text-orange-600 hover:bg-orange-50"
                    }`}
                    title={u.isBlocked ? "Unblock user" : "Block user"}
                  >
                    {u.isBlocked ? <Shield size={16} /> : <ShieldOff size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedUsers.map((u) => (
          <div key={u._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                checked={selectedUsers.includes(u._id)}
                onChange={() => toggleSelect(u._id)}
                className="mr-2"
              />
              <Avatar
                src={u.avatar}
                name={`${u.firstName} ${u.lastName}`}
                size="md"
                showBorder={true}
              />
              <div className="flex-1">
                <h3 className="font-medium">{u.firstName} {u.lastName}</h3>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    u.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {u.role}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    u.isBlocked
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {u.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/users/edit/${u._id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit size={16} />
                </Link>
                <button
                  onClick={() => handleToggleBlock(u._id)}
                  className={`p-2 rounded ${
                    u.isBlocked
                      ? "text-green-600 hover:bg-green-50"
                      : "text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {u.isBlocked ? <Shield size={16} /> : <ShieldOff size={16} />}
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Page {currentPage} / {totalPages || 1}
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
    </div>
  );
};

export default UserList;
