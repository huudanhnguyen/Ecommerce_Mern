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
    <div className="bg-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Breadcrumb />
      </div>
      
      {/* Services Grid */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-gray-800">
            We Offer Best Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
