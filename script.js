// script.js for Sonja Heinze's Landing Page

// Global variable to store the currently loaded translations
let currentTranslations = {};

/**
 * Fetches the translation file for the given language.
 * @param {string} lang - The language code (e.g., 'en', 'de').
 * @returns {Promise<object>} A promise that resolves with the translation object.
 */
async function fetchTranslations(lang) {
    try {
        // Construct the path to the JSON file. Assumes files are in the root directory.
        const response = await fetch(`./${lang}.json`); // e.g., ./en.json or ./de.json
        if (!response.ok) {
            // If the response is not OK (e.g., 404 Not Found), throw an error.
            throw new Error(`Failed to load translation file: ${lang}.json. Status: ${response.status} ${response.statusText}`);
        }
        // Parse the JSON response.
        return await response.json();
    } catch (error) {
        // Log the error to the console.
        console.error("Error fetching translations for language:", lang, error);
        // Fallback to English if the requested language file fails to load and it's not already English.
        if (lang !== 'en') {
            console.warn("Falling back to English translations.");
            return await fetchTranslations('en'); // Attempt to fetch English as a fallback.
        }
        // If English also fails (or if 'en' was the originally requested language that failed), return an empty object.
        return {};
    }
}

/**
 * Applies the loaded translations to the page elements.
 * @param {object} translations - The translation object for the current language.
 */
function applyTranslations(translations) {
    // Select all elements that have a 'data-lang-key' attribute.
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        // Special handling for the footer design placeholder which contains HTML.
        const translationKey = (key === 'footer_design') ? 'footer_design_placeholder' : key;

        // Check if the translations object and the specific key exist.
        if (translations && translations[translationKey]) {
            const translationValue = translations[translationKey];
            // If the key is the footer design or the translation value contains HTML tags, set innerHTML.
            if (translationKey === 'footer_design_placeholder' || (typeof translationValue === 'string' && translationValue.match(/<[^>]+>/))) {
                element.innerHTML = translationValue;
            } else {
                // Otherwise, set the textContent.
                element.textContent = translationValue;
            }
        } else {
            // Log a warning if a translation key is not found in the loaded JSON.
            console.warn(`Translation key "${translationKey}" not found for language "${document.documentElement.lang}".`);
            // Optionally, display the key itself or a placeholder if a translation is missing.
            // element.textContent = `[${key}]`; // Uncomment to show missing keys on the page.
        }
    });
}

/**
 * Sets the language of the page.
 * Fetches translations for the language and then applies them.
 * @param {string} lang - The language code ('en' or 'de').
 */
async function setLanguage(lang) {
    // Set the 'lang' attribute on the <html> element for accessibility and CSS.
    document.documentElement.lang = lang;
    // Store the user's preferred language in localStorage.
    localStorage.setItem('preferredLanguage', lang);

    // Fetch the translations for the selected language.
    currentTranslations = await fetchTranslations(lang);
    // Apply the fetched translations to the page.
    applyTranslations(currentTranslations);

    // Update the active state of the language switcher buttons.
    updateLangButtonActiveState(lang);
    // Update the alert message for the private project link to use the new language.
    updatePrivateProjectLinkAlert();
}

/**
 * Updates the visual state (active/inactive) of language switcher buttons.
 * @param {string} currentLang - The currently selected language code.
 */
function updateLangButtonActiveState(currentLang) {
    const langButtons = document.querySelectorAll('.lang-switcher button');
    langButtons.forEach(button => {
        // Add 'active' class if button's data-lang matches currentLang, remove otherwise.
        button.classList.toggle('active', button.getAttribute('data-lang') === currentLang);
    });
}

/**
 * Loads the preferred language from localStorage or defaults to English on initial page load.
 */
function loadInitialLanguage() {
    // Get preferred language from localStorage, or default to 'en'.
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(preferredLanguage);
}

/**
 * Attaches event listeners to language switcher buttons.
 */
document.querySelectorAll('.lang-switcher button').forEach(button => {
    button.addEventListener('click', (event) => {
        const lang = event.target.getAttribute('data-lang');
        if (lang) {
            setLanguage(lang); // Set language when a language button is clicked.
        }
    });
});

/**
 * Sets the current year in the footer.
 */
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

