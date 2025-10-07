// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- COMPONENT LOADER ---
    const loadComponent = (selector, url, callback) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(selector).innerHTML = data;
                if (callback) callback(); // Run the callback function after loading
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    // Load components and then run data-fetching logic
    loadComponent('#header-placeholder', 'components/header.html', initializeMobileMenu);
    loadComponent('#hero-placeholder', 'components/hero.html', fetchHeroData); // Fetch hero data after loading
    loadComponent('#footer-placeholder', 'components/footer.html');


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

    // --- DATA FETCHER FOR HERO SECTION ---
    const fetchHeroData = () => {
        const heroSection = document.querySelector('.hero-bg');
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');

        if (heroSection && heroTitle && heroSubtitle) {
            db.collection('siteContent').doc('homepage').get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    heroTitle.textContent = data.heroTitle;
                    heroSubtitle.textContent = data.heroSubtitle;
                    // We use a CSS variable to set the background image dynamically
                    document.documentElement.style.setProperty('--hero-bg-url', `url(${data.heroImageUrl})`);
                } else {
                    console.log("No hero content found in Firestore!");
                }
            }).catch((error) => {
                console.error("Error getting hero document:", error);
            });
        }
    };


    // --- DATA FETCHER FOR DESTINATIONS ---
    const destinationsContainer = document.getElementById('destinations-grid');
    if (destinationsContainer) {
        destinationsContainer.innerHTML = '<p class="text-center col-span-full">Loading destinations...</p>';
        db.collection('destinations').limit(3).get().then((querySnapshot) => {
            let html = '';
            if (querySnapshot.empty) {
                html = '<p class="text-center col-span-full">No destinations found. Please add some in the admin panel.</p>';
            } else {
                querySnapshot.forEach((doc) => {
                    const destination = doc.data();
                    html += `
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                            <img src="${destination.imageUrl}" alt="${destination.name}" class="w-full h-56 object-cover">
                            <div class="p-6">
                                <h3 class="text-2xl font-bold mb-2">${destination.name}, ${destination.country}</h3>
                                <p class="text-gray-600">${destination.description}</p>
                            </div>
                        </div>
                    `;
                });
            }
            destinationsContainer.innerHTML = html;
        }).catch((error) => {
            console.error("Error getting destination documents: ", error);
            destinationsContainer.innerHTML = '<p class="text-center col-span-full text-red-500">Could not load destinations.</p>';
        });
    }
});

