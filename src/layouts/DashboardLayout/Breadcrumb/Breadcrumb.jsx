import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const { pathname } = useLocation();
  if (pathname === '/doctors' || pathname.startsWith('/doctors/')) {
    const label = pathname === '/doctors/add' ? 'Add Doctor' : pathname.endsWith('/edit') ? 'Edit Doctor' : 'Doctor Profile';
    return <nav aria-label="Breadcrumb" className="breadcrumb text-sm text-white/60"><Link to="/doctors" className="hover:text-text-highlight">Doctors</Link>{pathname !== '/doctors' && <span> / <span aria-current="page" className="text-text-highlight">{label}</span></span>}</nav>;
  }
  return (
    <div className="breadcrumb">
      <span>Home / Dashboard</span>
    </div>
  );
};

export default Breadcrumb;
