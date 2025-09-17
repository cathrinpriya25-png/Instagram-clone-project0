import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ViewStory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/story/${id}`)
      .then(res => res.json())
      .then(data => setStory(data))
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    if (id > tot || id <= 0) {
      navigate('/');
    }
  }, [id, tot, navigate]);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundColor: '#fff', // ✅ white background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Left Arrow - Vertically Centered */}
      {Number(id) > 1 && (
        <Link
          to={`/story/${Number(id) - 1}/${tot}`}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#5bc0f8',
            borderRadius: '50%',
            padding: '10px',
            fontSize: '2rem',
            color: 'white',
            textDecoration: 'none',
            boxShadow: '0 0 8px rgba(91, 192, 248, 0.6)',
            zIndex: 10,
          }}
        >
          <i className="bi bi-arrow-left-circle-fill"></i>
        </Link>
      )}

      {/* Right Arrow - Vertically Centered */}
      {Number(id) < Number(tot) ? (
        <Link
          to={`/story/${Number(id) + 1}/${tot}`}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#5bc0f8',
            borderRadius: '50%',
            padding: '10px',
            fontSize: '2rem',
            color: 'white',
            textDecoration: 'none',
            boxShadow: '0 0 8px rgba(91, 192, 248, 0.6)',
            zIndex: 10,
          }}
        >
          <i className="bi bi-arrow-right-circle-fill"></i>
        </Link>
      ) : (
        <Link
          to="/"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#5bc0f8',
            borderRadius: '50%',
            padding: '10px',
            fontSize: '2rem',
            color: 'white',
            textDecoration: 'none',
            boxShadow: '0 0 8px rgba(91, 192, 248, 0.6)',
            zIndex: 10,
          }}
        >
          <i className="bi bi-arrow-right-circle-fill"></i>
        </Link>
      )}

      {/* Story Image Container */}
      <div
        style={{
          position: 'relative',
          width: '400px',
          height: '100vh',
          overflow: 'hidden',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          backgroundColor: '#fff', // ✅ white container too
        }}
      >
        {/* Username Overlay */}
        {story && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '6px 12px',
              borderRadius: '20px',
              color: 'white',
              fontWeight: 'bold',
              zIndex: 10,
              userSelect: 'none',
            }}
          >
            {story.user.username}
          </div>
        )}

        {/* Story Image */}
        {story && (
          <img
            src={story.image}
            alt="story"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ViewStory;
