// src/pages/BlogPost.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogById } from '../services/api';
import CommentForm from '../components/CommentForm';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await fetchBlogById(id);
        setBlog(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>No blog found</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.post_text}</p>
      <CommentForm blogId={id} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment._id}>
            <h3>{comment.user.user_name}</h3>
            <p>{comment.comment_text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPost;
