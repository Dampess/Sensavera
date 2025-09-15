// app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Veuillez renseigner l'email et le mot de passe.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.message || "Erreur lors de la connexion.");
        setLoading(false);
        return;
      }
      // en vrai: gérer token, stockage, redirection selon rôle
      router.push("/dashboard");
    } catch (err) {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-sage)] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2 L14.5 8 L21 9.2 L16 13.6 L17.2 20 L12 16.8 L6.8 20 L8 13.6 L3 9.2 L9.5 8 L12 2Z" fill="white"/>
            </svg>
          </div>
          <h1 className="mt-4 text-2xl h1-display">SENSAVERA</h1>
          <p className="mt-1 text-sm text-[var(--color-night)]/70 i-serif">Chaque jour, positivité et authenticité</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-[var(--color-night)]">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex. toni@exemple.com"
              className="mt-1 block w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)] text-[var(--color-night)]"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-[var(--color-night)]">Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)] text-[var(--color-night)]"
              required
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
           type="submit"
           className="w-full bg-[var(--color-sage)] text-white p-3 rounded-lg font-semibold disabled:opacity-60 cursor-pointer hover:bg-[var(--color-sage)]/85"
           disabled={loading}
           aria-busy={loading}
          >
          {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link href="/auth/register" className="text-[var(--color-night)] hover:underline cursor-pointer">
            Créer un compte
          </Link>
          <button className="text-[var(--color-night)]/70 hover:text-[var(--color-night)] cursor-pointer">
            Mot de passe oublié ?
          </button>
        </div>

        <div className="mt-6">
          <div className="text-center text-sm text-[var(--color-night)]/70 mb-3">Ou se connecter avec</div>
          <div className="grid grid-cols-2 gap-3">
            <button className="w-full border border-[var(--color-night)] p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--color-night)]/20">
              <span>Google</span>
            </button>
            <button className="w-full border border-[var(--color-night)] p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--color-night)]/20">
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
