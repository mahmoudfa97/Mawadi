import React from 'react';

type NavItemProps = {
  label: string;
  className: string
};

const NavItem: React.FC<NavItemProps> = ({ label, className }) => (
  <div className={className}>
  <div className="flex flex-col justify-center items-end px-3 py-4">
    <div className="py-1">{label}</div>
  </div>
  </div>
);

export default NavItem;