"use client";

import { useState } from "react";
import { Award, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Badge = {
  id: number;
  label: string;
  desc: string;
  color: string;
};

const initialBadges: Badge[] = [
  {
    id: 1,
    label: "Explorateur",
    desc: "Premier défi complété",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    label: "Motivé",
    desc: "5 jours d’affilée 🔥",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 3,
    label: "Soutien",
    desc: "10 réactions données ❤️",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: 4,
    label: "Populaire",
    desc: "20 réactions reçues ✨",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    label: "Bienveillant",
    desc: "Premier commentaire laissé 🤝",
    color: "bg-blue-100 text-blue-700",
  },
];

export default function BadgesPage() {
  const [badges] = useState<Badge[]>(initialBadges);
  const router = useRouter();

  return (
    <div className="min-h-[80vh] px-6 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center gap-3 w-full max-w-4xl mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-500" />
          Mes badges
        </h1>
      </div>

      {/* Grille des badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex flex-col items-center bg-white shadow-md rounded-2xl px-6 py-5 hover:shadow-lg transition"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg ${badge.color}`}
            >
              🏅
            </div>
            <h3 className="mt-3 font-semibold text-[var(--color-night)]">
              {badge.label}
            </h3>
            <p className="text-sm text-gray-500 mt-1 text-center">
              {badge.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
