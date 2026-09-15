import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const Checkbox = ({ checked, onChange }) => (
  <label className="relative flex h-4 w-4 cursor-pointer items-center justify-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="peer sr-only"
    />
    <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-gray-600 bg-transparent transition peer-checked:border-emerald-500 peer-checked:">
      {checked && (
        <Icon
          icon="mingcute:check-fill"
          width="10"
          className="text-[var(--text-highlight)]"
        />
      )}
    </span>
  </label>
);

const SortMenu = ({ field, onSelect }) => (
  <div className="absolute left-0 top-full z-20 mt-1 w-32 overflow-hidden rounded-lg border border-[var(--dropdown-border)] bg-[#0d1410] shadow-xl">
    {["asc", "desc"].map((dir) => (
      <button
        key={dir}
        type="button"
        onClick={() => onSelect(field, dir)}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-white/70 transition hover:bg-[var(--text-highlight)]/10 hover:text-white"
      >
        <Icon
          icon={
            dir === "asc"
              ? "solar:sort-from-top-to-bottom-linear"
              : "solar:sort-from-bottom-to-top-linear"
          }
          width="13"
        />
        {dir === "asc" ? "A → Z" : "Z → A"}
      </button>
    ))}
  </div>
);

const UserProfileTable = ({ usersData = [] }) => {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openSortMenu, setOpenSortMenu] = useState(null);
  const [sort, setSort] = useState({ field: "", direction: "asc" });
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const filteredUsers = useMemo(() => {
    const results = usersData.filter((user) => {
      const value = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value) ||
        user.department.toLowerCase().includes(value) ||
        user.joined.toLowerCase().includes(value)
      );
    });

    if (!sort.field) return results;

    return [...results].sort((first, second) => {
      const firstValue = String(first[sort.field] ?? "").toLowerCase();
      const secondValue = String(second[sort.field] ?? "").toLowerCase();
      const comparison = firstValue.localeCompare(secondValue);
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [search, sort, usersData]);

  const selectSort = (field, direction) => {
    setSort({ field, direction });
    setOpenSortMenu(null);
  };

  const toggleSearch = () => {
    if (isSearchOpen) setSearch("");
    setIsSearchOpen((current) => !current);
  };

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const getRoleClass = (role) => {
    switch (role) {
      case "Doctor":
        return "text-[var(--text-highlight)]";
      case "Staff":
        return "text-[var(--user-table-header-staff)]";
      case "Receptionist":
        return "text-[var(--user-table-header-receptionist)]";
      default:
        return "text-[var(--text-highlight)]";
    }
  };

  return (
    <div className="py-5 text-[var(--text-primary)]">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-sm font-semibold leading-none text-[var(--text-primary)] sm:text-base lg:text-lg">
          User profile
        </h1>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--text-highlight)]/50 px-3 py-2 text-xs font-medium text-white shadow-[0_0_8px_rgba(14,255,123,0.12)] transition-colors hover:bg-[var(--text-highlight)]/10"
          >
            <Icon icon="famicons:print-outline" width="15" height="15" />
            Print
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--text-highlight)]/50 px-3 py-2 text-xs font-medium text-white shadow-[0_0_8px_rgba(14,255,123,0.12)] transition-colors hover:bg-[var(--text-highlight)]/10"
          >
            <Icon icon="hugeicons:file-export" width="15" height="15" />
            Export Invoice
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[#0b100e] shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Users
            <span className="ml-2 rounded-full bg-[var(--text-highlight)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--text-highlight)]">
              {usersData.length}
            </span>
          </h2>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users"
                aria-hidden={!isSearchOpen}
                tabIndex={isSearchOpen ? 0 : -1}
                className={`h-8 rounded-l-lg border-y border-l border-[var(--dropdown-border)] bg-black/20 px-3 text-xs text-white outline-none transition-all placeholder:text-white/35 focus:border-[var(--text-highlight)] ${isSearchOpen ? "w-44 opacity-100" : "w-0 border-transparent px-0 opacity-0"}`}
              />
              <button
                type="button"
                onClick={toggleSearch}
                aria-label={isSearchOpen ? "Hide search" : "Open search"}
                className={`flex h-8 w-8 items-center justify-center border border-[var(--dropdown-border)] bg-white/[0.03] text-[var(--text-highlight)] transition hover:bg-[var(--text-highlight)]/10 ${isSearchOpen ? "rounded-r-lg" : "rounded-lg"}`}
              >
                <Icon
                  icon={
                    isSearchOpen
                      ? "solar:close-circle-linear"
                      : "solar:magnifer-linear"
                  }
                  width="16"
                  height="16"
                />
              </button>
            </div>

            {/* Bulk Delete */}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-400/30 bg-rose-400/[0.06] text-rose-300 transition hover:bg-rose-400/[0.14]"
            >
              <Icon
                icon="solar:trash-bin-trash-linear"
                width="15"
                height="15"
              />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse">
            <thead>
              <tr className=" bg-[var(--text-highlight)]/[0.06] text-[10px] uppercase tracking-[0.08em] text-white/45">
                <th className="w-10 px-3 py-3 text-left">
                  <Checkbox
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUsers.length === filteredUsers.length
                    }
                    onChange={toggleAll}
                  />
                </th>

                <th className="relative px-3 py-3 text-left font-medium">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenSortMenu(openSortMenu === "name" ? null : "name")
                    }
                    className="inline-flex items-center gap-1 text-[var(--text-highlight)] transition hover:text-white"
                  >
                    Name <Icon icon="solar:alt-arrow-down-linear" width="13" />
                  </button>
                  {openSortMenu === "name" && (
                    <SortMenu field="name" onSelect={selectSort} />
                  )}
                </th>

                <th className="relative px-3 py-3 text-left font-medium">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenSortMenu(openSortMenu === "email" ? null : "email")
                    }
                    className="inline-flex items-center gap-1 text-[var(--text-highlight)] transition hover:text-white"
                  >
                    Email <Icon icon="solar:alt-arrow-down-linear" width="13" />
                  </button>
                  {openSortMenu === "email" && (
                    <SortMenu field="email" onSelect={selectSort} />
                  )}
                </th>

                <th className="px-3 py-3 text-left font-medium text-[var(--text-highlight)]">
                  Role
                </th>
                <th className="px-3 py-3 text-left font-medium text-[var(--text-highlight)]">
                  Department
                </th>
                <th className="px-3 py-3 text-left font-medium text-[var(--text-highlight)]">
                  Joined on
                </th>
                <th className="px-3 py-3 text-left font-medium text-[var(--text-highlight)]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/[0.055] transition hover:bg-white/[0.015]"
                >
                  {/* Checkbox */}
                  <td className="px-3 py-3">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUser(user.id)}
                    />
                  </td>

                  {/* Name */}
                  <td className="px-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-[var(--text-primary)]">
                        {user.name}
                      </span>
                      <span className="mt-0.5 text-[10px] text-gray-500">
                        {user.userId}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-3 py-3 text-xs text-[var(--text-primary)]">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td
                    className={`px-3 py-3 text-xs font-medium ${getRoleClass(user.role)}`}
                  >
                    {user.role}
                  </td>

                  {/* Department */}
                  <td className="px-3 py-3 text-xs text-[var(--text-primary)]">
                    {user.department}
                  </td>

                  {/* Joined */}
                  <td className="px-3 py-3 text-xs text-[var(--text-primary)]">
                    {user.joined}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        title="View"
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--text-highlight)]/50 shadow-[0_0_8px_rgba(14,255,123,0.12)] transition-colors hover:bg-[var(--text-highlight)]/10"
                      >
                        <Icon icon="cil:external-link" width="12" height="12" />
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--text-highlight)]/50 shadow-[0_0_8px_rgba(14,255,123,0.12)] transition-colors hover:bg-[var(--text-highlight)]/10"
                      >
                        <Icon
                          icon="ant-design:delete-outlined"
                          width="12"
                          height="12"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-12 text-center text-xs text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfileTable;
