
import React from 'react';

interface SidebarProps {
    categories: string[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
  }

const Sidebar = (SidebarProps: SidebarProps) => {


    return (
        
         <aside className="w-64 pr-8">
    <h2 className="font-bold text-lg mb-4">الأقسام</h2>
    <ul className="space-y-2">
      {SidebarProps.categories.map((category) => (
        <li key={category}>
          <button
            onClick={() => SidebarProps.setActiveCategory(category)}
            className={`text-${SidebarProps.activeCategory === category ? 'purple-600 font-semibold' : 'gray-600 hover:text-gray-900'}`}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  </aside>
      
    );
};

export default Sidebar;
