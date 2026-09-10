import React, { useState } from 'react';

const Table = ({
  columns = [],
  data = [],
  selectable = true,
  showActions = true,
  onRowClick,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

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

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#0A0A0A]">

      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pt-6">

        {/* Category */}
        <button
          type="button"
          className="
            flex h-8 items-center gap-3
            rounded-full
            border border-[#3A3A3A]
            bg-[#101010]
            px-3
            text-[12px]
            text-white
          "
        >
          Categories
          <span className="text-[#4ADE80]">⌄</span>
        </button>

        {/* Search + Actions */}
        <div className="flex items-center gap-3">

          <div className="flex h-8 w-50 items-center gap-2 rounded-full bg-[#12321F] px-3">
            <span className="text-[#4ADE80]">⌕</span>

            <input
              type="text"
              placeholder="Search product name.."
              className="
                w-full
                bg-transparent
                text-[11px]
                text-white
                outline-none
                placeholder:text-[#65A878]
              "
            />
          </div>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12321F] text-white"
          >
            ☷
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12321F] text-white"
          >
            ♧
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="mt-5 w-full overflow-x-auto px-5 pb-6">

        <table className="w-full min-w-225 border-collapse">

          {/* Header */}
          <thead>
            <tr className="h-11 bg-[#071A10]">

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

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="
                    px-4
                    text-left
                    font-['Helvetica']
                    text-[14px]
                    font-normal
                    text-[#4ADE80]
                    whitespace-nowrap
                  "
                >
                  <div className="flex items-center gap-2">
                    {column.label}

                    {column.sortable && (
                      <span className="text-[10px] text-[#4ADE80]">
                        ↕
                      </span>
                    )}
                  </div>
                </th>
              ))}

              {showActions && (
                <th className="w-16 rounded-r-lg px-4 text-center text-[14px] font-normal text-[#4ADE80]">
                  Actions
                </th>
              )}

            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row.id ?? rowIndex}
                onClick={() => onRowClick?.(row)}
                className="
                  h-13.5
                  border-b
                  border-[#1D1D1D]
                  transition-colors
                  hover:bg-[#111111]
                  cursor-pointer
                "
              >

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

                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="
                      px-4
                      font-['Helvetica']
                      text-[13px]
                      text-white
                      whitespace-nowrap
                    "
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}

                {showActions && (
                  <td className="px-4 text-center">
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xl leading-none text-white"
                    >
                      ⋮
                    </button>
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Table;