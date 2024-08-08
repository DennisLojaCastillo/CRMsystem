document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/auth/status', { credentials: 'include' })
    .then(response => response.json())
    .then(data => {
      const loginItem = document.getElementById('login-item');
      const registerItem = document.getElementById('register-item');
      const logoutLink = document.getElementById('logout-link');
      const customersItem = document.getElementById('customers-item');
      const meetingsItem = document.getElementById('meetings-item');

      if (data.loggedIn) {
        loginItem.style.display = 'none';
        registerItem.style.display = 'none';
        logoutLink.style.display = 'block';
        customersItem.style.display = 'block';
        meetingsItem.style.display = 'block';
      } else {
        loginItem.style.display = 'block';
        registerItem.style.display = 'block';
        logoutLink.style.display = 'none';
        customersItem.style.display = 'none';
        meetingsItem.style.display = 'none';
      }
    });

  document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      window.location.href = '/pages/login.html';
    });
  });
});
