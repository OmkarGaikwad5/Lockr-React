import React from "react";
import {
  LockClosedIcon,
  DevicePhoneMobileIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";


const features = [
  {
    title: "Secure Cloud Sync",
    description:
      "Your passwords are securely stored and synced across all your devices in real‑time.",
    icon: CloudArrowUpIcon,
  },
  {
    title: "Full CRUD Management",
    description:
      "Add, edit, and delete passwords effortlessly with real-time updates synced to your database.",
    icon: BoltIcon,
  },
  {
    title: "Show / Hide & Copy Passwords",
    description:
      "Easily reveal hidden passwords or copy them securely to your clipboard.",
    icon: DevicePhoneMobileIcon,
  },

  {
    title: "Military-grade Encryption",
    description:
      "Data is encrypted using AES-256 before leaving your device—trusted by financial institutions.",
    icon: LockClosedIcon,
  },
  {
    title: "Privacy-First Architecture",
    description:
      "Zero-knowledge design: only you can decrypt your data—Lockr never sees your passwords.",
    icon: ShieldCheckIcon,
  },
];


const Features = () => {
  return (
    <div className="relative">
      {/* ✅ Background Layer */}
      <div className="absolute top-0 z-[-2] h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      {/* ✅ Content Layer */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-16 bg-transparent">
        {/* Section Heading */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-500 mb-4 drop-shadow-md">
            Why Choose Lockr?
          </h2>
          <p className="text-lg text-rgba(120,119,198,0.3)dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Security meets simplicity. Everything you need to stay safe, at your fingertips.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/70 dark:bg-slate-900 text-black dark:text-white border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:scale-[1.02] transform transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Features;
