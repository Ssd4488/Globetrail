document.addEventListener('DOMContentLoaded', () => {

    // --- COMPONENT LOADER ---
    const loadComponent = (selector, url, callback) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(selector).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    // --- MOBILE MENU INITIALIZER ---
    const initializeMobileMenu = () => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    };

    // Load common components
    loadComponent('#header-placeholder', 'components/header.html', initializeMobileMenu);
    loadComponent('#footer-placeholder', 'components/footer.html');


    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission

            const name = contactForm.name.value;
            const email = contactForm.email.value;
            const subject = contactForm.subject.value;
            const message = contactForm.message.value;

            // Show a "sending" message
            formMessage.textContent = 'Sending...';
            formMessage.className = 'text-center mt-4 text-blue-600';

            // Save the message to a new 'messages' collection in Firestore
            db.collection('messages').add({
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add a server timestamp
            })
            .then(() => {
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.className = 'text-center mt-4 text-green-600';
                contactForm.reset(); // Clear the form
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
                formMessage.className = 'text-center mt-4 text-red-600';
            });
        });
    }
});
