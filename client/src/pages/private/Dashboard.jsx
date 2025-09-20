import React, { useState } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Activity,
  Search,
  Bell,
  Settings,
  UserPlus,
  PlusCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// 🔹 Sample data for charts
const dataOptions = {
  day: [
    { name: "Mon", sales: 200 },
    { name: "Tue", sales: 450 },
    { name: "Wed", sales: 300 },
    { name: "Thu", sales: 500 },
    { name: "Fri", sales: 650 },
    { name: "Sat", sales: 700 },
    { name: "Sun", sales: 400 },
  ],
  week: [
    { name: "Week 1", sales: 1500 },
    { name: "Week 2", sales: 1800 },
    { name: "Week 3", sales: 2200 },
    { name: "Week 4", sales: 2000 },
  ],
  month: [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 800 },
    { name: "Mar", sales: 600 },
    { name: "Apr", sales: 1200 },
    { name: "May", sales: 900 },
    { name: "Jun", sales: 1400 },
  ],
};

// 🔹 Sample orders
const orders = [
  { id: "#1234", customer: "John Doe", date: "2025-09-20", status: "Processing", total: "$250" },
  { id: "#1235", customer: "Jane Smith", date: "2025-09-19", status: "Completed", total: "$480" },
  { id: "#1236", customer: "Alex Lee", date: "2025-09-19", status: "Shipping", total: "$320" },
  { id: "#1237", customer: "Maria Tran", date: "2025-09-18", status: "Cancelled", total: "$150" },
  { id: "#1238", customer: "Henry Vu", date: "2025-09-18", status: "Completed", total: "$600" },
  { id: "#1239", customer: "Anna Vo", date: "2025-09-17", status: "Shipping", total: "$700" },
  { id: "#1240", customer: "David Pham", date: "2025-09-17", status: "Processing", total: "$200" },
  { id: "#1241", customer: "Linh Nguyen", date: "2025-09-16", status: "Completed", total: "$900" },
];

// 🔹 Top customers & products
const customers = [
  { name: "John Doe", orders: 12, spent: "$1,200" },
  { name: "Jane Smith", orders: 8, spent: "$950" },
  { name: "Alex Lee", orders: 6, spent: "$720" },
];

const products = [
  { name: "iPhone 15", sold: 120, revenue: "$120,000" },
  { name: "MacBook Pro", sold: 75, revenue: "$150,000" },
  { name: "AirPods Pro", sold: 200, revenue: "$40,000" },
];

const Dashboard = () => {
  const [filter, setFilter] = useState("month");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // 🔹 Filtered orders
  const filteredOrders = orders.filter(
    (o) =>
      (o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || o.status === statusFilter)
  );

  // 🔹 Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">System overview, metrics and recent activities.</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          {["day", "week", "month"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === option
                  ? "bg-main text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option === "day" ? "Day" : option === "week" ? "Week" : "Month"}
            </button>
          ))}
          <Bell className="text-gray-600 cursor-pointer hover:text-main" />
          <Settings className="text-gray-600 cursor-pointer hover:text-main" />
        </div>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Users size={24} />, title: "Users", value: "1,250", color: "blue" },
          { icon: <Package size={24} />, title: "Products", value: "320", color: "green" },
          { icon: <ShoppingCart size={24} />, title: "Orders", value: "540", color: "yellow" },
          { icon: <DollarSign size={24} />, title: "Revenue", value: "$25,400", color: "red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue ({filter})</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataOptions[filter]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Users ({filter})</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataOptions[filter]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold text-gray-700">Recent Orders</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-main focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="Completed">Completed</option>
              <option value="Shipping">Shipping</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left font-medium text-gray-600">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((o, idx) => (
                  <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                    <td className="p-3 font-medium">{o.id}</td>
                    <td className="p-3">{o.customer}</td>
                    <td className="p-3">{o.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          o.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : o.status === "Shipping"
                            ? "bg-blue-100 text-blue-600"
                            : o.status === "Processing"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">{o.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-end mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 border rounded-lg text-sm ${
                  currentPage === idx + 1 ? "bg-main text-white" : "hover:bg-gray-100"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Customers + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Customers</h3>
          <ul className="space-y-3 text-sm">
            {customers.map((c, idx) => (
              <li key={idx} className="flex justify-between border-b pb-2">
                <span>{c.name}</span>
                <span className="text-gray-500">
                  {c.orders} orders - {c.spent}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Best Selling Products</h3>
          <ul className="space-y-3 text-sm">
            {products.map((p, idx) => (
              <li key={idx} className="flex justify-between border-b pb-2">
                <span>{p.name}</span>
                <span className="text-gray-500">
                  {p.sold} sold - {p.revenue}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Activity size={20} className="text-main" /> Recent Activity
        </h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>👤 User <strong>John Doe</strong> just registered an account.</li>
          <li>🛒 Order #1234 has been created (Total: $250).</li>
          <li>📦 Product <strong>iPhone 15</strong> has been added to inventory.</li>
          <li>⚙️ Admin updated system settings.</li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 flex items-center gap-2 bg-main text-white rounded-lg hover:bg-blue-700 transition">
            <PlusCircle size={18} /> Add Product
          </button>
          <button className="px-4 py-2 flex items-center gap-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <UserPlus size={18} /> Add Customer
          </button>
          <button className="px-4 py-2 flex items-center gap-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
            <ShoppingCart size={18} /> Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
