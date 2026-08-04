"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: "🏠", path: "/" },
    { label: "Jobs", icon: "💼", path: "/jobs" },
    { label: "Exams", icon: "🎓", path: "/govt-exams" },
    { label: "Learn", icon: "📖", path: "/learn" },
    { label: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`bottom-nav-item ${pathname === item.path ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
