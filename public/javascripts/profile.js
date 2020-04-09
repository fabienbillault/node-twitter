window.addEventListener('DOMContentLoaded', () => {
  const imageProfile = document.getElementById('image-profile');
  const formAvatar = document.getElementById('form-avatar');
  const inputAvatar = document.getElementById('input-avatar');

  imageProfile.addEventListener('click', (e) => {
    inputAvatar.click();
  });

  inputAvatar.addEventListener('change', () => {
    formAvatar.submit();
  });
});
