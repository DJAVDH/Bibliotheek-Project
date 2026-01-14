document.addEventListener('DOMContentLoaded', function() {
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const modal = document.getElementById('auth-modal');
    const modalFormContent = document.getElementById('modal-form-content');
    const modalClose = document.querySelector('.modal-close');

    const loginFormHTML = `
        <h2>Inloggen</h2>
        <form class="login-form">
            <input type="email" placeholder="E-mail" required />
            <input type="password" placeholder="Wachtwoord" required />
            <button type="submit">Inloggen</button>
        </form>
    `;

    const registerFormHTML = `
        <h2>Registreren</h2>
        <form class="register-form">
            <input type="text" placeholder="Naam" required />
            <input type="email" placeholder="E-mail" required />
            <input type="password" placeholder="Wachtwoord" required />
            <button type="submit">Registreren</button>
        </form>
    `;

    function showModal(formHTML) {
        modalFormContent.innerHTML = formHTML;
        modal.style.display = 'flex';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showModal(registerFormHTML);
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showModal(loginFormHTML);
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', hideModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });
});
