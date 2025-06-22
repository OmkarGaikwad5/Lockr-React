import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )

      .then(
        () => {
          toast.success("Your message has been sent successfully!", {
            position: "top-center",
            autoClose: 3000,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          toast.error("Something went wrong. Please try again later.", {
            position: "top-center",
            autoClose: 3000,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      );
  };


  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

        <div className="w-full max-w-3xl mx-auto backdrop-blur-2xlbg-gradient-to-r from-indigo-50/40 to-purple-100/20 dark:from-[#1b1c2c]/70 dark:to-[#2a2b3d]/70
 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.2)] rounded-[2rem] px-10 py-14 md:px-16 transition-all duration-500">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 drop-shadow-sm">
            Get Started with Lockr
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-800 mb-10 text-lg leading-relaxed">
            Got questions or feedback? Let's connect and secure your digital life — one password at a time.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium text-gray-800 dark:text-gray-800 pl-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="rounded-xl px-5 py-3 bg-white/80 dark:bg-white/10 border border-gray-800 dark:border-gray-700 shadow-sm focus:ring-4 focus:ring-purple-300 focus:outline-none text-gray-900 dark:text-black placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium text-gray-800 dark:text-gray-800 pl-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="rounded-xl px-5 py-3 bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none text-gray-900 dark:text-black placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-medium text-gray-800 dark:text-gray-800 pl-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Type your message..."
                className="rounded-xl px-5 py-3 bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-4 focus:ring-pink-300 focus:outline-none text-gray-900 dark:text-black placeholder:text-gray-400 resize-none"
              />
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="cursor-pointer inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Contact;
