import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Avatar, Button, Collapse, Divider, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import logo from '../../../assets/login/logo.png';

const itemMatchesPath = (itemPath, currentPath) => {
  if (!itemPath) return false;
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
};

const Sidebar = ({
  items = [],
  profile = null,
  brand = { name: 'Stacklycare', shortName: 'SC' },
  onLogout,
}) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMap, setExpandedMap] = useState({});

  const sidebarItems = useMemo(() => items || [], [items]);

  const profileDetails = profile || {
    name: 'Dr. Victoria',
    role: 'Super Admin',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  };

  useEffect(() => {
    const nextExpanded = { ...expandedMap };

    const markParents = (list) => {
      list.forEach((item) => {
        const hasActiveChild = item.children?.some((child) => itemMatchesPath(child.path, location.pathname));

        if (hasActiveChild) {
          nextExpanded[item.path] = true;
        }
      });
    };

    markParents(sidebarItems);
    setExpandedMap(nextExpanded);
  }, [location.pathname, sidebarItems]);

  const handleToggle = () => setCollapsed((prev) => !prev);

  const toggleItem = (path) => {
    setExpandedMap((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderNavItem = (item, level = 0) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const isActive = itemMatchesPath(item.path, location.pathname);
    const isExpanded = Boolean(expandedMap[item.path] || isActive);

    const itemContent = (
      <>
        <span className="flex h-5 w-5 items-center justify-center text-base">
          <Icon icon={item.icon || 'material-symbols:radio-button-unchecked-rounded'} />
        </span>
        {!collapsed && <span className="truncate">{item.label}</span>}
        {hasChildren && !collapsed && (
          <span className="ml-auto text-white/60">
            <Icon icon={isExpanded ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:chevron-right-rounded'} />
          </span>
        )}
      </>
    );

    if (!hasChildren) {
      return (
        <li key={item.path || item.label} className="list-none" style={{ paddingLeft: level * 10 }}>
          <NavLink
            to={item.path}
            end
            className={({ isCurrent }) => `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 ${
              isCurrent || isActive ? 'bg-[#0EFF7B1F] text-[#0EFF7B] shadow-[inset_0_0_0_1px_rgba(14,255,123,0.1)]' : 'text-white/75 hover:bg-white/5 hover:text-white'
            } ${collapsed ? 'justify-center px-2' : ''}`}
          >
            {itemContent}
          </NavLink>
        </li>
      );
    }

    return (
      <li key={item.path || item.label} className="list-none" style={{ paddingLeft: level * 8 }}>
        <button
          type="button"
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 ${
            isActive ? 'bg-[#0EFF7B1F] text-[#0EFF7B] shadow-[inset_0_0_0_1px_rgba(14,255,123,0.1)]' : 'text-white/75 hover:bg-white/5 hover:text-white'
          } ${collapsed ? 'justify-center px-2' : ''}`}
          onClick={() => toggleItem(item.path)}
        >
          {itemContent}
        </button>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <ul className="mt-1 space-y-1 overflow-hidden pl-2">
            {item.children.map((child) => renderNavItem(child, level + 1))}
          </ul>
        </Collapse>
      </li>
    );
  };

  return (
    <aside className={`flex flex-col border-r border-[#0EFF7B1F] bg-[#05150f]/95 py-4 transition-all duration-200 ${collapsed ? 'w-20' : 'w-[260px]'}`}>
      <div className="px-3 pb-4">
        <div className="flex items-center gap-3 rounded-xl border border-[#0EFF7B1F] bg-[#0B120F]/70 px-2 py-2.5">
          <IconButton
            onClick={handleToggle}
            aria-label="Toggle sidebar"
            className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !border !border-[#0EFF7B1F] !bg-[#0EFF7B14] !text-[#0EFF7B]"
          >
            <Icon icon="el:lines" width={18} height={18} />
          </IconButton>

          {!collapsed && (
            <>
              <img src={logo} alt="Stacklycare Logo" className="h-8 w-8 rounded-md object-cover" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{brand.name}</div>
              </div>
            </>
          )}
        </div>
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto px-2">{sidebarItems.map((item) => renderNavItem(item))}</ul>

      <Divider className="!my-3 !border-[#0EFF7B1F]" />

      <div className="px-3 pb-1">
        <div className="flex items-center gap-3 rounded-xl border border-[#0EFF7B1F] bg-[#0B120F]/70 p-2">
          <Avatar src={profileDetails.avatar} alt={profileDetails.name} className="!h-10 !w-10" />

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white">{profileDetails.name}</div>
              <div className="truncate text-[11px] text-white/60">{profileDetails.role}</div>
            </div>
          )}
        </div>

        <Button
          className="!mt-3 !flex !w-full !items-center !justify-center !rounded-xl !border !border-[#0EFF7B1F] !bg-[#0EFF7B14] !px-3 !py-2.5 !text-sm !font-medium !normal-case !text-[#0EFF7B] hover:!bg-[#0EFF7B24]"
          type="button"
          onClick={onLogout}
          fullWidth
          startIcon={<Icon icon="material-symbols:logout-rounded" />}
        >
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
