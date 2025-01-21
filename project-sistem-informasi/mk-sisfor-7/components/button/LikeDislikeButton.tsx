import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/features/login/useAuth"; // Untuk mendapatkan userId

const LikeDislikeButton: React.FC<{
  reviewId: string;
  initialLikes: number;
  initialDislikes: number;
}> = ({ reviewId, initialLikes, initialDislikes }) => {
  const { user } = useAuth(); // Ambil user yang sedang login
  const userId = user?.uid; // Asumsikan 'uid' adalah id user

  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  // Ambil status user dari Firestore
  useEffect(() => {
    const fetchStatus = async () => {
      if (!userId) return;
      const reviewRef = doc(db, "feedback_mahasiswa", reviewId);
      const docSnap = await getDoc(reviewRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHasLiked(data.likes?.[userId] || false);
        setHasDisliked(data.dislikes?.[userId] || false);
      }
    };
    fetchStatus();
  }, [userId, reviewId]);

  // Update status like/dislike di Firestore
  const updateStatus = async (action: "like" | "dislike") => {
    if (!userId) return;
    const reviewRef = doc(db, "feedback_mahasiswa", reviewId);
    const docSnap = await getDoc(reviewRef);
    if (!docSnap.exists()) return;

    const data = docSnap.data();
    const likes = data.likes || {};
    const dislikes = data.dislikes || {};

    let newLikeCount = likeCount;
    let newDislikeCount = dislikeCount;

    if (action === "like") {
      if (hasLiked) {
        delete likes[userId];
        newLikeCount -= 1;
      } else {
        likes[userId] = true;
        newLikeCount += 1;
        if (hasDisliked) {
          delete dislikes[userId];
          newDislikeCount -= 1;
        }
      }
    } else if (action === "dislike") {
      if (hasDisliked) {
        delete dislikes[userId];
        newDislikeCount -= 1;
      } else {
        dislikes[userId] = true;
        newDislikeCount += 1;
        if (hasLiked) {
          delete likes[userId];
          newLikeCount -= 1;
        }
      }
    }

    await updateDoc(reviewRef, {
      likes,
      dislikes,
      initialLikes: newLikeCount,
      initialDislikes: newDislikeCount,
    });

    setHasLiked(action === "like" ? !hasLiked : false);
    setHasDisliked(action === "dislike" ? !hasDisliked : false);
    setLikeCount(newLikeCount);
    setDislikeCount(newDislikeCount);
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <button
        className={`flex items-center gap-1 transition-transform duration-200 ${
          hasLiked ? "text-sky-200" : "text-white-600"
        } hover:scale-110`}
        onClick={() => updateStatus("like")}
      >
        <FaThumbsUp /> <span>{likeCount}</span>
      </button>
      <button
        className={`flex items-center gap-1 transition-transform duration-200 ${
          hasDisliked ? "text-sky-200" : "text-white-600"
        } hover:scale-110`}
        onClick={() => updateStatus("dislike")}
      >
        <FaThumbsDown /> <span>{dislikeCount}</span>
      </button>
    </div>
  );
};

export default LikeDislikeButton;
