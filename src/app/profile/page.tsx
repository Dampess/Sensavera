"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Feed from "../components/Feed";

export default function ProfilePage() {
  const router = useRouter();

  const [user] = useState({
    name: "Alice",
    avatar: "https://i.pravatar.cc/100?img=1",
    bio: "🌸 J’aime partager de la positivité chaque jour",
    stats: {
      challenges: 12,
      reactions: 45,
      streak: 5,
    },
  });

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8 gap-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <h1 className="text-2xl h1-display mt-4">{user.name}</h1>
        <p className="text-gray-600 mt-2">{user.bio}</p>

        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => router.push("/profile/edit")}
            className="px-4 py-2 bg-[var(--color-sage)] text-white rounded-lg font-semibold"
          >
            Modifier le profil
          </button>

          <button
            type="button"
            onClick={() => router.push("/profile/connections")}
            className="px-4 py-2 bg-[var(--color-night)] text-white rounded-lg font-semibold"
          >
            Mes connexions
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-xl font-bold">{user.stats.challenges}</span>
          <span className="text-sm text-gray-500">Défis complétés</span>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-xl font-bold">{user.stats.reactions}</span>
          <span className="text-sm text-gray-500">Réactions reçues</span>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-xl font-bold">{user.stats.streak}🔥</span>
          <span className="text-sm text-gray-500">Jours d’affilée</span>
        </div>
      </div>

      {/* Derniers posts */}
      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Mes derniers posts</h2>
        <Feed />
      </div>
    </div>
  );
}
