export const DEFAULT_HEADER_CONFIG = {
  title: 'Dashboard',
  breadcrumbs: [],
  searchPlaceholder: 'Search patient name...',
  onSearch: null,
  actions: [],
};

export const buildHeaderConfig = ({ title, breadcrumbs = [], searchPlaceholder, onSearch, actions = [] }) => {
  const normalizedTitle = title || DEFAULT_HEADER_CONFIG.title;
  const normalizedBreadcrumbs = Array.isArray(breadcrumbs) ? breadcrumbs.filter(Boolean) : [];

  return {
    title: normalizedTitle,
    breadcrumbs: normalizedBreadcrumbs,
    searchPlaceholder: searchPlaceholder || DEFAULT_HEADER_CONFIG.searchPlaceholder,
    onSearch: typeof onSearch === 'function' ? onSearch : DEFAULT_HEADER_CONFIG.onSearch,
    actions: Array.isArray(actions) ? actions : [],
  };
};
