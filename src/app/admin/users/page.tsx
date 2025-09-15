"use client";

import { useState } from "react";

type User = { id: number; name: string; email: string; isBlocked: boolean };

const initialUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", isBlocked: false },
  { id: 2, name: "Bob", email: "bob@example.com", isBlocked: false },
  { id: 3, name: "Charlie", email: "charlie@example.com", isBlocked: true },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const toggleBlock = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isBlocked: !u.isBlocked } : u))
    );
  };

  const deleteUser = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-4">Gestion des utilisateurs</h1>

      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[var(--color-sage)]/20 text-left">
            <th className="p-3">Nom</th>
            <th className="p-3">Email</th>
            <th className="p-3">Statut</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b last:border-b-0">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                {user.isBlocked ? (
                  <span className="text-red-600 font-semibold">Bloqué</span>
                ) : (
                  <span className="text-green-600 font-semibold">Actif</span>
                )}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => toggleBlock(user.id)}
                  className={`px-3 py-1 rounded-lg font-medium text-white transition ${
                    user.isBlocked
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {user.isBlocked ? "Débloquer" : "Bloquer"}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
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
