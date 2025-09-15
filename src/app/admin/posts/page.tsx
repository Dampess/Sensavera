"use client";

import { useState } from "react";

type Post = { id: number; user: string; content: string; isReported: boolean };

const initialPosts: Post[] = [
  { id: 1, user: "Alice", content: "Post 1", isReported: false },
  { id: 2, user: "Bob", content: "Post 2", isReported: true },
  { id: 3, user: "Charlie", content: "Post 3", isReported: false },
];

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const deletePost = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const toggleReport = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isReported: !p.isReported } : p))
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-4">Gestion des posts</h1>

      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[var(--color-copper)]/20 text-left">
            <th className="p-3">Utilisateur</th>
            <th className="p-3">Contenu</th>
            <th className="p-3">Signalé</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b last:border-b-0">
              <td className="p-3">{post.user}</td>
              <td className="p-3">{post.content}</td>
              <td className="p-3">
                {post.isReported ? (
                  <span className="text-red-600 font-semibold">Oui</span>
                ) : (
                  <span className="text-green-600 font-semibold">Non</span>
                )}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => toggleReport(post.id)}
                  className={`px-3 py-1 rounded-lg font-medium text-white transition ${
                    post.isReported
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {post.isReported ? "Marquer non signalé" : "Signaler"}
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
