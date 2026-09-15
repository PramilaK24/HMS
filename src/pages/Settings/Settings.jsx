import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import UserProfileTable from "../../components/Table/UserProfileTable";
import Pagination from "../../components/Pagination/Pagination";
const filters = [
  {
    label: "Select User",
    placeholder: "select user",
    options: [
      { value: "user1", label: "User 1" },
      { value: "user2", label: "User 2" },
    ],
  },
  {
    label: "Select Role",
    placeholder: "select role",
    options: [
      { value: "admin", label: "Admin" },
      { value: "doctor", label: "Doctor" },
      { value: "nurse", label: "Nurse" },
    ],
  },
  {
    label: "Select Department",
    placeholder: "select department",
    options: [
      { value: "cardiology", label: "Cardiology" },
      { value: "neurology", label: "Neurology" },
      { value: "general", label: "General Medicine" },
    ],
  },
];

const usersProfileData = [
  {
    id: 1,
    name: "Emily Johnson",
    userId: "ID: RC19023",
    email: "emily.johnson@example.com",
    role: "Receptionist",
    department: "Front Desk",
    joined: "01/12/2021",
    status: "Receptionist",
  },
  {
    id: 2,
    name: "Dr. Michael Smith",
    userId: "ID: DC20045",
    email: "michael.smith@example.com",
    role: "Doctor",
    department: "Cardiology",
    joined: "03/08/2019",
    status: "Doctor",
  },
  {
    id: 3,
    name: "Sarah Williams",
    userId: "ID: ST85006",
    email: "sarah.williams@example.com",
    role: "Staff",
    department: "Billing",
    joined: "11/15/2020",
    status: "Staff",
  },
  {
    id: 4,
    name: "Dr. David Brown",
    userId: "ID: ST85606",
    email: "david.brown@example.com",
    role: "Doctor",
    department: "Pediatrics",
    joined: "07/22/2018",
    status: "Doctor",
  },
  {
    id: 5,
    name: "Linda Martinez",
    userId: "ID: DC20037",
    email: "linda.martinez@example.com",
    role: "Receptionist",
    department: "Emergency Dept.",
    joined: "02/05/2022",
    status: "Receptionist",
  },
  {
    id: 6,
    name: "James Anderson",
    userId: "ID: RC14844",
    email: "james.anderson@example.com",
    role: "Staff",
    department: "Radiology",
    joined: "09/14/2020",
    status: "Staff",
  },
  {
    id: 7,
    name: "Dr. Jennifer Lee",
    userId: "ID: ST27801",
    email: "jennifer.lee@example.com",
    role: "Doctor",
    department: "Orthopedics",
    joined: "06/11/2017",
    status: "Doctor",
  },
  {
    id: 8,
    name: "Robert Taylor",
    userId: "ID: DC20020",
    email: "robert.taylor@example.com",
    role: "Staff",
    department: "General Surgery",
    joined: "12/01/2021",
    status: "Staff",
  },
];
const PAGE_SIZE = 8;

const Settings = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const pagedUsers = usersProfileData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, delay: i * 0.08 },
    }),
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
        {/* Header */}
        <motion.header
          className="mt-3 flex items-start justify-between gap-4 sm:mt-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <div>
            <h1 className="text-sm font-semibold leading-none text-[var(--text-primary)] sm:text-base lg:text-lg">
              User settings
            </h1>

            <p className="mt-1.5 text-[10px] leading-none text-[var(--btn-toggle-disabled)] sm:text-xs">
              These settings are helps add or manage user
            </p>
          </div>

          {/* Security Settings */}
          <button
            type="button"
            onClick={() => navigate("/settings/security")}
            className="flex items-center gap-2 rounded-full border border-[var(--text-highlight)]  px-4 py-2 text-sm font-normal text-white shadow-[0_0_8px_rgba(14,255,123,0.12)] transition-colors hover:bg-[var(--text-highlight)]/10"
          >
            <Icon
              icon="boxicons:shield"
              width="20"
              height="20"
              className="text-white"
            />
            Security Settings
          </button>
        </motion.header>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {filters.map(({ label, placeholder, options }) => (
            <Dropdown
              key={label}
              label={label}
              options={options}
              placeholder={placeholder}
              value={selectedFilters[label] ?? ""}
              onChange={(value) =>
                setSelectedFilters((current) => ({
                  ...current,
                  [label]: value,
                }))
              }
            />
          ))}
        </div>

        <UserProfileTable usersData={pagedUsers} />
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          totalItems={usersProfileData.length}
          onPageChange={setPage}
          itemLabel="users"
        />
      </motion.div>
    </main>
  );
};

export default Settings;
