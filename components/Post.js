import {
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../firebase";

import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
export default ({ id, username, userImg, img, caption }) => {
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLike, setHasLike] = useState(false);
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  const likePost = async () => {
    if (hasLike)
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    else
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
  };

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      setHasLike(likes.findIndex(({ id }) => id === session?.user?.uid) !== -1),
    [likes]
  );
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon onClick={() => setOpen(true)} className="h-5" />
      </div>
      {/* Img */}
      <img src={img} alt="" className="object-cover w-full" />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLike ? (
              <HeartSolidIcon onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45 -mt-[2px]" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* Captions */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>
      {/* Comments */}
      {Boolean(comments.length) && (
        <div className="ml-5 max-h-20 mb-5 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-2 items-center mb-3">
              <img
                src={comment.data().userImage}
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* Input Box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="btn" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="font-semibold text-blue-400"
            disabled={!comment.trim()}
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};
