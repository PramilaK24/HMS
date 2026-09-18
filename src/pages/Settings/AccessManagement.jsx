import React, { useState } from "react";
import { motion } from "framer-motion";
import Search from "../../components/Search/Search";
import BackButton from "../../components/Button/BackButton";
import SegmentControl from "../../components/SegmentControl/SegmentControl";
const staffSegments = [
  { label: "Admin", value: "admin" },
  { label: "Doctor", value: "doctor" },
  { label: "Nurse", value: "nurse" },
  { label: "Receptionist", value: "receptionist" },
  { label: "Pharmacists", value: "pharmacists" },
  { label: "Lab technicians", value: "lab-technicians" },
];
const AccessManagement = () => {
  const [query, setQuery] = useState("");
  const handleSegmentChange = (value) => {
    console.log("Selected:", value);
  };

  return (
    <main className="min-h-full w-full bg-[#101211] p-3 font-sans sm:p-5 lg:p-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative isolate mx-auto min-h-full w-full max-w-7xl overflow-hidden rounded-md
          bg-[radial-gradient(circle_at_top,#052317_0%,#020604_42%,#050505_100%)]
          px-4 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]
          sm:px-7 sm:py-7 lg:px-5 lg:py-4"
      >
        <motion.header
          className="mt-3 sm:mt-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <h1 className="text-sm font-semibold leading-none text-[var(--text-primary)] sm:text-base lg:text-lg">
            Access Management
          </h1>
          <p className="mt-1.5 text-[10px] leading-none text-[var(--btn-toggle-disabled)] sm:text-xs">
            This is the information only edited by the User
          </p>
        </motion.header>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <BackButton label="Add New user" icon={false} />
          <div className="w-full sm:w-64">
            <Search
              aria-label="Search access management"
              placeholder="Search users"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-5">
          <SegmentControl
            options={staffSegments}
            defaultValue={staffSegments[0]?.value}
            onChange={handleSegmentChange}
          />
        </div>
      </motion.div>
    </main>
  );
};

export default AccessManagement;
