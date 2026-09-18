import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { buildHeaderConfig, DEFAULT_HEADER_CONFIG } from './headerUtils';

const HEADER_DEFAULT_ACTIONS = [
  { id: 'notifications', icon: 'material-symbols:notifications-active-outline-rounded', ariaLabel: 'Notifications' },
  { id: 'theme', icon: 'material-symbols:dark-mode-outline-rounded', ariaLabel: 'Theme toggle' },
  { id: 'settings', icon: 'material-symbols:settings-outline-rounded', ariaLabel: 'Settings' },
];

const normalizeBreadcrumbs = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);

  if (!segments.length) return [];

  // Doctor record IDs are route keys, not user-facing breadcrumb labels.
  if (segments[0] === 'doctor-nurse' && segments[1] === 'doctor') {
    const basePath = '/doctor-nurse/doctor';
    const crumbs = [{ label: 'Doctors', path: basePath }];
    if (segments[2]) crumbs.push({ label: segments[2] === 'add' ? 'Add Doctor' : 'Doctor Profile', path: `${basePath}/${segments[2]}` });
    if (segments[3] === 'edit') crumbs.push({ label: 'Edit Doctor', path: pathname });
    if (segments[3] === 'medicine-allocation') crumbs.push({ label: 'Medicine Allocation', path: pathname });
    return crumbs;
  }

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
    } else if (location.pathname.startsWith('/doctor-nurse/doctor')) {
      const params = new URLSearchParams(location.search);
      if (event.target.value) params.set('q', event.target.value); else params.delete('q');
      params.delete('page');
      const target = location.pathname.endsWith('/medicine-allocation') ? location.pathname : '/doctor-nurse/doctor';
      navigate({ pathname: target, search: params.toString() }, { replace: true, state: location.state });
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
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0EFF7B1F] bg-[#071611]/90 px-4 py-3 backdrop-blur-sm md:px-6">
      <div className="min-w-0 basis-full lg:flex-1 lg:basis-auto">
        {headerConfig.breadcrumbs.length > 1 ? (
          <nav className="flex flex-wrap items-center gap-1 text-sm text-white/70" aria-label="Breadcrumb navigation">
            {headerConfig.breadcrumbs.map((crumb, index) => {
              const isCurrent = index === headerConfig.breadcrumbs.length - 1;

              return (
                <React.Fragment key={`${crumb.path}-${index}`}>
                  <span className={isCurrent ? 'font-medium text-[#0EFF7B]' : 'text-white/70'}>{crumb.label}</span>
                  {!isCurrent && <span className="text-white/40">/</span>}
                </React.Fragment>
              );
            })}
          </nav>
        ) : (
          <h1 className="m-0 text-xl font-semibold text-white md:text-2xl">{headerConfig.title}</h1>
        )}
      </div>

      <div className="grid min-w-0 w-full grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-1 sm:gap-2 lg:w-auto">
        <TextField
          className="!min-w-0 w-full lg:w-[220px]"
          variant="outlined"
          size="small"
          placeholder={headerConfig.searchPlaceholder}
          onChange={handleSearch}
          value={location.pathname.startsWith('/doctor-nurse/doctor') ? new URLSearchParams(location.search).get('q') || '' : undefined}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(11, 18, 15, 0.9)',
              borderRadius: '12px',
              color: '#fff',
              '& fieldset': {
                borderColor: 'rgba(14, 255, 123, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(14, 255, 123, 0.45)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0EFF7B',
              },
            },
            '& .MuiInputBase-input': {
              color: '#fff',
              fontSize: '0.85rem',
              paddingY: '8px',
            },
            '& .MuiInputAdornment-root': {
              color: 'rgba(255,255,255,0.7)',
            },
          }}
          slotProps={{ input: {
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="material-symbols:search-rounded" width={18} height={18} />
              </InputAdornment>
            ),
          } }}
        />

        {headerConfig.actions.map((action) => (
          <IconButton
            key={action.id}
            aria-label={action.ariaLabel || action.id}
            onClick={() => handleAction(action.id)}
            className="!flex !h-10 !w-10 !items-center !justify-center !rounded-full !border !border-[#0EFF7B1F] !bg-[#0B120F] !text-white/80 hover:!bg-[#0EFF7B14] hover:!text-[#0EFF7B]"
          >
            <Icon icon={action.icon} width={18} height={18} />
          </IconButton>
        ))}
      </div>
    </header>
  );
};

export default Header;

