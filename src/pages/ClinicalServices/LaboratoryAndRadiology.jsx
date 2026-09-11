import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import {
  departmentOptions,
  LabAndRadiology_DATA,
  labColumns,
  labStatusConfig,
  monthOptions,
  yearOptions,
} from "../../constants/clinicalServices";

const LaboratoryAndRadiology = () => {
  const [department, setDepartment] = useState("all");
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");

  // Search is controlled by parent
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);

  // --------------------------------
  // Dropdown Change
  // --------------------------------

  const handleDropdownChange = (key, value) => {
    setPage(1);

    if (key === "department") {
      setDepartment(value);
    }

    if (key === "month") {
      setMonth(value);
    }

    if (key === "year") {
      setYear(value);
    }
  };

  // --------------------------------
  // Search Change
  // --------------------------------

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  // --------------------------------
  // Filter + Search
  // --------------------------------

  const filteredData = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return LabAndRadiology_DATA.filter((item) => {
      const departmentMatch =
        department === "all" || item.department === department;

      const monthMatch =
        month === "all" || item.month === month;

      const yearMatch =
        year === "all" || item.year === year;

      const searchMatch =
        !searchValue ||
        Object.values(item).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(searchValue)
        );

      return (
        departmentMatch &&
        monthMatch &&
        yearMatch &&
        searchMatch
      );
    });
  }, [department, month, year, search]);

  // --------------------------------
  // Pagination
  // --------------------------------

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;

    return filteredData.slice(
      startIndex,
      startIndex + pageSize
    );
  }, [filteredData, page, pageSize]);

  // --------------------------------
  // IMPORTANT
  // --------------------------------
  // When searching:
  // Show ALL matching records.
  //
  // When not searching:
  // Show only 7 records per page.
  // --------------------------------

  const displayData = search.trim()
    ? filteredData
    : paginatedData;

  // --------------------------------
  // Pagination Page Size
  // --------------------------------

  const effectivePageSize = search.trim()
    ? Math.max(filteredData.length, 1)
    : pageSize;

  return (
    <div className="box-border w-full min-h-full rounded-xl px-4 py-6 bg-[linear-gradient(180deg,#091810_0%,#0A0A0A_18%)]">
      <div className="w-full flex flex-col gap-5">

        {/* =========================
            TITLE
        ========================= */}

        <div className="w-full max-w-131.25 flex flex-col gap-3">
          <h1 className="font-normal text-[20px] leading-[100%] text-white">
            Laboratory & Radiology
          </h1>

          <p className="font-normal text-[14px] leading-[100%] text-[#A0A0A0]">
            Manage laboratory tests, radiology reports, and test orders in one
            place.
          </p>
        </div>

        {/* =========================
            ACTIONS
        ========================= */}

        <div className="w-full flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT BUTTONS */}

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

          {/* MONTH + YEAR */}

          <div className="w-full xl:w-auto flex flex-wrap items-center gap-4">

            {/* MONTH */}

            <div className="relative w-30">
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setPage(1);
                }}
                className="w-full h-8 px-3 pr-8 rounded-sm bg-bg-dark border border-[#3C3C3C] shadow-[0px_0px_4px_0px_#0EFF7B] text-white text-[14px] outline-none appearance-none cursor-pointer"
              >
                <option value="all">Month</option>

                {monthOptions
                  .filter((item) => item !== "all")
                  .map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>

              <Icon
                icon="tabler:chevron-down"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-highlight"
                width="22"
                height="22"
              />
            </div>

            {/* YEAR */}

            <div className="relative w-30">
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setPage(1);
                }}
                className="w-full h-8 px-3 pr-8 rounded-sm bg-bg-dark border border-[#3C3C3C] shadow-[0px_0px_4px_0px_#0EFF7B] text-white text-[14px] outline-none appearance-none cursor-pointer"
              >
                <option value="all">Year</option>

                {yearOptions
                  .filter((item) => item !== "all")
                  .map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
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

        {/* =========================
            RECENT TEST ORDERS
        ========================= */}

        <div className="w-full flex flex-col gap-3">
          <h2 className="font-normal text-[20px] leading-[100%] text-white">
            Recent Test Orders
          </h2>

          <p className="font-normal text-[14px] leading-[100%] text-[#A0A0A0]">
            List of all test orders
          </p>
        </div>

        {/* =========================
            TABLE
        ========================= */}

        <Table
          columns={labColumns}
          data={displayData}
          selectable={true}
          showActions={true}
          searchable={true}

          /* Controlled search */
          searchValue={search}
          onSearchChange={handleSearchChange}

          searchPlaceholder="Search product name.."

          showFilterButton={true}
          showDeleteButton={true}

          statusConfig={labStatusConfig}

          dropdowns={[
            {
              key: "department",
              value: department,
              options: departmentOptions.filter(
                (item) => item !== "all"
              ),
              placeholder: "Categories",
            },
          ]}

          onDropdownChange={handleDropdownChange}

          onRowClick={(row) => {
            console.log("Selected row:", row);
          }}
        />

        {/* =========================
            PAGINATION
        ========================= */}

        <Pagination
          page={page}
          pageSize={effectivePageSize}
          totalItems={filteredData.length}
          onPageChange={setPage}
          itemLabel="rooms"
        />
      </div>
    </div>
  );
};

export default LaboratoryAndRadiology;