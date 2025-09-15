"use client";

import { useState, useEffect } from "react";
import Feed from "../components/Feed";

const challenges = [
  { id: 1, text: "Complimente une personne de ton entourage 🌸" },
  { id: 2, text: "Prends 10 minutes pour respirer profondément 🌬️" },
  { id: 3, text: "Écris 3 choses positives dans ta journée ✨" },
  { id: 4, text: "Contacte un ami et prends de ses nouvelles 🤝" },
  { id: 5, text: "Sors marcher au moins 15 minutes dans la nature 🌿" },
  { id: 6, text: "Évite les écrans pendant 1 heure avant de dormir 😴" },
];

export default function DashboardPage() {
  const [dailyChallenges, setDailyChallenges] = useState<typeof challenges>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accepted, setAccepted] = useState<typeof challenges>([]);
  const [validatedIds, setValidatedIds] = useState<number[]>([]);

  // Sélection unique des défis du jour
  useEffect(() => {
    const saved = localStorage.getItem("dailyChallenges");
    if (saved) {
      setDailyChallenges(JSON.parse(saved));
    } else {
      const shuffled = [...challenges].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setDailyChallenges(selected);
      localStorage.setItem("dailyChallenges", JSON.stringify(selected));
    }
  }, []);

  const handleAccept = (id: number) => {
    const challenge = dailyChallenges.find((c) => c.id === id);
    if (challenge && !accepted.find((c) => c.id === id)) {
      setAccepted([...accepted, challenge]);
    }
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => (prev + 1) % dailyChallenges.length);
  };

  const handleValidate = (id: number) => {
    if (!validatedIds.includes(id)) {
      setValidatedIds([...validatedIds, id]);
      alert("Défi validé 🎉");
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 min-h-[80vh] pb-12 px-4 md:px-0">
      <h1 className="text-3xl h1-display text-center">Ton défi du jour 🌞</h1>

      {/* Carte du défi */}
      {dailyChallenges.length > 0 && (
        <div className="bg-[var(--color-sage)]/30 shadow-lg rounded-3xl p-8 text-center max-w-md w-full mx-auto transition-transform duration-200 hover:scale-105 animate-fadeIn">
          <p className="text-lg font-medium text-[var(--color-night)]">
            {dailyChallenges[currentIndex].text}
          </p>
        </div>
      )}

      {/* Boutons accepter/passer */}
      <div className="flex gap-4 mt-4 justify-center flex-wrap">
        {dailyChallenges.length > 0 && (
          <>
            <button
              onClick={() => handleAccept(dailyChallenges[currentIndex].id)}
              className="px-6 py-3 rounded-xl bg-[var(--color-sage)] text-white font-semibold cursor-pointer hover:bg-[var(--color-sage)]/80 shadow-sm transition-all duration-200"
            >
              Accepter
            </button>
            <button
              onClick={handleSkip}
              className="px-6 py-3 rounded-xl border border-[var(--color-night)] text-[var(--color-night)] font-semibold cursor-pointer hover:bg-[var(--color-night)]/10 shadow-sm transition-all duration-200"
            >
              Passer
            </button>
          </>
        )}
      </div>

      {/* Défis acceptés */}
      {accepted.length > 0 && (
        <div className="w-full max-w-md mt-6 flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-center">
            Défis acceptés ✅
          </h2>
          {accepted.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center bg-white shadow-md rounded-xl p-4"
            >
              <span
                className={`text-[var(--color-night)] ${
                  validatedIds.includes(c.id)
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {c.text}
              </span>
              {!validatedIds.includes(c.id) && (
                <button
                  onClick={() => handleValidate(c.id)}
                  className="px-3 py-1 bg-[var(--color-sage)] text-white rounded-lg text-sm hover:bg-[var(--color-sage)]/80 transition"
                >
                  Valider
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Feed */}
      <div className="w-full max-w-2xl mt-8">
        <Feed />
      </div>
    </div>
  );
}
