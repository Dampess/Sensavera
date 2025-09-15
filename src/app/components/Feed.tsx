"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ThumbsUp,
  Star,
  Heart,
  MoreHorizontal,
  MessageCircle,
  Reply,
} from "lucide-react";

type ReplyType = {
  id: number;
  user: { name: string; avatar: string };
  content: string;
  createdAt: Date;
};

type Comment = {
  id: number;
  user: { name: string; avatar: string };
  content: string;
  createdAt: Date;
  replies: ReplyType[]; // 👈 nouveau
};

type Post = {
  id: number;
  user: { name: string; avatar: string };
  type: "text" | "image" | "video";
  content: string;
  reactions: { super: number; bravo: number; love: number };
  createdAt: Date;
  comments: Comment[];
};

const currentUser = { name: "Moi", avatar: "https://i.pravatar.cc/40?img=5" };

const initialPosts: Post[] = [
  {
    id: 1,
    user: { name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
    type: "text",
    content: "Aujourd'hui, j'ai pris 10 minutes pour méditer 🌿",
    reactions: { super: 2, bravo: 1, love: 0 },
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
    comments: [],
  },
];

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const [newReplies, setNewReplies] = useState<Record<number, string>>({}); // clé = id du commentaire

  const handlePublish = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: posts.length + 1,
      user: currentUser,
      type: "text",
      content: newPost,
      reactions: { super: 0, bravo: 0, love: 0 },
      createdAt: new Date(),
      comments: [],
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

  const handleAddComment = (postId: number) => {
    if (!newComments[postId]?.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      user: currentUser,
      content: newComments[postId],
      createdAt: new Date(),
      replies: [],
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );

    setNewComments((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleAddReply = (postId: number, commentId: number) => {
    if (!newReplies[commentId]?.trim()) return;

    const newReply: ReplyType = {
      id: Date.now(),
      user: currentUser,
      content: newReplies[commentId],
      createdAt: new Date(),
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId
                  ? { ...c, replies: [...c.replies, newReply] }
                  : c
              ),
            }
          : p
      )
    );

    setNewReplies((prev) => ({ ...prev, [commentId]: "" }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Composer un post */}
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Exprime-toi 🌿..."
          className="w-full p-3 rounded-lg border border-[var(--color-sage)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]"
        />
        <button
          onClick={handlePublish}
          className="self-end px-4 py-2 bg-[var(--color-sage)] text-white rounded-lg font-semibold hover:bg-[var(--color-sage)]/80 transition"
        >
          Publier
        </button>
      </div>

      {/* Liste des posts */}
      {posts.map((post) => {
        const isOwner = post.user.name === currentUser.name;

        return (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{post.user.name}</span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(post.createdAt, {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Contenu */}
            {post.type === "text" && <p>{post.content}</p>}

            {/* Réactions */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleReaction(post.id, "super")}
                className="flex items-center gap-1 px-3 py-1 border rounded-lg"
              >
                <ThumbsUp className="w-4 h-4" /> {post.reactions.super}
              </button>
              <button
                onClick={() => handleReaction(post.id, "bravo")}
                className="flex items-center gap-1 px-3 py-1 border rounded-lg"
              >
                <Star className="w-4 h-4" /> {post.reactions.bravo}
              </button>
              <button
                onClick={() => handleReaction(post.id, "love")}
                className="flex items-center gap-1 px-3 py-1 border rounded-lg"
              >
                <Heart className="w-4 h-4 text-red-500" /> {post.reactions.love}
              </button>
            </div>

            {/* Section commentaires privés */}
            <div className="mt-4 border-t pt-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Commentaires privés
              </h4>

              {/* Liste des commentaires */}
              <div className="flex flex-col gap-3 mt-2">
                {post.comments.map((c) => {
                  const canSee = isOwner || c.user.name === currentUser.name;
                  if (!canSee) return null;

                  return (
                    <div key={c.id} className="bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-start gap-2">
                        <img
                          src={c.user.avatar}
                          alt={c.user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <span className="font-medium text-sm">
                            {c.user.name}
                          </span>
                          <p className="text-sm">{c.content}</p>
                        </div>
                      </div>

                      {/* Réponses */}
                      <div className="ml-10 mt-2 flex flex-col gap-2">
                        {c.replies.map((r) => (
                          <div key={r.id} className="flex items-start gap-2">
                            <img
                              src={r.user.avatar}
                              alt={r.user.name}
                              className="w-7 h-7 rounded-full"
                            />
                            <div className="bg-white border rounded-lg p-2">
                              <span className="font-medium text-xs">
                                {r.user.name}
                              </span>
                              <p className="text-sm">{r.content}</p>
                            </div>
                          </div>
                        ))}

                        {/* Champ pour répondre */}
                        {(isOwner || c.user.name === currentUser.name) && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newReplies[c.id] || ""}
                              onChange={(e) =>
                                setNewReplies((prev) => ({
                                  ...prev,
                                  [c.id]: e.target.value,
                                }))
                              }
                              placeholder="Répondre..."
                              className="flex-1 p-1 text-sm border rounded-lg"
                            />
                            <button
                              onClick={() => handleAddReply(post.id, c.id)}
                              className="px-2 bg-[var(--color-sage)] text-white rounded-lg text-sm flex items-center gap-1"
                            >
                              <Reply className="w-3 h-3" /> Envoyer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ajouter un commentaire */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newComments[post.id] || ""}
                  onChange={(e) =>
                    setNewComments((prev) => ({
                      ...prev,
                      [post.id]: e.target.value,
                    }))
                  }
                  placeholder="Écrire un commentaire privé..."
                  className="flex-1 p-2 rounded-lg border"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="px-3 py-1 bg-[var(--color-sage)] text-white rounded-lg text-sm"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
