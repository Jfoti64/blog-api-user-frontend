// src/components/CommentForm.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { addComment } from '../services/api';

const CommentForm = ({ blogId }) => {
  const { auth } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      setError('You must be logged in to comment');
      return;
    }

    const newComment = { comment_text: comment };
    console.log('Submitting comment:', newComment);

    try {
      await addComment(blogId, newComment);
      setComment('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          id="comment"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default CommentForm;
