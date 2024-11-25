"use client";

import { useState } from "react";
import {
  Bell,
  Calendar,
  ChevronDown,
  HelpCircle,
  Mail,
  MessageSquare,
  Moon,
  Search,
  Settings,
  User,
  BarChart3,
  Box,
  Grid,
  LayoutGrid,
  List,
  Package,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Truck,
  FileText,
  Edit3,
  UserCircle,
  Shield,
  Users,
  Store,
  Ticket,
  Star,
} from "lucide-react";

import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

interface NavItem {
  title: string
  icon: React.ReactNode
  href: string
  submenu?: { title: string; href: string }[]
  section?: string
}

const navigation: NavItem[] = [
  {
    section: 'GENERAL',
    title: 'Dashboard',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/admin'
  },
  {
    title: 'Products',
    icon: <Package className="h-5 w-5" />,
    href: '/admin/products',
    submenu: [
      { title: 'List', href: '/admin/products' },
      { title: 'Create', href: '/admin/products/create' },
      { title: 'Categories', href: '/admin/products/categories' },
    ]
  },
  {
    title: 'Inventory',
    icon: <Box className="h-5 w-5" />,
    href: '/admin/inventory',
    submenu: [
      { title: 'Warehouse List', href: '/admin/inventory/warehouses' },
      { title: 'Received Orders', href: '/admin/inventory/received' },
    ]
  },
  {
    title: 'Orders',
    icon: <ShoppingCart className="h-5 w-5" />,
    href: '/admin/orders'
  },
  {
    title: 'Purchases',
    icon: <ShoppingBag className="h-5 w-5" />,
    href: '/admin/purchases',
    submenu: [
      { title: 'All Purchases', href: '/admin/purchases' },
      { title: 'Add Purchase', href: '/admin/purchases/create' },
      { title: 'Return Purchases', href: '/admin/purchases/returns' },
    ]
  },
  {
    title: 'Attributes',
    icon: <Tag className="h-5 w-5" />,
    href: '/admin/attributes',
    submenu: [
      { title: 'List', href: '/admin/attributes' },
      { title: 'Create', href: '/admin/attributes/create' },
    ]
  },
  {
    title: 'Invoices',
    icon: <FileText className="h-5 w-5" />,
    href: '/admin/invoices',
    submenu: [
      { title: 'All Invoices', href: '/admin/invoices' },
      { title: 'Create Invoice', href: '/admin/invoices/create' },
    ]
  },
  {
    section: 'USERS',
    title: 'Profile',
    icon: <UserCircle className="h-5 w-5" />,
    href: '/admin/profile'
  },
  {
    title: 'Roles',
    icon: <Shield className="h-5 w-5" />,
    href: '/admin/roles',
    submenu: [
      { title: 'All Roles', href: '/admin/roles' },
      { title: 'Create Role', href: '/admin/roles/create' },
      { title: 'Permissions', href: '/admin/roles/permissions' },
    ]
  },
  {
    title: 'Permissions',
    icon: <Shield className="h-5 w-5" />,
    href: '/admin/permissions'
  },
  {
    title: 'Customers',
    icon: <Users className="h-5 w-5" />,
    href: '/admin/customers',
    submenu: [
      { title: 'All Customers', href: '/admin/customers' },
      { title: 'Add Customer', href: '/admin/customers/create' },
    ]
  },
  {
    title: 'Sellers',
    icon: <Store className="h-5 w-5" />,
    href: '/admin/sellers',
    submenu: [
      { title: 'All Sellers', href: '/admin/sellers' },
      { title: 'Add Seller', href: '/admin/sellers/create' },
      { title: 'Verification Requests', href: '/admin/sellers/verification' },
    ]
  },
  {
    section: 'OTHER',
    title: 'Coupons',
    icon: <Ticket className="h-5 w-5" />,
    href: '/admin/coupons',
    submenu: [
      { title: 'All Coupons', href: '/admin/coupons' },
      { title: 'Create Coupon', href: '/admin/coupons/create' },
    ]
  },
  {
    title: 'Reviews',
    icon: <Star className="h-5 w-5" />,
    href: '/admin/reviews',
    submenu: [
      { title: 'All Reviews', href: '/admin/reviews' },
      { title: 'Reported Reviews', href: '/admin/reviews/reported' },
    ]
  },
  {
    section: 'SETTINGS',
    title: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/admin/settings',
    submenu: [
      { title: 'General', href: '/admin/settings' },
      { title: 'Appearance', href: '/admin/settings/appearance' },
      { title: 'Email', href: '/admin/settings/email' },
      { title: 'System', href: '/admin/settings/system' },
    ]
  }
]
interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
  };


 
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={cn(
        "bg-[#1a1c23] text-white transition-all duration-300 ease-in-out overflow-y-auto",
        sidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="sticky top-0 z-10 bg-[#1a1c23] p-4 flex items-center border-b border-gray-800">
          <div className="text-2xl font-bold">Mawada</div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="ml-auto text-gray-400 hover:text-white"
          >
            <ChevronDown className={cn(
              "transform transition-transform duration-200",
              !sidebarOpen && "-rotate-90"
            )} />
          </button>
        </div>

        <nav className="space-y-1 py-4">
          {navigation.map((item) => (
            <div key={item.title}>
              {item.section && sidebarOpen && (
                <div className="px-4 py-2 text-xs uppercase text-gray-400 mt-4">
                  {item.section}
                </div>
              )}
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white",
                  "transition-colors duration-200"
                )}
                onClick={(e) => {
                  if (item.submenu) {
                    e.preventDefault()
                    toggleSubmenu(item.title)
                  }
                }}
              >
                {item.icon}
                {sidebarOpen && (
                  <>
                    <span className="ml-3">{item.title}</span>
                    {item.submenu && (
                      <ChevronDown 
                        className={cn(
                          "ml-auto h-4 w-4 transition-transform duration-200",
                          expandedItems.includes(item.title) ? "rotate-180" : ""
                        )} 
                      />
                    )}
                  </>
                )}
              </Link>
              
              {sidebarOpen && item.submenu && expandedItems.includes(item.title) && (
                <div className="pl-11 space-y-1 bg-gray-900/50">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.title}
                      to={subitem.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    >
                      {subitem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">WELCOME!</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Moon className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200">
                <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-full h-full rounded-full" />
              </button>
            </div>
          </div>
        </div>
        {children}
      
      </div>
    </div>
  );
}
