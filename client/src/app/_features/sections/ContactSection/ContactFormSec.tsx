"use client";
import React, { useState } from "react";

const ContactFormSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Message sent!");
  };

  return (
    <div className="mt-[105px] mx-[25%]">
      <h2 className="text-[40px] font-medium text-center mb-6">
        Get in Touch with Us
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white space-y-3"
      >
        <div className="grid md:grid-cols-2  gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="rounded-full px-[30px] py-[10px] bg-[#f6f6f6] w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className="rounded-full px-[30px] py-[10px] bg-[#f6f6f6] w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <textarea
          name="message"
          placeholder="Write Your Message"
          value={form.message}
          onChange={handleChange}
          className="rounded-3xl px-[30px] py-[20px] bg-[#f6f6f6] w-full h-[232px]  resize focus:ring-1 focus:ring-blue-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-medium rounded-full hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactFormSection;
