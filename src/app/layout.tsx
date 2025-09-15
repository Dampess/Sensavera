"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaPlus,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { MessageCircle, Heart, Book, Wind, X } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [openToolbox, setOpenToolbox] = useState(false);

  // States pour les modals
  const [chatOpen, setChatOpen] = useState(false);
  const [wellbeingOpen, setWellbeingOpen] = useState(false);
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "/dashboard", icon: <FaHome />, label: "Feed" },
    { href: "/profile", icon: <FaUser />, label: "Profil" },
    { href: "/create-post", icon: <FaPlus />, label: "Upload" },
    { href: "/search", icon: <FaSearch />, label: "Rechercher" },
    { href: "/settings", icon: <FaCog />, label: "Paramètres" },
  ];

  return (
    <html lang="fr">
      <body className="min-h-screen bg-[var(--color-cream)] text-[var(--color-night)] flex">
        {/* Sidebar PC */}
        {isConnected && (
          <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-20 bg-white/95 backdrop-blur-md shadow-lg border-r border-[rgba(29,42,68,0.1)]">
            <div className="pt-[72px] pb-[72px] flex flex-col flex-1 items-center py-6">
              <nav className="flex flex-col gap-6 flex-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center gap-1 text-[var(--color-night)] hover:text-[var(--color-sage)] hover:bg-[var(--color-sage)]/10 px-2 py-2 rounded-lg transition-colors duration-200"
                    title={item.label}
                  >
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <button
                onClick={() => setIsConnected(false)}
                className="flex flex-col items-center gap-1 text-[var(--color-night)] hover:text-[var(--color-sage)] hover:bg-[var(--color-sage)]/10 px-2 py-2 rounded-lg transition-colors duration-200"
                title="Déconnexion"
              >
                <FaSignOutAlt />
                <span className="text-xs">Déconnexion</span>
              </button>
            </div>
          </aside>
        )}

        {/* Main content */}
        <div
          className={`flex-1 flex flex-col ${isConnected ? "md:ml-20" : ""}`}
        >
          {/* Header */}
          <header className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-white/90 shadow-md flex items-center justify-between px-4 transition-all duration-300">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-sage)] flex items-center justify-center animate-pulse"></div>
              <span className="text-lg font-bold tracking-wide">SENSAVERA</span>
            </Link>
          </header>

          {/* Contenu principal */}
          <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full min-h-[calc(100vh-144px)]">
            {children}
          </main>

          {/* Footer */}
          <footer className="h-16 mt-auto flex md:flex-row flex-col items-center justify-center gap-2 bg-white/90 text-[var(--color-sage)]/70 border-t border-[rgba(29,42,68,0.06)] text-sm px-4">
            <span className="hidden md:block">
              © {new Date().getFullYear()} SENSAVERA — Chaque jour, positivité
              et authenticité 🌿
            </span>
            <div className="flex gap-2 md:gap-4">
              <Link href="/legal/mentions" className="hover:underline text-sm">
                Mentions légales
              </Link>
              <Link href="/legal/privacy" className="hover:underline text-sm">
                Politique de confidentialité
              </Link>
            </div>
          </footer>
        </div>

        {/* Barre mobile */}
        {isConnected && (
          <nav className="fixed bottom-0 md:hidden left-0 right-0 flex justify-around items-center bg-white/90 backdrop-blur-xl shadow-t border-t border-[rgba(29,42,68,0.1)] py-3">
            {menuItems.map((item, idx) => {
              const isCenter = idx === 2;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center text-[var(--color-night)] transition-colors ${
                    isCenter
                      ? "bg-[var(--color-sage)] text-white w-14 h-14 rounded-full -mt-6 shadow-lg flex items-center justify-center scale-110 hover:scale-125 transition-transform"
                      : "hover:text-[var(--color-sage)]"
                  }`}
                  title={item.label}
                >
                  {item.icon}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Bulle Boîte à outils */}
        <div className="fixed bottom-20 right-6 z-50">
          <button
            onClick={() => setOpenToolbox(!openToolbox)}
            className="w-14 h-14 rounded-full bg-[var(--color-sage)] text-white shadow-lg flex items-center justify-center hover:scale-110 transition"
          >
            🛠️
          </button>

          {openToolbox && (
            <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-xl p-4 w-64 animate-fadeIn">
              <h3 className="font-semibold text-lg mb-3">Boîte à outils 🌿</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <button
                    onClick={() => setChatOpen(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <MessageCircle className="w-5 h-5 text-[var(--color-sage)]" />
                    <span>Chat ami</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setWellbeingOpen(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Conseils bien-être</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setBreathingOpen(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <Wind className="w-5 h-5 text-blue-500" />
                    <span>Exercice respiration</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setResourcesOpen(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <Book className="w-5 h-5 text-yellow-600" />
                    <span>Ressources utiles</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Modals */}
        {chatOpen && (
          <Modal title="Chat ami 🤗" onClose={() => setChatOpen(false)}>
            <p>Ici tu pourrais discuter avec un chatbot style “ami”.</p>
          </Modal>
        )}
        {wellbeingOpen && (
          <Modal
            title="Conseils bien-être 💡"
            onClose={() => setWellbeingOpen(false)}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>Prends 5 min pour respirer profondément</li>
              <li>Note 3 choses positives de ta journée</li>
              <li>Éteins tes écrans avant de dormir</li>
            </ul>
          </Modal>
        )}
        {breathingOpen && (
          <Modal
            title="Exercice respiration 🌬️"
            onClose={() => setBreathingOpen(false)}
          >
            <p>
              Inspire 4 sec... Retient 4 sec... Expire 6 sec... Répète 5 fois.
            </p>
          </Modal>
        )}
        {resourcesOpen && (
          <Modal
            title="Ressources utiles 📚"
            onClose={() => setResourcesOpen(false)}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="https://www.who.int/fr" target="_blank">
                  OMS - Santé mentale
                </a>
              </li>
              <li>
                <a href="https://psycom.org" target="_blank">
                  Psycom
                </a>
              </li>
              <li>
                <a href="https://sante.gouv.fr" target="_blank">
                  Ministère de la Santé
                </a>
              </li>
            </ul>
          </Modal>
        )}
      </body>
    </html>
  );
}

/* Modal générique */
function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-[var(--color-night)]">{children}</div>
      </div>
    </div>
  );
}
