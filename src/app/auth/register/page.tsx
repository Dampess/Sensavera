"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Étape 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Étape 2
  const goalsList = [
    "Positivité",
    "Santé",
    "Relations",
    "Créativité",
    "Bien-être",
  ];
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inscription envoyée :", {
      name,
      email,
      password,
      selectedGoals,
    });

    // Simuler redirection après inscription réussie
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl h1-display mb-4 text-center">
          Créer un compte
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <label className="block">
                <span className="text-sm font-medium text-[var(--color-night)]">
                  Nom
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ton prénom"
                  className="mt-1 block w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--color-night)]">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex. ami@sensavera.com"
                  className="mt-1 block w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--color-night)]">
                  Mot de passe
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 block w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
                  required
                />
              </label>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-[var(--color-sage)] text-white p-3 rounded-lg font-semibold mt-4 cursor-pointer hover:bg-[var(--color-sage)]/85"
              >
                Continuer
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm mb-2 text-[var(--color-night)]">
                Choisis tes objectifs principaux 🌿
              </p>
              <div className="grid grid-cols-2 gap-3">
                {goalsList.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      selectedGoals.includes(goal)
                        ? "bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage)]/70"
                        : "border-[var(--color-night)] text-[var(--color-night)] hover:bg-[var(--color-night)]/20"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-[var(--color-night)] rounded-lg text-[var(--color-night)] cursor-pointer hover:bg-[var(--color-night)]/10"
                >
                  Retour
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--color-copper)] text-white rounded-lg font-semibold cursor-pointer hover:bg-[var(--color-copper)]/80"
                >
                  Créer mon compte
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
