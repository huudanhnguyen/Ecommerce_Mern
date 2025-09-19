import React from "react";
import Breadcrumb from "../../components/Breadcrumb";

export default function ContactPage() {
  return (
    <div className="w-main max-w-6xl mx-auto bg">
    
      {/* Banner */}
      <Breadcrumb />

      {/* Google Map */}
      <div className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5455110299717!2d106.7900942757606!3d10.846051057904118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752715a2c08a1d%3A0x27202c098246b99a!2zMzYgxJDGsOG7nW5nIHPhu5EgNDQ3LCBUxINuZyBOaMahbiBQaMO6IEEsIFRo4bunIMSQ4bupYywgSOG7kyBDaMOtIE1pbmggNzEyMDcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1758309964383!5m2!1sen!2s"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-4 text-gray-600">
          <p>
            Sed vestibulum faucibus felis, sit amet facilisis tellus. Aliquam
            erat volutpat. Sed consectetur ipsum velit, quis rhoncus libero
            egestas eget.
          </p>
          <p>
            <span className="font-semibold">📍 Address:</span> 474 Ontario St
            Toronto, ON M4X 1M7 Canada
          </p>
          <p>
            <span className="font-semibold">🕒 Opening Hours:</span>
            <br />
            Mon–Fri: 11:00 – 20:00 <br />
            Sat: 10:00 – 20:00 <br />
            Sun: 19:00 – 20:00
          </p>
          <p>
            <span className="font-semibold">✉ Email:</span>{" "}
            support@tadathemes.com
          </p>
          <p>
            <span className="font-semibold">📞 Phone:</span> (+123) 345 678 xxx
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-red-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-red-500"
            />
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-red-500"
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-red-500"
          ></textarea>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
