import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Snapshot } from "recoil";
import { db } from "../firebase";
import Post from "./Post";

// const posts = [
//   {
//     id: "123",
//     username: "Lewis",
//     userImg: "https://i.pravatar.cc/150?img=a",
//     img: "https://i.pravatar.cc/150?img=a",
//     caption: "Hi, Im Lewis",
//   },
// ];

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    [db]
  );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
