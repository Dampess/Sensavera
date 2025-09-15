"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FaUsers,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnected, setIsConnected] = useState(true);

  const menuItems = [
    { href: "/admin/users", icon: <FaUsers />, label: "Utilisateurs" },
    { href: "/admin/posts", icon: <FaClipboardList />, label: "Posts" },
    { href: "/admin/stats", icon: <FaChartBar />, label: "Stats" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-cream)] text-[var(--color-night)]">
      {/* Sidebar PC uniquement */}
      {isConnected && (
        <aside className="hidden z-100 md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg border-r border-[rgba(29,42,68,0.1)]">
          <div className="flex flex-col flex-1 py-6">
            <div className="px-6 mb-6 text-2xl font-bold">Admin</div>
            <nav className="flex flex-col gap-4 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-sage)]/10 hover:text-[var(--color-sage)] transition"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <button
              onClick={() => setIsConnected(false)}
              className="mt-auto flex items-center gap-3 p-3 text-red-600 hover:bg-red-100 rounded-lg transition mx-2"
            >
              <FaSignOutAlt />
              Déconnexion
            </button>
          </div>
        </aside>
      )}

      {/* Contenu principal */}
      <div className={`flex-1 flex flex-col ${isConnected ? "md:ml-64" : ""}`}>
        <header className="sticky top-0 z-50 h-[72px] bg-white/90 border-b border-[rgba(29,42,68,0.1)] flex items-center px-6 shadow-sm">
          <h1 className="text-xl font-bold">Backoffice Admin</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>

        {/* Barre mobile uniquement */}
        {isConnected && (
          <nav className="z-100 h-26 fixed bottom-0 left-0 right-0 flex md:hidden items-center justify-around bg-white shadow-t border-t border-[rgba(29,42,68,0.1)] py-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center text-[var(--color-night)] hover:text-[var(--color-sage)] transition-colors text-lg"
                title={item.label}
              >
                {item.icon}
              </Link>
            ))}
            <button
              onClick={() => setIsConnected(false)}
              className="flex flex-col items-center text-red-600 hover:text-red-500 transition-colors text-lg"
              title="Déconnexion"
            >
              <FaSignOutAlt />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
