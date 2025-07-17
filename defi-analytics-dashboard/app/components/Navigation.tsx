'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navigation items
const navItems = [
  { path: '/', label: '🏠 Overview', emoji: '🏠' },
  { path: '/revenue', label: '💰 Revenue', emoji: '💰' },
  { path: '/liquidations', label: '🌊 Liquidations', emoji: '🌊' },
  { path: '/orders', label: '📊 Orders', emoji: '📊' },
  { path: '/pools', label: '🏊‍♂️ Pools', emoji: '🏊‍♂️' },
  { path: '/users', label: '👥 Users', emoji: '👥' },
  { path: '/wallets', label: '👛 Wallets', emoji: '👛' },
];

// Navigation link component with active state
function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href}
      className={`nav-link whitespace-nowrap transition-all ${
        isActive 
          ? 'nav-link-active' 
          : 'text-text-muted hover:text-text hover:bg-card-hover'
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav className="bg-card/50 backdrop-blur-md border-b border-border sticky top-16 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-2 no-scrollbar">
          {navItems.map((item) => (
            <NavLink key={item.path} href={item.path} label={item.label} />
          ))}
        </div>
      </div>
    </nav>
  );
}