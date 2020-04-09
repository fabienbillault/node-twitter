window.addEventListener('DOMContentLoaded', function () {
  bindTweet();
});

function bindTweet() {
  const tweetContainer = document.querySelector('#tweet-list-container');
  const elements = document.querySelectorAll('.btn-danger');

  elements.forEach((el) => {
    el.addEventListener('click', function (e) {
      const tweetId = e.target.getAttribute('data-id');
      axios
        .delete(`/tweets/${tweetId}`)
        .then((res) => {
          tweetContainer.innerHTML = res.data;
          bindTweet();
        })
        .catch((e) => {
          console.error(e);
        });
    });
  });
}
