"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { ThumbsUp, Star, Heart, MoreHorizontal } from "lucide-react";

type Post = {
  id: number;
  user: { name: string; avatar: string };
  type: "text" | "image" | "video";
  content: string;
  reactions: { super: number; bravo: number; love: number };
  createdAt: Date;
};

const initialPosts: Post[] = [
  {
    id: 1,
    user: { name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
    type: "text",
    content: "Aujourd'hui, j'ai pris 10 minutes pour méditer 🌿",
    reactions: { super: 2, bravo: 1, love: 0 },
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 2,
    user: { name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
    type: "image",
    content: "https://picsum.photos/400/250",
    reactions: { super: 0, bravo: 0, love: 3 },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");

  const handlePublish = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: posts.length + 1,
      user: { name: "Moi", avatar: "https://i.pravatar.cc/40?img=5" },
      type: "text",
      content: newPost,
      reactions: { super: 0, bravo: 0, love: 0 },
      createdAt: new Date(),
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleReaction = (postId: number, type: "super" | "bravo" | "love") => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [type]: post.reactions[type] + 1,
              },
            }
          : post
      )
    );
  };

  const handleDelete = (postId: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  const handleEdit = (postId: number) => {
    const newContent = prompt("Modifier le contenu du post :");
    if (newContent !== null) {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, content: newContent } : p))
      );
    }
  };

  const handleReport = (postId: number) => {
    alert("Post signalé 🚨");
    // TODO: envoyer info au backend
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Composer un post */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Exprime-toi 🌿..."
          className="w-full p-3 rounded-lg border border-[var(--color-sage)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]"
        />
        <button
          onClick={handlePublish}
          className="mt-3 px-4 py-2 bg-[var(--color-sage)] text-white rounded-lg font-semibold"
        >
          Publier
        </button>
      </div>

      {/* Liste des posts */}
      {posts.map((post) => {
        const isOwner = post.user.name === "Moi";

        return (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 relative animate-fadeIn"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-[var(--color-night)]">
                    {post.user.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(post.createdAt, {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </div>
              </div>

              {/* Menu trois points */}
              <div className="relative">
                <button
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                  title="Options"
                >
                  <MoreHorizontal className="w-5 h-5 text-[var(--color-night)]" />
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-10 hidden group-hover:block">
                  {isOwner ? (
                    <>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleEdit(post.id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                        onClick={() => handleDelete(post.id)}
                      >
                        Supprimer
                      </button>
                    </>
                  ) : (
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                      onClick={() => handleReport(post.id)}
                    >
                      Signaler
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Contenu */}
            {post.type === "text" && (
              <p className="text-[var(--color-night)]">{post.content}</p>
            )}
            {post.type === "image" && (
              <img
                src={post.content}
                alt="Post image"
                className="w-full max-h-[300px] object-cover rounded-xl"
              />
            )}
            {post.type === "video" && (
              <video
                src={post.content}
                controls
                className="w-full max-h-[300px] rounded-xl"
              />
            )}

            {/* Réactions */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleReaction(post.id, "super")}
                className="flex items-center gap-1 px-3 py-1 rounded-lg border border-[var(--color-night)] hover:bg-[var(--color-night)]/10 transition active:scale-110"
              >
                <ThumbsUp className="w-4 h-4" /> {post.reactions.super}
              </button>
              <button
                onClick={() => handleReaction(post.id, "bravo")}
                className="flex items-center gap-1 px-3 py-1 rounded-lg border border-[var(--color-night)] hover:bg-[var(--color-night)]/10 transition active:scale-110"
              >
                <Star className="w-4 h-4" /> {post.reactions.bravo}
              </button>
              <button
                onClick={() => handleReaction(post.id, "love")}
                className="flex items-center gap-1 px-3 py-1 rounded-lg border border-[var(--color-night)] hover:bg-[var(--color-night)]/10 transition active:scale-110"
              >
                <Heart className="w-4 h-4 text-red-500" /> {post.reactions.love}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
