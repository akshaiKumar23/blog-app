/* eslint-disable react/prop-types */
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);

    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6">
      <div className="container mx-auto">
        {postList.length === 0 ? (
          <p className="text-center text-gray-400">No posts available</p>
        ) : (
          postList.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-white">{post.title}</h1>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className=" text-white font-semibold py-1 px-2"
                    aria-label="Delete post"
                  >
                    🗑️
                  </button>
                )}
              </div>
              <p className="text-gray-300 mb-4">{post.postText}</p>
              <h3 className="text-gray-400 text-sm">@{post.author.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
