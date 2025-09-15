"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type User = { id: number; name: string; isBlocked: boolean };
type Post = { id: number; createdAt: Date };

export default function AdminStatsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsByDay, setPostsByDay] = useState<
    { day: string; posts: number }[]
  >([]);
  const [blockedUsersData, setBlockedUsersData] = useState([
    { name: "Actifs", value: 0 },
    { name: "Bloqués", value: 0 },
  ]);

  useEffect(() => {
    // Exemple statique - à remplacer par API
    const usersData: User[] = [
      { id: 1, name: "Alice", isBlocked: false },
      { id: 2, name: "Bob", isBlocked: true },
      { id: 3, name: "Charlie", isBlocked: false },
    ];
    setUsers(usersData);

    const postsData: Post[] = [
      { id: 1, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) }, // hier
      { id: 2, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
      { id: 3, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
      { id: 4, createdAt: new Date() },
    ];
    setPosts(postsData);
  }, []);

  useEffect(() => {
    // Calcul posts par jour pour la semaine
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const today = new Date();
    const postsCount: { day: string; posts: number }[] = days.map(
      (day, idx) => {
        const target = new Date();
        target.setDate(today.getDate() - (6 - idx));
        const count = posts.filter(
          (p) =>
            p.createdAt.getFullYear() === target.getFullYear() &&
            p.createdAt.getMonth() === target.getMonth() &&
            p.createdAt.getDate() === target.getDate()
        ).length;
        return { day, posts: count };
      }
    );
    setPostsByDay(postsCount);

    // Bloqués / actifs
    const blocked = users.filter((u) => u.isBlocked).length;
    const active = users.length - blocked;
    setBlockedUsersData([
      { name: "Actifs", value: active },
      { name: "Bloqués", value: blocked },
    ]);
  }, [posts, users]);

  const COLORS = ["#9BBF9B", "#C88E5B"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-4">Statistiques Admin</h1>

      {/* Nombre total d'utilisateurs */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Utilisateurs</h2>
          <p className="text-lg">{users.length} inscrits</p>
        </div>
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={blockedUsersData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {blockedUsersData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Posts par semaine */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Posts publiés cette semaine
        </h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={postsByDay}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#9BBF9B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="font-semibold">Utilisateurs bloqués</h3>
          <p className="text-lg text-red-600">{blockedUsersData[1].value}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="font-semibold">Posts totaux</h3>
          <p className="text-lg">{posts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="font-semibold">Utilisateurs actifs</h3>
          <p className="text-lg text-green-600">{blockedUsersData[0].value}</p>
        </div>
      </div>
    </div>
  );
}
