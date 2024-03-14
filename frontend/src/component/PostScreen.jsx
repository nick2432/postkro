import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function PostScreen() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8100/api/posts?page=${posts}&size=10`);
        if (response.data.success) {
          setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
          setPage(page + 1);
        } else {
          console.error("Failed to fetch posts:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        loadPosts();
      }
    }, { threshold: 0.5 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [page, loading]);

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      <div className="w-full bg-gray-300 rounded-lg shadow-lg py-8" style={{ maxWidth: "800px" }}>
        {posts.map(post => (
          <div key={post._id} className="bg-gray-200 p-6 mx-auto rounded-lg shadow-md mb-4">
            <p className="text-gray-800 text-lg font-semibold text-center">{post.title}</p>
            <p className="text-gray-600 text-lg text-center">{post.content}</p>
            <p className="text-gray-700 text-lg font-semibold text-center">{post.name}</p>
          </div>
        ))}
        <div ref={loader} className="flex justify-center items-center w-full py-4">
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
