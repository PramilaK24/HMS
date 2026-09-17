import { useMemo, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import {
  bloodColumns,
  bloodBank_Data,
  bloodStatusConfig,
  bloodTypesOptions,
  statusOptions,
} from "../../constants/clinicalServices";
import ClinicalServicesTabel from "../../components/Table/ClinicalServicesTabel";

const BloodBankAndDonorList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [bloodTypes, setBloodType] = useState("all");
  const [status, setStatus] = useState("all");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);

  const handleDropdownChange = (key, value) => {
    setPage(1);

    if (key === "bloodTypes") {
      setBloodType(value);
    }

    if (key === "status") {
      setStatus(value);
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const filteredData = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return bloodBank_Data.filter((item) => {
      const bloodtypesMatch =
        bloodTypes === "all" || item.bloodTypes === bloodTypes;

      const statusMatch = status === "all" || item.status === status;

      const searchMatch =
        !searchValue ||
        Object.values(item).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(searchValue),
        );

      return bloodtypesMatch && statusMatch && searchMatch;
    });
  }, [bloodTypes, status, search]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;

    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, page, pageSize]);

  const displayData = search.trim() ? filteredData : paginatedData;

  const effectivePageSize = search.trim()
    ? Math.max(filteredData.length, 1)
    : pageSize;

  return (
    <div>
      <div className="box-border w-full min-h-full rounded-xl px-4 py-6 bg-[linear-gradient(180deg,#091810_0%,#0A0A0A_40%)]">
        <div className="w-full flex  justify-between mb-6 gap-5">
          <div className="w-full max-w-131.25 flex flex-col gap-3">
            <h1 className="font-normal text-[20px] leading-[100%] text-white">
              Blood Bank
            </h1>

            <p className="font-normal text-[14px] leading-[100%] text-[#A0A0A0]">
              Available Blood Types and Donor Registry
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className=" w-50 h-10 px-1 py-1 rounded-lg flex items-center justify-center
              gap-2 border-b border-text-highlight bg-[linear-gradient(92.18deg,#025126_3.26%,#0D7F41_50.54%,#025126_97.83%)]
              shadow-[0px_2px_12px_0px_#00000040] cursor-pointer " >
              <span>+</span> Add blood group
            </button>
          </div>
        </div>

        <ClinicalServicesTabel
          columns={bloodColumns}
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
          statusConfig={bloodStatusConfig}
          dropdowns={[
            {
              key: "bloodTypes",
              value: bloodTypes,
              options: bloodTypesOptions.filter((item) => item !== "all"),
              placeholder: "Blood type",
            },
            {
              key: "status",
              value: status,
              options: statusOptions.filter((item) => item !== "all"),
              placeholder: "Status",
            },
          ]}
          onDropdownChange={handleDropdownChange}
          onRowClick={(row) => {
            console.log("Selected row:", row);
          }}
        />
      </div>
      <br />
      <div className="box-border w-full min-h-full rounded-xl px-4 py-6 bg-[linear-gradient(180deg,#091810_0%,#0A0A0A_40%)]">
        <div className="w-full flex  justify-between mb-6 gap-5">
          <div className="w-full max-w-131.25 flex flex-col gap-3">
            <h1 className="font-normal text-[20px] leading-[100%] text-white">
              Donor List
            </h1>

            <p className="font-normal text-[14px] leading-[100%] text-[#A0A0A0]">
              Donor information who donates the blood
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className=" w-50 h-10 px-1 py-1 rounded-lg flex items-center justify-center
              gap-2 border-b border-text-highlight bg-[linear-gradient(92.18deg,#025126_3.26%,#0D7F41_50.54%,#025126_97.83%)]
              shadow-[0px_2px_12px_0px_#00000040] cursor-pointer " >
              <span>+</span> Add donor
            </button>
          </div>
        </div>

        <ClinicalServicesTabel
          columns={bloodColumns}
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
          statusConfig={bloodStatusConfig}
          dropdowns={[
            {
              key: "bloodTypes",
              value: bloodTypes,
              options: bloodTypesOptions.filter((item) => item !== "all"),
              placeholder: "Blood type",
            },
            {
              key: "status",
              value: status,
              options: statusOptions.filter((item) => item !== "all"),
              placeholder: "Gender",
            },
          ]}
          onDropdownChange={handleDropdownChange}
          onRowClick={(row) => {
            console.log("Selected row:", row);
          }}
        />
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

export default BloodBankAndDonorList;
