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

});
