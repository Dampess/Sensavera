"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = { id: number; name: string; avatar: string };

const users: User[] = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
];

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [connectedUserId, setConnectedUserId] = useState<number | null>(null);

  const results = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggleConnection = (userId: number) => {
    if (connectedUserId === userId) {
      setConnectedUserId(null); // se déconnecte
    } else {
      setConnectedUserId(userId); // se connecte
    }
  };

  const goToUserProfile = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Rechercher un utilisateur 🔍
      </h1>

      <input
        type="text"
        placeholder="Nom de l'utilisateur..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-lg border border-[var(--color-sage)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]"
      />

      <div className="flex flex-col gap-3 mt-4">
        {results.length > 0 ? (
          results.map((user) => {
            const isConnected = connectedUserId === user.id;
            return (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                {/* Partie cliquable pour accéder au profil */}
                <div
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => goToUserProfile(user.id)}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>

                {/* Bouton de connexion/déconnexion */}
                <button
                  onClick={() => toggleConnection(user.id)}
                  className={`px-3 py-1 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                    isConnected
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage)]/90"
                  }`}
                >
                  {isConnected ? "Se déconnecter" : "Se connecter"}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">Aucun utilisateur trouvé.</p>
        )}
      </div>
    </div>
  );
}
