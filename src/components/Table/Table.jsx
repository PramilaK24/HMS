import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import ClinicalServicesDropdown from "../Dropdown/ClinicalServiceDropdown";

const Table = ({
  columns = [],
  data = [],
  selectable = true,
  showActions = true,
  searchable = true,
  searchPlaceholder = "Search product name..",
  showFilterButton = true,
  showDeleteButton = true,

  dropdowns = [],
  onDropdownChange,
leftContent  = null,
  actions = [],
  statusConfig = {},

  // Controlled search
  searchValue = "",
  onSearchChange,

  onRowClick,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({
    key: null,
    direction: null,
  });

  // -----------------------------
  // Row Selection
  // -----------------------------

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

  // -----------------------------
  // Sorting
  // -----------------------------

  const handleSort = (column) => {
    if (!column.sortable) return;

    setSort((prev) => ({
      key: column.key,
      direction:
        prev.key !== column.key
          ? "asc"
          : prev.direction === "asc"
            ? "desc"
            : null,
    }));
  };

  // -----------------------------
  // Search + Sort
  // -----------------------------

  const tableData = useMemo(() => {
    let result = [...data];

    // Only sorting happens inside Table.
    // Searching is handled by the parent component.

    if (sort.key && sort.direction) {
      result.sort((a, b) => {
        const first = String(a[sort.key] ?? "").toLowerCase();
        const second = String(b[sort.key] ?? "").toLowerCase();

        return sort.direction === "asc"
          ? first.localeCompare(second, undefined, {
              numeric: true,
            })
          : second.localeCompare(first, undefined, {
              numeric: true,
            });
      });
    }

    return result;
  }, [data, columns, sort]);

  // -----------------------------
  // Sort Icon
  // -----------------------------

  const getSortIcon = (column) => {
    if (sort.key !== column.key || !sort.direction) {
      return "bxs:sort-alt";
    }

    return sort.direction === "asc" ? "tabler:arrow-up" : "tabler:arrow-down";
  };

  // -----------------------------
  // Status Renderer
  // -----------------------------

  const renderStatus = (value) => {
    const config = statusConfig[value];

    // If status is not configured
    if (!config) {
      return (
        <span className="whitespace-nowrap text-[13px] text-white">
          {value}
        </span>
      );
    }

    return (
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        {/* Status Dot */}
        {config.dot !== false && (
          <span
            className={`h-1.5 w-1.5 rounded-full ${config.dotClass || ""}`}
          />
        )}

        {/* Status Text */}
        <span className={`text-[13px] ${config.textClass || "text-white"}`}>
          {config.label || value}
        </span>
      </div>
    );
  };
 return (
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        {config.dot !== false && (
          <span
            className={`h-1.5 w-1.5 rounded-full ${config.dotClass || ""}`}
          />
        )}

        <span className={`text-[13px] ${config.textClass || "text-white"}`}>
          {config.label || value}
        </span>
      </div>
    );
  };

  return (
    <div className="relative z-10 w-full overflow-visible rounded-xl border border-[#2A2A2A] bg-[#0A0A0A]">
      {/* =========================
          TOP SECTION
      ========================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pt-6">
        {/* DROPDOWNS */}
        <div className="relative z-50 flex flex-wrap items-center gap-5">
           {leftContent }
          {dropdowns.map((dropdown) => (
            <ClinicalServicesDropdown
              key={dropdown.key}
              label={dropdown.label}
              options={dropdown.options}
              value={dropdown.value}
              placeholder={dropdown.placeholder}
              onChange={(value) => {
                onDropdownChange?.(dropdown.key, value);
              }}
              className={dropdown.className || "w-34"}
            />
          ))}
        </div>

        {/* SEARCH + BUTTONS */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {searchable && (
            <div className="flex h-8 w-50 items-center gap-2 rounded-full bg-[#12321F] px-3">
              <Icon
                icon="tabler:search"
                width="16"
                className="text-[#4ADE80]"
              />

              <input
                value={searchValue}
                onChange={(e) => {
                  onSearchChange?.(e.target.value);
                }}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-[11px] text-white outline-none placeholder:text-[#65A878]"
              />
            </div>
          )}

          {/* Filter */}
          {showFilterButton && (
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12321F]"
            >
              <Icon
                icon="lucide:sliders-horizontal"
                className="h-5 w-5 text-gray-300"
              />
            </button>
          )}

          {/* Delete */}
          {showDeleteButton && (
            <button
              type="button"
              onClick={() => console.log("Delete:", selectedRows)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12321F]"
            >
              <Icon icon="bx:trash-alt" className="h-5 w-5 text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {/* =========================
          TABLE
      ========================= */}
      <div className="mt-5 w-full overflow-x-auto px-5 pb-6">
        <table className="w-full min-w-225 border-collapse">
          {/* =========================
              HEADER
          ========================= */}
          <thead>
            <tr className="h-11 bg-[#071A10]">
              {/* CHECKBOX */}
              {selectable && (
                <th className="w-12 rounded-l-lg px-2 text-left">
                  <label className="relative flex h-4 w-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        data.length > 0 && selectedRows.length === data.length
                      }
                      onChange={toggleAll}
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-[#666666] bg-transparent checked:border-[#4ADE80] checked:bg-[#4ADE80]"
                    />

                    <Icon
                      icon="tabler:check"
                      className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[#0A0A0A] peer-checked:block"
                      width="16"
                      height="16"
                    />
                  </label>
                </th>
              )}

              {/* COLUMNS */}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-4 text-left font-['Helvetica'] text-[14px] font-normal text-[#4ADE80]"
                >
                  <button
                    type="button"
                    disabled={!column.sortable}
                    onClick={() => handleSort(column)}
                    className="flex items-center gap-2 text-[#4ADE80]"
                  >
                    {column.label}

                    {column.sortable && (
                      <Icon icon={getSortIcon(column)} width="14" height="14" />
                    )}
                  </button>
                </th>
              ))}

              {/* ACTIONS */}
              {showActions && (
                <th className="w-20 rounded-r-lg px-4 text-center text-[14px] font-normal text-[#4ADE80]">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* =========================
              BODY
          ========================= */}
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr
                  key={row.id ?? index}
                  onClick={() => onRowClick?.(row)}
                  className="h-13.5 cursor-pointer border-b border-[#1D1D1D] hover:bg-[#111111]"
                >
                  {/* CHECKBOX */}
                  {selectable && (
                    <td className="px-2">
                      <label className="relative flex h-4 w-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleRow(row.id);
                          }}
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-[#666666] bg-transparent checked:border-[#4ADE80] checked:bg-[#4ADE80]"
                        />

                        <Icon
                          icon="tabler:check"
                          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[#0A0A0A] peer-checked:block"
                          width="16"
                          height="16"
                        />
                      </label>
                    </td>
                  )}

                  {/* DATA */}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-4 font-['Helvetica'] text-[13px] text-white"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : column.type === "status"
                          ? renderStatus(row[column.key])
                          : row[column.key]}
                    </td>
                  ))}

                  {/* =========================
                      REUSABLE ACTIONS
                  ========================= */}
                  {showActions && (
                    <td className="px-4">
                      <div className="flex items-center justify-center gap-2">
                        {actions.length > 0 ? (
                          actions.map((action, actionIndex) => (
                            <button
                              key={action.key || actionIndex}
                              type="button"
                              title={action.label}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick?.(row);
                              }}
                              className={
                                action.className ||
                                "flex h-7 w-7 items-center justify-center rounded-full bg-[#12321F] text-[#4ADE80] hover:bg-[#194A2C]"
                              }
                            >
                              <Icon
                                icon={action.icon}
                                width={action.width || 15}
                                height={action.height || 15}
                              />
                            </button>
                          ))
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="text-white hover:text-[#4ADE80]"
                          >
                            <Icon icon="tabler:dots-vertical" width="20" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (showActions ? 1 : 0)
                  }
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
