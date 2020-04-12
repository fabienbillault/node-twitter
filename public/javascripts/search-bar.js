let menuContainer;

window.addEventListener('click', () => {
  menuContainer.innerHTML = '';
});

window.addEventListener('DOMContentLoaded', () => {
  menuContainer = document.getElementById('search-menu-container');
  menuContainer.addEventListener('click', e => {
    e.stopPropagation();
  });

  const searchInput = document.getElementById('search-input');
  let ref;
  searchInput.addEventListener('input', e => {
    const value = e.target.value;
    if (ref) {
      clearTimeout(ref);
    }
    ref = setTimeout(() => {
      axios
        .get(`/users?search=${value}`)
        .then(res => {
          console.log(res);

          menuContainer.innerHTML = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);
  });
});
