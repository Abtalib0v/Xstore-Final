"use client";
import React from "react";

const ContactMapSection = () => {
  return (
    <div className="w-full h-[400px] flex justify-center">
        
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d303.1234567!2d49.8513706!3d40.3771909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0b5e01!2sCode%20Academy!5e0!3m2!1sen!2saz!4v1693069000000!5m2!1sen!2saz"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        className="rounded-3xl"
      ></iframe>
    </div>
  );
};

export default ContactMapSection;
