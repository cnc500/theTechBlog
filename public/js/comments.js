const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const postId = document.querySelector('postId').value;
    const comment = document.querySelector('#commentInput').value;
  
    if (body) {
      await fetch('/controllers/homeRoutes', {
        method: 'POST',
        body: JSON.stringify({
          post_id: postId,
          comment: comment
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#newComment')
    .addEventListener('submit', commentFormHandler);
