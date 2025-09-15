"use client";

import { useState } from "react";
import Link from "next/link";

type User = { id: number; name: string; email: string; isBlocked: boolean };
type Post = { id: number; user: string; content: string; isReported: boolean };

const initialUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", isBlocked: false },
  { id: 2, name: "Bob", email: "bob@example.com", isBlocked: false },
  { id: 3, name: "Charlie", email: "charlie@example.com", isBlocked: true },
];

const initialPosts: Post[] = [
  { id: 1, user: "Alice", content: "Post 1", isReported: false },
  { id: 2, user: "Bob", content: "Post 2", isReported: true },
  { id: 3, user: "Charlie", content: "Post 3", isReported: false },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const blockedCount = users.filter((u) => u.isBlocked).length;
  const reportedPostsCount = posts.filter((p) => p.isReported).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>

      {/* Recap Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--color-sage)]/30 p-6 rounded-2xl shadow flex flex-col items-center">
          <span className="text-xl font-semibold">{users.length}</span>
          <span className="text-sm text-gray-700">Utilisateurs totaux</span>
          <Link
            href="/admin/users"
            className="mt-2 text-[var(--color-sage)] hover:underline"
          >
            Voir détails
          </Link>
        </div>
        <div className="bg-[var(--color-copper)]/30 p-6 rounded-2xl shadow flex flex-col items-center">
          <span className="text-xl font-semibold">{blockedCount}</span>
          <span className="text-sm text-gray-700">Utilisateurs bloqués</span>
          <Link
            href="/admin/users"
            className="mt-2 text-[var(--color-copper)] hover:underline"
          >
            Gérer
          </Link>
        </div>
        <div className="bg-[var(--color-night)]/20 p-6 rounded-2xl shadow flex flex-col items-center">
          <span className="text-xl font-semibold">{reportedPostsCount}</span>
          <span className="text-sm text-gray-700">Posts signalés</span>
          <Link
            href="/admin/posts"
            className="mt-2 text-[var(--color-night)] hover:underline"
          >
            Voir
          </Link>
        </div>
      </div>

      {/* Liste rapide des utilisateurs bloqués */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Utilisateurs bloqués</h2>
        <ul className="flex flex-col gap-2">
          {users
            .filter((u) => u.isBlocked)
            .map((u) => (
              <li
                key={u.id}
                className="bg-white p-3 rounded-lg shadow flex justify-between items-center"
              >
                <span>
                  {u.name} ({u.email})
                </span>
                <button
                  onClick={() =>
                    setUsers((prev) =>
                      prev.map((user) =>
                        user.id === u.id ? { ...user, isBlocked: false } : user
                      )
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Débloquer
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Liste rapide des posts signalés */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Posts signalés</h2>
        <ul className="flex flex-col gap-2">
          {posts
            .filter((p) => p.isReported)
            .map((p) => (
              <li
                key={p.id}
                className="bg-white p-3 rounded-lg shadow flex justify-between items-center"
              >
                <span>
                  {p.user}: {p.content}
                </span>
                <Link
                  href={`/admin/posts/${p.id}`}
                  className="px-3 py-1 rounded-lg bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage)]/80"
                >
                  Voir
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
