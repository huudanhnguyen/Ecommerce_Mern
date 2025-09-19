import React from "react";
import Breadcrumb from "../../components/Breadcrumb";

const services = [
  {
    icon: "⚙️",
    title: "Customizable Page",
    desc: "Fusce ac malesuada elit. Donec consectetur congue bibendum.",
  },
  {
    icon: "🎞️",
    title: "Revolution Slider",
    desc: "Fusce ac malesuada elit. Donec consectetur congue bibendum.",
  },
  {
    icon: "📂",
    title: "Drag & Drop Page",
    desc: "Fusce ac malesuada elit. Donec consectetur congue bibendum.",
  },
  {
    icon: "🎞️",
    title: "Revolution Slider",
    desc: "Fusce ac malesuada elit. Donec consectetur congue bibendum.",
  },
  {
    icon: "📂",
    title: "Drag & Drop Page",
    desc: "Fusce ac malesuada elit. Donec consectetur congue bibendum.",
  },
  {
    icon: "⚙️",
    title: "Customizable Page",
    desc: "Fusce ac malesuada elit. Donec consectetur congue bibendum.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
      <Breadcrumb />
      </div>
      {/* Services Grid */}
      <div className="bg-gray-50 mb-20">
        <h2 className="text-center text-2xl font-bold mb-12">
          We Offer Best Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
