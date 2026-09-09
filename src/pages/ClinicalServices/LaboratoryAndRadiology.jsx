import React from "react";
import Table from "../../components/Table/Table";
import { Icon } from "@iconify/react";

const LaboratoryAndRadiology = () => {
  // Table columns
  const columns = [
    {
      key: "testName",
      label: "Test Name",
      sortable: true,
    },
    {
      key: "patientName",
      label: "Patient Name",
      sortable: true,
    },
    {
      key: "doctor",
      label: "Doctor",
      sortable: true,
    },
    {
      key: "testType",
      label: "Test Type",
      sortable: true,
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
    },
  ];

  // Table data
  const data = [
    {
      id: 1,
      testName: "Blood Test",
      patientName: "John Doe",
      doctor: "Dr. Smith",
      testType: "Laboratory",
      date: "09 Aug 2026",
      status: "Completed",
    },
    {
      id: 2,
      testName: "X-Ray",
      patientName: "Sarah Wilson",
      doctor: "Dr. Johnson",
      testType: "Radiology",
      date: "08 Aug 2026",
      status: "Pending",
    },
    {
      id: 3,
      testName: "MRI Scan",
      patientName: "Michael Brown",
      doctor: "Dr. Williams",
      testType: "Radiology",
      date: "07 Aug 2026",
      status: "Completed",
    },
    {
      id: 4,
      testName: "Urine Test",
      patientName: "Emily Davis",
      doctor: "Dr. Smith",
      testType: "Laboratory",
      date: "06 Aug 2026",
      status: "Processing",
    },
  ];

  return (
    <div className="box-border w-full min-h-full rounded-xl px-4 py-6 bg-[linear-gradient(180deg,#091810_0%,#0A0A0A_40%)]">
      <div className="w-full flex flex-col gap-5">

        {/* Title + Description */}
        <div className="w-full max-w-131.25 flex flex-col gap-3">
          <h1 className="font-normal text-[20px] leading-[100%] text-white">
            Laboratory & Radiology
          </h1>

          <p className="font-normal text-[14px] leading-[100%] text-[#A0A0A0]">
            Manage staff profiles, departments, roles, attendance, and payroll
            in one place.
          </p>
        </div>

        {/* Actions + Month / Year */}
        <div className="w-full flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* Left Buttons */}
          <div className="w-full xl:w-auto flex flex-wrap items-center gap-3">
            <button
              className="min-h-8 px-3 py-2 rounded-sm bg-[#1E1E1E] shadow-[0px_0px_20px_0px_#00000066] text-white 
              font-['Helvetica'] text-[14px] leading-[100%] whitespace-nowrap cursor-pointer"
            >
              Fetch Previous Report
            </button>

            <button
              className="min-h-8 px-3 py-2 rounded-sm bg-[#1E1E1E] shadow-[0px_0px_20px_0px_#00000066] text-white 
              font-['Helvetica'] text-[14px] leading-[100%] whitespace-nowrap cursor-pointer"
            >
              Integrate PACS
            </button>

            <button
              className="min-h-8 px-3 py-2 rounded-sm bg-[#1E1E1E] shadow-[0px_0px_20px_0px_#00000066] text-white 
              font-['Helvetica'] text-[14px] leading-[100%] whitespace-nowrap cursor-pointer"
            >
              Test Type Validation
            </button>
          </div>

          {/* Month + Year */}
          <div className="w-full xl:w-auto flex flex-wrap items-center gap-4">

            {/* Month */}
            <div className="flex flex-1 sm:flex-none items-center gap-2">
              <span className="text-white font-['Helvetica'] text-[14px] whitespace-nowrap">
                Month
              </span>

              <div className="relative w-full sm:w-30">
                <select
                  className="
                    w-full h-8 px-3 pr-8 rounded-sm
                    bg-bg-dark
                    border border-[#3C3C3C]
                    shadow-[0px_0px_4px_0px_#0EFF7B]
                    text-white text-[14px]
                    outline-none appearance-none cursor-pointer
                  "
                >
                  <option>Aug</option>
                  <option>Sep</option>
                  <option>Oct</option>
                  <option>Nov</option>
                  <option>Dec</option>
                </select>

                <Icon
                  icon="tabler:chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-highlight"
                  width="22"
                  height="22"
                />
              </div>
            </div>

            {/* Year */}
            <div className="flex flex-1 sm:flex-none items-center gap-2">
              <span className="text-white font-['Helvetica'] text-[14px] whitespace-nowrap">
                Year
              </span>

              <div className="relative w-full sm:w-30">
                <select
                  className="
                    w-full h-8 px-3 pr-8 rounded-sm
                    bg-bg-dark
                    border border-[#3C3C3C]
                    shadow-[0px_0px_4px_0px_#0EFF7B]
                    text-white text-[14px]
                    outline-none appearance-none cursor-pointer
                  "
                >
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                </select>

                <Icon
                  icon="tabler:chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-highlight"
                  width="24"
                  height="24"
                  style={{ strokeWidth: 2 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Test Orders */}
        <div className="w-full max-w-131.25 flex flex-col gap-3">
          <h1 className="font-normal text-[20px] leading-[100%] text-white">
            Recent Test Orders
          </h1>

          <p className="font-normal text-[14px] leading-[100%] text-[#A0A0A0]">
            List of all stocks
          </p>
        </div>

        {/* Reusable Table */}
        <Table
          columns={columns}
          data={data}
          selectable={true}
          showActions={true}
          onRowClick={(row) => {
            console.log("Selected row:", row);
          }}
        />

      </div>
    </div>
  );
};

export default LaboratoryAndRadiology;