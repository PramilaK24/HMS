import React, { useState } from "react";
import Table from "../../components/Table/Table";
import { Icon } from "@iconify/react";

const LaboratoryAndRadiology = () => {
  const columns = [
    {
      key: "orderId",
      label: "Order ID",
      sortable: true,
    },
    {
      key: "patientName",
      label: "Patient Name",
      sortable: true,
    },
    {
      key: "department",
      label: "Department",
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

  const data = [
    {
      id: 1,
      orderId: "L12345",
      patientName: "John Doe",
      department: "Pathology",
      testType: "Blood Test",
      date: "09 Aug 2026",
      status: "Completed",
    },
    {
      id: 2,
      orderId: "R98521",
      patientName: "Sarah Wilson",
      department: "Radiology",
      testType: "X-Ray",
      date: "08 Aug 2026",
      status: "Pending",
    },
    {
      id: 3,
      orderId: "L87952",
      patientName: "Michael Brown",
      department: "Pathology",
      testType: "MRI Scan",
      date: "07 Aug 2026",
      status: "Completed",
    },
    {
      id: 4,
      orderId: "L20891",
      patientName: "Emily Davis",
      department: "Pathology",
      testType: "Urine Test",
      date: "06 Aug 2026",
      status: "Processing",
    },
  ];

  const [category, setCategory] = useState("category");

  const categoryOptions = ["category", "Laboratory", "Radiology"];

  const handleDropdownChange = (key, value) => {
    if (key === "category") {
      setCategory(value);
    }
  };

  return (
    <div className="box-border w-full min-h-full rounded-xl px-4 py-6 bg-[linear-gradient(180deg,#091810_0%,#0A0A0A_40%)]">
      <div className="w-full flex flex-col gap-5">
        {/* Title */}
        <div className="w-full max-w-131.25 flex flex-col gap-3">
          <h1 className="font-normal text-[20px] leading-[100%] text-white">
            Laboratory & Radiology
          </h1>

          <p className="font-normal text-[14px] leading-[100%] text-[#A0A0A0]">
            Manage laboratory tests, radiology reports, and test orders in one
            place.
          </p>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          {/* Left Buttons */}
          <div className="w-full xl:w-auto flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="min-h-8 px-3 py-2 rounded-sm bg-[#1E1E1E] shadow-[0px_0px_20px_0px_#00000066] text-white font-['Helvetica'] text-[14px] whitespace-nowrap cursor-pointer"
            >
              Fetch Previous Report
            </button>

            <button
              type="button"
              className="min-h-8 px-3 py-2 rounded-sm bg-[#1E1E1E] shadow-[0px_0px_20px_0px_#00000066] text-white font-['Helvetica'] text-[14px] whitespace-nowrap cursor-pointer"
            >
              Integrate PACS
            </button>

            <button
              type="button"
              className="min-h-8 px-3 py-2 rounded-sm bg-[#1E1E1E] shadow-[0px_0px_20px_0px_#00000066] text-white font-['Helvetica'] text-[14px] whitespace-nowrap cursor-pointer"
            >
              Test Type Validation
            </button>
          </div>

          {/* Month + Year */}
          <div className="w-full xl:w-auto flex flex-wrap items-center gap-4">
            {/* Month */}
            <div className="flex items-center gap-2">
              <span className="text-white font-['Helvetica'] text-[14px]">
                Month
              </span>

              <div className="relative w-30">
                <select
                  defaultValue="Aug"
                  className="w-full h-8 px-3 pr-8 rounded-sm bg-bg-dark border border-[#3C3C3C] shadow-[0px_0px_4px_0px_#0EFF7B] text-white text-[14px] outline-none appearance-none cursor-pointer"
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
            <div className="flex items-center gap-2">
              <span className="text-white font-['Helvetica'] text-[14px]">
                Year
              </span>

              <div className="relative w-30">
                <select
                  defaultValue="2026"
                  className="w-full h-8 px-3 pr-8 rounded-sm bg-bg-dark border border-[#3C3C3C] shadow-[0px_0px_4px_0px_#0EFF7B] text-white text-[14px] outline-none appearance-none cursor-pointer"
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
                  width="22"
                  height="22"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Test Orders */}
        <div className="w-full flex flex-col gap-3">
          <h2 className="font-normal text-[20px] leading-[100%] text-white">
            Recent Test Orders
          </h2>

          <p className="font-normal text-[14px] leading-[100%] text-[#A0A0A0]">
            List of all test orders
          </p>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={data}
          selectable={true}
          showActions={true}
          searchable={true}
          searchPlaceholder="Search test name.."
          showFilterButton={true}
          showDeleteButton={true}
          // One dropdown for Laboratory page
          dropdowns={[
            {
              key: "category",
              value: category,
              options: categoryOptions,
            },
          ]}
          onDropdownChange={handleDropdownChange}
          onRowClick={(row) => {
            console.log("Selected row:", row);
          }}
        />
      </div>
    </div>
  );
};

export default LaboratoryAndRadiology;
