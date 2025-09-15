"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ConnectedUser = {
  id: number;
  name: string;
  avatar: string;
};

export default function ConnectionsPage() {
  const router = useRouter();

  const [connections, setConnections] = useState<ConnectedUser[]>([
    { id: 1, name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 2, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
    { id: 3, name: "David", avatar: "https://i.pravatar.cc/40?img=4" },
  ]);

  const handleDisconnect = (id: number) => {
    setConnections((prev) => prev.filter((u) => u.id !== id));
  };

  const handleBlock = (id: number) => {
    setConnections((prev) => prev.filter((u) => u.id !== id));
    alert("Utilisateur bloqué 🚫");
  };

  const goToUserProfile = (id: number) => {
    router.push(`/user/${id}`); // page de profil public
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6 min-h-[80vh]">
      <button
        onClick={() => router.back()}
        className="self-start mb-4 px-3 py-1 rounded-lg bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage)]/80 transition"
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold mb-4">Mes connexions</h1>

      {connections.length > 0 ? (
        <div className="flex flex-col gap-3">
          {connections.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between bg-white p-3 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            >
              <div
                className="flex items-center gap-3 flex-1"
                onClick={() => goToUserProfile(u.id)}
              >
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium">{u.name}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDisconnect(u.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Déconnecter
                </button>
                <button
                  onClick={() => handleBlock(u.id)}
                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded-lg text-sm hover:bg-gray-400 transition"
                >
                  Bloquer
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          Vous n’êtes connecté à personne pour le moment.
        </p>
      )}
    </div>
  );
}
