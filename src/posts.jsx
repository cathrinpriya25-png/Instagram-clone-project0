import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [likedPosts, setLikedPosts] = useState({}); 

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  const toggleComments = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const toggleLike = (postId) => {
    setLikedPosts((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div className="d-flex justify-content-center">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className="my-4" key={post.id}>
              {/* User Info */}
              <div className="d-flex align-items-center mb-2">
                <img
                  className="dp rounded-circle me-2"
                  src={post.user.profile_pic}
                  alt="Profile Pic"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <h5 className="mb-0">{post.user.username}</h5>
              </div>

              {/* Post Image */}
              <img
                className="image mb-2"
                src={post.image}
                alt="post"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                }}
              />

              {/* Action Icons */}
              <div className="mb-2">
                <i
                  className={`bi bi-heart${likedPosts[post.id] ? '-fill text-danger' : ''} me-3`}
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  onClick={() => toggleLike(post.id)}
                ></i>

                <i
                  className="bi bi-chat me-3"
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  onClick={() => toggleComments(post.id)}
                ></i>

                <i
                  className="bi bi-send"
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                ></i>
              </div>

              {/* Likes and Caption */}
              <div>
                <b>{post.likes + (likedPosts[post.id] ? 1 : 0)} Likes</b>
              </div>
              <p>{post.caption}</p>

              {/* Comments Section */}
              {visibleComments[post.id] && (
                <div className="mt-2 ps-2 border-start border-2">
                  {post.comments.map((comment, index) => (
                    <p key={index} style={{ marginBottom: '4px' }}>
                      <b>{comment.user}</b>: {comment.comment}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Posts...</div>
      )}
    </div>
  );
}

export default Posts;
