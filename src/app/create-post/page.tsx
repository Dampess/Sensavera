"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [type, setType] = useState<"text" | "image" | "video">("text");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Nouveau post :", { type, content, media });

    // TODO: sauvegarde backend
    router.push("/dashboard"); // redirection après publication
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl h1-display mb-6 text-center">Créer un post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sélecteur de type */}
          <div className="flex justify-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => setType("text")}
              className={`px-4 py-2 rounded-lg ${
                type === "text"
                  ? "bg-[var(--color-sage)] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Texte
            </button>
            <button
              type="button"
              onClick={() => setType("image")}
              className={`px-4 py-2 rounded-lg ${
                type === "image"
                  ? "bg-[var(--color-sage)] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Image
            </button>
            <button
              type="button"
              onClick={() => setType("video")}
              className={`px-4 py-2 rounded-lg ${
                type === "video"
                  ? "bg-[var(--color-sage)] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Vidéo
            </button>
          </div>

          {/* Contenu texte */}
          {type === "text" && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Partage ton moment positif ✨"
              className="w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
              rows={4}
            />
          )}

          {/* Lien média */}
          {(type === "image" || type === "video") && (
            <>
              <input
                type="url"
                value={media}
                onChange={(e) => setMedia(e.target.value)}
                placeholder={`URL de ton ${type}`}
                className="w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ajoute une petite légende 🌿"
                className="w-full p-3 rounded-lg border border-[var(--color-sage)] bg-[var(--color-cream)]"
                rows={3}
              />
            </>
          )}

          {/* Aperçu */}
          {(content || media) && (
            <div className="mt-4 p-4 bg-gray-50 border rounded-xl">
              <h2 className="font-semibold mb-2">Aperçu</h2>
              {type === "text" && <p>{content}</p>}
              {type === "image" && (
                <div>
                  <img
                    src={media}
                    alt="aperçu"
                    className="rounded-lg max-h-[200px] object-cover"
                  />
                  <p className="mt-2">{content}</p>
                </div>
              )}
              {type === "video" && (
                <div>
                  <video
                    src={media}
                    controls
                    className="rounded-lg max-h-[200px]"
                  />
                  <p className="mt-2">{content}</p>
                </div>
              )}
            </div>
          )}

          {/* Boutons */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[var(--color-copper)] text-white rounded-lg font-semibold"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
