import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Avatar, Button, Collapse, Divider, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import './Sidebar.scss';
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
        <span className="sidebar-nav__icon">
          <Icon icon={item.icon || 'material-symbols:radio-button-unchecked-rounded'} />
        </span>
        <span className="sidebar-nav__label">{item.label}</span>
        {hasChildren && (
          <span className="sidebar-nav__arrow">
            <Icon icon={isExpanded ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:chevron-right-rounded'} />
          </span>
        )}
      </>
    );

    if (!hasChildren) {
      return (
        <li key={item.path || item.label} className="sidebar-nav__item" style={{ paddingLeft: level * 10 }}>
          <NavLink
            to={item.path}
            end
            className={({ isCurrent }) => `sidebar-nav__link ${isCurrent || isActive ? 'is-active' : ''}`}
          >
            {itemContent}
          </NavLink>
        </li>
      );
    }

    return (
      <li key={item.path || item.label} className="sidebar-nav__item" style={{ paddingLeft: level * 8 }}>
        <button
          type="button"
          className={`sidebar-nav__link sidebar-nav__button ${isActive ? 'is-active' : ''}`}
          onClick={() => toggleItem(item.path)}
        >
          {itemContent}
        </button>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <ul className="sidebar-nav sidebar-nav--nested">
            {item.children.map((child) => renderNavItem(child, level + 1))}
          </ul>
        </Collapse>
      </li>
    );
  };

  return (
    <aside className={`sidebar-shell ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar-topbar">
        <div className="sidebar-brand">
          {/* <div className="sidebar-brand__mark">
            <Icon icon="el:lines" />
          </div> */}
          <IconButton className="sidebar-toggle" onClick={handleToggle} aria-label="Toggle sidebar">
           <Icon icon="el:lines" />
          </IconButton>
          <img src={logo} alt="Stacklycare Logo" className="sidebar-brand__logo" />

          <div className="sidebar-brand__text">
            <strong>{brand.name}</strong>
            {/* <span>{brand.shortName || 'HMS'}</span> */}
          </div>
        </div>

        {/* <IconButton className="sidebar-toggle" onClick={handleToggle} aria-label="Toggle sidebar">
          <Icon icon={collapsed ? 'material-symbols:chevron-right-rounded' : 'material-symbols:chevron-left-rounded'} />
        </IconButton> */}
      </div>

      <ul className="sidebar-nav">{sidebarItems.map((item) => renderNavItem(item))}</ul>

      <Divider className="sidebar-divider" />

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <Avatar src={profileDetails.avatar} alt={profileDetails.name} className="sidebar-profile__avatar" />

          <div className="sidebar-profile__meta">
            <strong>{profileDetails.name}</strong>
            <span>{profileDetails.role}</span>
          </div>
        </div>

        <Button
          className="sidebar-logout"
          type="button"
          onClick={onLogout}
          fullWidth
          startIcon={<span className="sidebar-logout__icon"><Icon icon="material-symbols:logout-rounded" /></span>}
        >
          <span className="sidebar-logout__label">Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
