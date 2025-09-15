"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("fr");
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings sauvegardés :", { theme, language, notifications });
    alert("Paramètres sauvegardés ✅ (simulation)");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "⚠️ Es-tu sûr de vouloir supprimer ton compte et toutes tes données ? Cette action est irréversible."
      )
    ) {
      console.log("Compte supprimé (simulation)");
      alert("Ton compte a été supprimé (simulation).");
      // TODO: backend suppression réelle
    }
  };

  const handleLogoutAll = () => {
    console.log("Déconnexion de tous les appareils (simulation)");
    alert("Déconnecté de tous les appareils (simulation)");
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl h1-display mb-6 text-center">Paramètres</h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Thème */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-night)]">
              Thème
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="system">Système</option>
            </select>
          </div>

          {/* Langue */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-night)]">
              Langue
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-night)]">
              Notifications
            </span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-5 h-5 accent-[var(--color-sage)]"
            />
          </div>

          {/* Compte */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Compte</h2>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-[var(--color-sage)] text-white rounded-lg"
              >
                Modifier l’email
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[var(--color-copper)] text-white rounded-lg"
              >
                Modifier le mot de passe
              </button>
              <button
                type="button"
                onClick={handleLogoutAll}
                className="px-4 py-2 border border-[var(--color-night)] text-[var(--color-night)] rounded-lg"
              >
                Déconnexion de tous les appareils
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold"
              >
                Supprimer mon compte ❌
              </button>
            </div>
          </div>

          {/* Autres */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Autres</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="/legal/privacy" className="underline">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="/legal/terms" className="underline">
                  Conditions générales d’utilisation
                </a>
              </li>
              <li className="text-gray-400">Version 1.0.0</li>
            </ul>
          </div>

          {/* Bouton Sauvegarder */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[var(--color-copper)] text-white rounded-lg font-semibold"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
