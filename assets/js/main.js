// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Functionality ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Function to set the theme and update icons
    const setTheme = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            if (lightIcon && darkIcon) {
                lightIcon.classList.remove('hidden'); // Show sun icon in dark mode
                darkIcon.classList.add('hidden');
            }
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            if (lightIcon && darkIcon) {
                darkIcon.classList.remove('hidden'); // Show moon icon in light mode
                lightIcon.classList.add('hidden');
            }
        }
    };

    // Set the initial state of the toggle button when the page loads
    if (themeToggleButton) {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        setTheme(isCurrentlyDark);

        // Add click listener to the button
        themeToggleButton.addEventListener('click', () => {
            // Toggle theme on click
            setTheme(!document.documentElement.classList.contains('dark'));
        });
    }


    // --- Mobile Menu Toggle (for index.html) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        // Toggle menu visibility
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link inside it is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Header Scroll Effect (for index.html) ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg', 'shadow-black/5', 'dark:shadow-black/20');
            } else {
                header.classList.remove('shadow-lg', 'shadow-black/5', 'dark:shadow-black/20');
            }
        });
    }
    
    // --- Component Loader (for index.html) ---
    const loadComponent = (componentUrl, placeholderId) => {
        fetch(componentUrl)
            .then(response => response.ok ? response.text() : Promise.reject(`Error loading ${componentUrl}`))
            .then(html => {
                const placeholder = document.getElementById(placeholderId);
                if(placeholder) placeholder.innerHTML = html;
            })
            .catch(error => {
                console.error(error);
                const placeholder = document.getElementById(placeholderId);
                if(placeholder) placeholder.innerHTML = `<p class="text-center text-red-500 py-20">Error: Could not load section.</p>`;
            });
    };

    // Check if we are on the homepage before loading components
    if (document.getElementById('storyweaver-placeholder') && document.getElementById('loomed-placeholder')) {
        loadComponent('storyweaver/storyweaver.html', 'storyweaver-placeholder');
        loadComponent('loom-ed/loom-ed.html', 'loomed-placeholder');
    }
});