/**
 * Handles mobile menu toggle functionality.
 */
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', String(!isExpanded)); // Update ARIA attribute.
        mobileMenu.classList.toggle('hidden'); // Toggle visibility of the menu.

        // Toggle burger/close icon.
        const icon = menuButton.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', isExpanded); // Show bars if menu was open (now closing).
            icon.classList.toggle('fa-times', !isExpanded); // Show times if menu was closed (now opening).
        }
    });
}

/**
 * Handles active navigation link highlighting on scroll.
 */
const navElement = document.querySelector('nav');
if (navElement) {
    const navHeight = navElement.offsetHeight; // Get the height of the fixed navigation bar.

    function onScroll() {
        let currentSectionId = '';
        // Iterate over each section with an ID to find which one is currently in view.
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - (navHeight + 60); // Offset by nav height + a buffer.
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update active class on navigation links based on the current section.
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSectionId);
        });
    }
    // Add scroll event listener.
    window.addEventListener('scroll', onScroll);
    // Call onScroll on initial load to set the active link correctly.
    onScroll();
}

/**
 * Closes the mobile menu when a navigation link inside it is clicked.
 */
if (mobileMenu) {
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden'); // Hide the menu.
            if (menuButton) {
                menuButton.setAttribute('aria-expanded', 'false'); // Update ARIA attribute.
                const icon = menuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times'); // Change icon back to burger.
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

/**
 * Provides a fallback for placeholder images if they fail to load.
 */
document.querySelectorAll('img[src^="https://placehold.co"]').forEach(img => {
    img.onerror = function() {
        this.onerror = null; // Prevent infinite loop if fallback also fails.
        // Construct a generic placeholder URL.
        const width = this.width || this.getAttribute('width') || 600;
        const height = this.height || this.getAttribute('height') || 400;
        this.src = `https://placehold.co/${width}x${height}/CCCCCC/FFFFFF?text=Image+Not+Found`;
    };
});

/**
 * Sets up a custom message for the "Details (Private)" project link.
 * This function re-attaches the event listener if the language changes,
 * ensuring the message is in the correct language using loaded translations.
 */
function updatePrivateProjectLinkAlert() {
    const privateProjectLink = document.querySelector('a[href="#"][aria-disabled="true"]');
    if (privateProjectLink) {
        // Clone and replace the node to remove old event listeners before adding a new one.
        const newLink = privateProjectLink.cloneNode(true);
        privateProjectLink.parentNode.replaceChild(newLink, privateProjectLink);

        newLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior.
            const currentLang = document.documentElement.lang || 'en';

            // Attempt to get the alert message from the loaded translations.
            // Ensure you add "project_details_private_alert" to your en.json and de.json files.
            const alertMessage = (currentTranslations && currentTranslations.project_details_private_alert) ?
                currentTranslations.project_details_private_alert :
                (currentLang === 'de' ?
                    "Details für dieses Projekt sind privat und können nicht öffentlich gezeigt werden." : // Fallback German
                    "Details for this project are private and cannot be shown publicly."); // Fallback English

            // Create and display a custom message box instead of alert().
            const messageBox = document.createElement('div');
            messageBox.style.cssText = `
                position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                background-color: #ef4444; /* Tailwind red-500 */ color: white;
                padding: 15px 25px; border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 10000; /* Ensure it's on top */
                font-family: "Inter", sans-serif; text-align: center;
                opacity: 1; transition: opacity 0.5s ease-out;
            `;
            messageBox.textContent = alertMessage;
            document.body.appendChild(messageBox);

            // Automatically remove the message box after a few seconds.
            setTimeout(() => {
                messageBox.style.opacity = '0'; // Start fade out.
                setTimeout(() => {
                    if (document.body.contains(messageBox)) {
                        document.body.removeChild(messageBox); // Remove after fade out.
                    }
                }, 500); // Wait for fade out transition (0.5s).
            }, 3000); // Display for 3 seconds.
        });
    }
}

/**
 * Initial setup when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Load preferred language and associated translations.
    loadInitialLanguage();
    // Note: onScroll is called within its own setup if navElement exists.
    // Note: updatePrivateProjectLinkAlert is called within setLanguage after translations are loaded.
});
