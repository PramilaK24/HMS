import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { buildHeaderConfig, DEFAULT_HEADER_CONFIG } from './headerUtils';
import './Header.css';

const HEADER_DEFAULT_ACTIONS = [
  { id: 'notifications', icon: 'material-symbols:notifications-active-outline-rounded', ariaLabel: 'Notifications' },
  { id: 'theme', icon: 'material-symbols:dark-mode-outline-rounded', ariaLabel: 'Theme toggle' },
  { id: 'settings', icon: 'material-symbols:settings-outline-rounded', ariaLabel: 'Settings' },
];

const normalizeBreadcrumbs = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);

  if (!segments.length) return [];

  const crumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { label, path };
  });

  return crumbs;
};

const Header = ({
  title,
  breadcrumbs,
  searchPlaceholder,
  onSearch,
  actions = HEADER_DEFAULT_ACTIONS,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const headerConfig = useMemo(() => {
    const routeBreadcrumbs = normalizeBreadcrumbs(location.pathname);
    const resolvedBreadcrumbs = breadcrumbs?.length ? breadcrumbs : routeBreadcrumbs;

    return buildHeaderConfig({
      title: title || routeBreadcrumbs.at(-1)?.label || DEFAULT_HEADER_CONFIG.title,
      breadcrumbs: resolvedBreadcrumbs,
      searchPlaceholder,
      onSearch,
      actions,
    });
  }, [breadcrumbs, location.pathname, onSearch, searchPlaceholder, title, actions]);

  const handleSearch = (event) => {
    if (typeof onSearch === 'function') {
      onSearch(event.target.value);
    }
  };

  const handleAction = (actionId) => {
    if (actionId === 'settings') {
      navigate('/settings');
      return;
    }

    if (actionId === 'notifications') {
      navigate('/dashboard');
    }
  };

  return (
    <header className="header-shell">
      <div className="header-page">
        {headerConfig.breadcrumbs.length > 1 ? (
          <nav className="header-breadcrumbs" aria-label="Breadcrumb navigation">
            {headerConfig.breadcrumbs.map((crumb, index) => {
              const isCurrent = index === headerConfig.breadcrumbs.length - 1;

              return (
                <React.Fragment key={`${crumb.path}-${index}`}>
                  <span className={`header-breadcrumb ${isCurrent ? 'header-breadcrumb--current' : ''}`}>
                    {crumb.label}
                  </span>
                  {!isCurrent && <span className="header-breadcrumb__separator">/</span>}
                </React.Fragment>
              );
            })}
          </nav>
        ) : (
          <h1 className="header-title">{headerConfig.title}</h1>
        )}
      </div>

      <div className="header-actions">
        <TextField
          className="header-search"
          variant="outlined"
          size="small"
          placeholder={headerConfig.searchPlaceholder}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="material-symbols:search-rounded" />
              </InputAdornment>
            ),
          }}
        />

        {headerConfig.actions.map((action) => (
          <IconButton
            key={action.id}
            className="header-action-btn"
            aria-label={action.ariaLabel || action.id}
            onClick={() => handleAction(action.id)}
          >
            <Icon icon={action.icon} />
          </IconButton>
        ))}
      </div>
    </header>
  );
};

export default Header;
