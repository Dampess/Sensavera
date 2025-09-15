"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("Alice");
  const [bio, setBio] = useState(
    "🌸 J’aime partager de la positivité chaque jour"
  );
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/100?img=1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profil mis à jour :", { name, bio, avatar });

    // TODO: sauvegarder en base (ex: Supabase, Firebase, API)
    router.push("/profile");
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl h1-display mb-6 text-center">
          Modifier le profil
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="URL de ton avatar"
              className="w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
            />
          </div>

          {/* Nom */}
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

          {/* Bio */}
          <label className="block">
            <span className="text-sm font-medium text-[var(--color-night)]">
              Bio
            </span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Parle un peu de toi 🌿"
              className="mt-1 block w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
              rows={3}
            />
          </label>

          {/* Boutons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="px-4 py-2 border border-[var(--color-night)] rounded-lg text-[var(--color-night)]"
            >
              Annuler
            </button>
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
