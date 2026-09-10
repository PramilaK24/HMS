import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import Dropdown from "../Dropdown/Dropdown";

const Table = ({
  columns = [],
  data = [],
  selectable = true,
  showActions = true,
  searchable = true,
  searchPlaceholder = "Search product name..",
  showFilterButton = true,
  showDeleteButton = true,

  // Dropdown configuration comes from parent
  dropdowns = [],
  onDropdownChange,

  onRowClick,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({
    key: null,
    direction: null,
  });

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

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

  const tableData = useMemo(() => {
    let result = [...data];

    // Search
    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter((row) =>
        columns.some((column) =>
          String(row[column.key] ?? "")
            .toLowerCase()
            .includes(searchValue),
        ),
      );
    }

    // Sort
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
  }, [data, columns, search, sort]);

  const getSortIcon = (column) => {
    if (sort.key !== column.key || !sort.direction) {
      return "bxs:sort-alt";
    }

    return sort.direction === "asc"
      ? "tabler:arrow-up"
      : "tabler:arrow-down";
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#0A0A0A]">
      {/* TOP SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pt-6">
        {/* DROPDOWNS */}
        <div className="flex flex-wrap items-center gap-5">
          {dropdowns.map((dropdown) => (
            <Dropdown
              key={dropdown.key}
              label={dropdown.label}
              options={dropdown.options}
              value={dropdown.value}
              placeholder={dropdown.placeholder}
              onChange={(value) => {
                onDropdownChange?.(dropdown.key, value);
              }}
              className={dropdown.className || "w-30"}
            />
          ))}
        </div>

        {/* SEARCH + BUTTONS */}
        <div className="flex items-center gap-3">
          {searchable && (
            <div className="flex h-8 w-50 items-center gap-2 rounded-full bg-[#12321F] px-3">
              <Icon
                icon="tabler:search"
                width="16"
                className="text-[#4ADE80]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-[11px] text-white outline-none placeholder:text-[#65A878]"
              />
            </div>
          )}

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

          {showDeleteButton && (
            <button
              type="button"
              onClick={() => console.log("Delete:", selectedRows)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12321F]"
            >
              <Icon
                icon="bx:trash-alt"
                className="h-5 w-5 text-gray-300"
              />
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-5 w-full overflow-x-auto px-5 pb-6">
        <table className="w-full min-w-225 border-collapse">
          <thead>
            <tr className="h-11 bg-[#071A10]">
              {/* CHECKBOX */}
              {selectable && (
                <th className="w-12 rounded-l-lg px-2 text-left">
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 &&
                      selectedRows.length === data.length
                    }
                    onChange={toggleAll}
                    className="h-4.5 w-4.5 accent-[#4ADE80]"
                  />
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
                      <Icon
                        icon={getSortIcon(column)}
                        width="14"
                        height="14"
                      />
                    )}
                  </button>
                </th>
              ))}

              {/* ACTIONS */}
              {showActions && (
                <th className="w-16 rounded-r-lg px-4 text-center text-[14px] font-normal text-[#4ADE80]">
                  Actions
                </th>
              )}
            </tr>
          </thead>

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
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleRow(row.id);
                        }}
                        className="h-4.5 w-4.5 accent-[#4ADE80]"
                      />
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
                        : row[column.key]}
                    </td>
                  ))}

                  {/* ACTIONS */}
                  {showActions && (
                    <td className="px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="text-white hover:text-[#4ADE80]"
                      >
                        <Icon
                          icon="tabler:dots-vertical"
                          width="20"
                        />
                      </button>
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