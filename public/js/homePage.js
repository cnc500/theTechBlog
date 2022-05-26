var blogPosts = document.querySelectorAll(".card");

// Listen for any clicks for blog posts
blogPosts.forEach(item => item.addEventListener("click", function (event) {
    // Check if the clicked element was a card
    if (event.currentTarget.classList.contains("card")) {
        // Get the ID of the clicked blog
        var clickedId = event.currentTarget.dataset.id;
        // Go to the comments for the blog
        document.location.replace('/blog-comments/' + clickedId);
    }
}));
