"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Feed from "../components/Feed";
import { Calendar, Award, CheckCircle } from "lucide-react";

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
    inProgressChallenges: [
      { id: 1, text: "Prendre 10 minutes pour méditer 🌿" },
      { id: 2, text: "Complimenter une personne de ton entourage 🌸" },
    ],
    badges: [
      { id: 1, label: "Exploratrice 🌍", desc: "Premier défi complété" },
      { id: 2, label: "Constante 🔥", desc: "7 jours d’affilée" },
    ],
  });

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-10 gap-12">
      {/* --- HEADER --- */}
      <div className="flex flex-col items-center text-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-28 h-28 rounded-full object-cover shadow-md border-4 border-white"
        />
        <h1 className="text-3xl font-bold mt-4 text-[var(--color-night)]">
          {user.name}
        </h1>
        <p className="text-gray-600 mt-2">{user.bio}</p>

        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => router.push("/profile/edit")}
            className="px-5 py-2 rounded-lg bg-[var(--color-sage)] text-white font-semibold hover:bg-[var(--color-sage)]/80 transition"
          >
            Modifier le profil
          </button>
          <button
            type="button"
            onClick={() => router.push("/profile/connections")}
            className="px-5 py-2 rounded-lg bg-[var(--color-night)] text-white font-semibold hover:bg-[var(--color-night)]/80 transition"
          >
            Mes connexions
          </button>
        </div>
      </div>

      {/* --- STATS --- */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-lg text-center">
        <div className="bg-white shadow-lg rounded-2xl p-5">
          <span className="text-2xl font-bold block">
            {user.stats.challenges}
          </span>
          <span className="text-sm text-gray-500">Défis complétés</span>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-5">
          <span className="text-2xl font-bold block">
            {user.stats.reactions}
          </span>
          <span className="text-sm text-gray-500">Réactions reçues</span>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-5">
          <span className="text-2xl font-bold block">
            {user.stats.streak}🔥
          </span>
          <span className="text-sm text-gray-500">Jours d’affilée</span>
        </div>
      </div>

      {/* --- BADGES --- */}
      <div className="w-full max-w-xl">
        <div className="flex flex-row justify-between items-center mb-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Mes badges
          </h2>
          <button
            onClick={() => router.push("/profile/awards")}
            className="p-2 rounded-lg bg-[var(--color-sage)] text-white text-sm font-semibold hover:bg-[var(--color-sage)]/80 transition"
          >
            Voir tous mes badges
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white shadow-md rounded-xl px-4 py-3 text-center hover:shadow-lg transition"
            >
              <span className="font-medium text-[var(--color-night)]">
                {badge.label}
              </span>
              <p className="text-xs text-gray-500 mt-1">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- DÉFIS EN COURS --- */}
      {user.inProgressChallenges.length > 0 && (
        <div className="w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[var(--color-sage)]" />
            Défis en cours
          </h2>
          <div className="space-y-3">
            {user.inProgressChallenges.map((c) => (
              <div
                key={c.id}
                className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
              >
                <span className="text-[var(--color-night)]">{c.text}</span>
                <button className="px-4 py-1.5 text-sm rounded-lg bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage)]/80">
                  Valider
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- POSTS --- */}
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Mes derniers posts ✨</h2>
        <Feed />
      </div>
    </div>
  );
}
