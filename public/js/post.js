const postFormHandler = async (event) => {
    event.preventDefault();
  
    const post = document.querySelector('.form-control').value.trim();
    const post_id = localStorage.getItem('postId') || null;
  
    if (post) {
      const response = await fetch('../controllers/homeRoutes', {
        method: 'POST',
        body: JSON.stringify({ post, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.form-control')
    .addEventListener('submit', postFormHandler);