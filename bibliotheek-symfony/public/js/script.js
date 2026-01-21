// Modal functionality
function toggleAuthForm() {
    const loginForm = document.getElementById('login-form-container');
    const registerForm = document.getElementById('register-form-container');
    
    // Clear any previous error messages
    clearErrorMessages();
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function showErrorMessage(elementId, message) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    // Remove existing error if any
    const existingError = container.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #fee;
        color: #c33;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid #fcc;
        font-size: 0.95rem;
    `;
    errorDiv.textContent = message;
    
    const form = container.querySelector('form');
    form.parentNode.insertBefore(errorDiv, form);
}

function showSuccessMessage(elementId, message) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    // Remove existing message if any
    const existingMsg = container.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #efe;
        color: #3c3;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid #cfc;
        font-size: 0.95rem;
    `;
    successDiv.textContent = message;
    
    const form = container.querySelector('form');
    form.parentNode.insertBefore(successDiv, form);
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());
}

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-btn');
    const modal = document.getElementById('auth-modal');
    const modalClose = document.querySelector('.modal-close');

    // Open modal - only if not logged in
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Check if user is logged in
            const storedUser = localStorage.getItem('currentUser');
            if (!storedUser) {
                // Only open modal if not logged in
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        clearErrorMessages();
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Login form submission
    const loginForm = document.querySelector('#login-form-container form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Validation
            if (!email || !password) {
                showErrorMessage('login-form-container', 'Please fill in all fields');
                return;
            }

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Login successful
                    showSuccessMessage('login-form-container', 'Login successful! Welcome back, ' + data.user.fullName);
                    setTimeout(() => {
                        closeModal();
                        updateUIAfterLogin(data.user);
                        loginForm.reset();
                    }, 1500);
                } else {
                    // Login failed
                    showErrorMessage('login-form-container', data.error || 'Login failed');
                }
            } catch (error) {
                showErrorMessage('login-form-container', 'Network error: ' + error.message);
            }
        });
    }

    // Register form submission
    const registerForm = document.querySelector('#register-form-container form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;

            // Validation
            if (!fullName || !email || !password) {
                showErrorMessage('register-form-container', 'Please fill in all fields');
                return;
            }

            if (password.length < 6) {
                showErrorMessage('register-form-container', 'Password must be at least 6 characters');
                return;
            }

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName: fullName,
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Registration successful
                    showSuccessMessage('register-form-container', 'Registration successful! Switching to login...');
                    setTimeout(() => {
                        registerForm.reset();
                        toggleAuthForm(); // Switch to login form
                    }, 1500);
                } else {
                    // Registration failed
                    showErrorMessage('register-form-container', data.error || 'Registration failed');
                }
            } catch (error) {
                showErrorMessage('register-form-container', 'Network error: ' + error.message);
            }
        });
    }
});

// Update UI after successful login
function updateUIAfterLogin(user) {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        const firstName = user.fullName.split(' ')[0];
        loginBtn.textContent = '👤 ' + firstName;
        loginBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        loginBtn.style.cursor = 'default';
        loginBtn.setAttribute('data-logged-in', 'true');
        
        // Add logout functionality on right-click or hold
        loginBtn.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            logout();
        });
        
        // Add tooltip for logout
        loginBtn.title = 'Right-click to logout';
        
        // Store user in localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.textContent = 'Log in';
        loginBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
        loginBtn.style.cursor = 'pointer';
        loginBtn.removeAttribute('data-logged-in');
        loginBtn.title = '';
        
        // Show logout success message
        alert('Logged out successfully!');
    }
}

// Check if user is already logged in on page load
window.addEventListener('load', function() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            updateUIAfterLogin(user);
        } catch (e) {
            console.log('Could not parse stored user data');
        }
    }
});

