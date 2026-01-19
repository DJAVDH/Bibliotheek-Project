document.addEventListener('DOMContentLoaded', function() {
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const modal = document.getElementById('auth-modal');
    const modalFormContent = document.getElementById('modal-form-content');
    const modalInfoContent = document.getElementById('modal-info-content');
    const modalClose = document.querySelector('.modal-close');

    const loginFormHTML = `
        <h2>Inloggen</h2>
        <form class="login-form">
            <input type="email" placeholder="E-mail" required />
            <input type="password" placeholder="Wachtwoord" required />
            <button type="submit">Inloggen</button>
        </form>
        <p class="form-footer">Nog geen account? <a href="#register" class="switch-to-register">Registreer nu</a></p>
    `;

    const loginInfoHTML = `
        <h3>Welkom terug!</h3>
        <p>Log in om toegang te krijgen tot:</p>
        <ul>
            <li>Je persoonlijke boekenplank</li>
            <li>Aanbevelingen op basis van je voorkeuren</li>
            <li>Je leesgeschiedenis</li>
            <li>Conversaties met andere lezers</li>
        </ul>
    `;

    const registerFormHTML = `
        <h2>Registreren</h2>
        <form class="register-form">
            <input type="text" placeholder="Volledige naam" required />
            <input type="email" placeholder="E-mail" required />
            <input type="password" placeholder="Wachtwoord" required />
            <input type="password" placeholder="Wachtwoord herhalen" required />
            <button type="submit">Account aanmaken</button>
        </form>
        <p class="form-footer">Heb je al een account? <a href="#login" class="switch-to-login">Log in</a></p>
    `;

    const registerInfoHTML = `
        <h3>Sluit je aan bij onze gemeenschap</h3>
        <p>Geniet van de voordelen van ons platform:</p>
        <ul>
            <li>Vind je volgende favoriete boek</li>
            <li>Deel je mening met andere lezers</li>
            <li>Beheer je uitleningen</li>
            <li>Maak een persoonlijke verzameling</li>
        </ul>
    `;

    function showModal(formHTML, infoHTML) {
        modalFormContent.innerHTML = formHTML;
        modalInfoContent.innerHTML = infoHTML;
        modal.style.display = 'flex';
        
        // Add event listeners to the switching links
        const switchToRegister = document.querySelector('.switch-to-register');
        const switchToLogin = document.querySelector('.switch-to-login');
        
        if (switchToRegister) {
            switchToRegister.addEventListener('click', function(e) {
                e.preventDefault();
                showModal(registerFormHTML, registerInfoHTML);
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener('click', function(e) {
                e.preventDefault();
                showModal(loginFormHTML, loginInfoHTML);
            });
        }
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showModal(registerFormHTML, registerInfoHTML);
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showModal(loginFormHTML, loginInfoHTML);
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

