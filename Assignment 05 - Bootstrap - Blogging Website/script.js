window.onload = function() {
    const posts = document.querySelectorAll('.blog-card');
    posts.forEach(post => {
        const postId = post.dataset.id;
        const likeCount = localStorage.getItem(`like-count-${postId}`) || 0;
        document.getElementById(`like-count-${postId}`).innerText = likeCount;
    });
}

function addLike(postId) {
    const likeCountElement = document.getElementById(`like-count-${postId}`);
    let likeCount = parseInt(likeCountElement.innerText, 10);
    likeCount += 1;
    likeCountElement.innerText = likeCount;
    localStorage.setItem(`like-count-${postId}`, likeCount);
}

function filterPosts(category) {
    const posts = document.querySelectorAll('.blog-card');
    posts.forEach(post => {
        if (category === 'all' || post.dataset.category === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}
