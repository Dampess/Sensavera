"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const phrases = [
  "Chaque petit pas compte 🌱",
  "Souris, la vie est belle ✨",
  "Tu es capable de grandes choses 💪",
  "Respire profondément et profite de l’instant 🌸",
  "La gratitude transforme tout 🌟",
  "Aujourd’hui est une nouvelle chance 🌞",
];

export default function HomePage() {
  const [phrase, setPhrase] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Phrase aléatoire
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    setPhrase(random);

    // Redirection
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[var(--color-sage)]/20 to-[var(--color-cream)] text-center px-4">
      {/* Logo animé */}
      <div className="w-20 h-20 rounded-full bg-[var(--color-sage)] flex items-center justify-center animate-pulse mb-6 shadow-lg">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2 L14.5 8 L21 9.2 L16 13.6 L17.2 20 L12 16.8 L6.8 20 L8 13.6 L3 9.2 L9.5 8 L12 2Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Phrase positive */}
      <h1 className="text-2xl md:text-3xl font-semibold text-[var(--color-night)] animate-fade-in">
        {phrase}
      </h1>
    </div>
  );
}
