import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import ClinicalServicesDropdown from "../../components/Dropdown/ClinicalServiceDropdown";

const Table = ({
  columns = [],
  data = [],
  selectable = true,
  showActions = true,
  searchable = true,
  searchPlaceholder = "Search...",
  showFilterButton = true,
  showDeleteButton = true,

  dropdowns = [],
  onDropdownChange,

  leftContent,

  actions = [],

  statusConfig = {},

  searchValue = "",
  onSearchChange,

  onRowClick,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sort, setSort] = useState({
    key: null,
    direction: null,
  });

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

  const handleSort = (key) => {
    setSort((prev) => {
      if (prev.key !== key) {
        return {
          key,
          direction: "asc",
        };
      }

      if (prev.direction === "asc") {
        return {
          key,
          direction: "desc",
        };
      }

      return {
        key: null,
        direction: null,
      };
    });
  };

  const tableData = useMemo(() => {
    const result = [...data];

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
  }, [data, sort]);

  const getSortIcon = (key) => {
    if (sort.key !== key) {
      return "tabler:arrows-sort";
    }

    return sort.direction === "asc"
      ? "tabler:arrow-up"
      : "tabler:arrow-down";
  };

  const renderStatus = (value) => {
    const config = statusConfig[value];

    if (!config) {
      return (
        <span className="text-white">
          {value || "-"}
        </span>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${config.dotColor || ""}`}
        />

        <span className={config.textColor || "text-white"}>
          {config.label || value}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Top Controls */}
      <div className="flex items-center justify-between gap-4 mb-5">
        {/* Left Content */}
        <div className="flex items-center gap-3">
          {leftContent}

          {dropdowns.map((dropdown) => (
            <ClinicalServicesDropdown
              key={dropdown.key}
              value={dropdown.value}
              options={dropdown.options}
              placeholder={dropdown.placeholder}
              onChange={(value) =>
                onDropdownChange?.(dropdown.key, value)
              }
            />
          ))}
        </div>

        {/* Right Content */}
        <div className="flex items-center gap-3">
          {searchable && (
            <div className="relative w-50">
              <Icon
                icon="tabler:search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="18"
              />

              <input
                type="text"
                value={searchValue}
                onChange={(e) =>
                  onSearchChange?.(e.target.value)
                }
                placeholder={searchPlaceholder}
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-bg-dark border border-[#3C3C3C] text-white placeholder-gray-500 outline-none"
              />
            </div>
          )}

          {showFilterButton && (
            <button
              type="button"
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-bg-dark border border-[#3C3C3C] text-gray-300 hover:text-white"
            >
              <Icon
                icon="tabler:filter"
                width="20"
              />
            </button>
          )}

          {showDeleteButton && (
            <button
              type="button"
              disabled={selectedRows.length === 0}
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-bg-dark border border-[#3C3C3C] text-gray-300 disabled:opacity-40"
            >
              <Icon
                icon="tabler:trash"
                width="20"
              />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#3C3C3C]">
        <table className="w-full min-w-225">
          <thead>
            <tr className="border-b border-[#3C3C3C] bg-bg-dark">
              {selectable && (
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 &&
                      selectedRows.length === data.length
                    }
                    onChange={toggleAll}
                    className="w-4 h-4"
                  />
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-4 text-left text-sm font-medium text-gray-300 whitespace-nowrap"
                >
                  <button
                    type="button"
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-2"
                  >
                    {column.label}

                    <Icon
                      icon={getSortIcon(column.key)}
                      width="16"
                    />
                  </button>
                </th>
              ))}

              {showActions && (
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className="border-b border-[#3C3C3C] hover:bg-white/5 cursor-pointer"
                >
                  {selectable && (
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleRow(row.id);
                        }}
                        className="w-4 h-4"
                      />
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      {column.type === "status"
                        ? renderStatus(row[column.key])
                        : column.render
                        ? column.render(row[column.key], row)
                        : row[column.key] ?? "-"}
                    </td>
                  ))}

                  {showActions && (
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {actions.map((action) => (
                          <button
                            key={action.key}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick?.(row);
                            }}
                            className={
                              action.className ||
                              "text-gray-300 hover:text-white"
                            }
                          >
                            {action.icon && (
                              <Icon
                                icon={action.icon}
                                width="18"
                              />
                            )}
                          </button>
                        ))}
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
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No data found
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