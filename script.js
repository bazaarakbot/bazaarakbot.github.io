window.addEventListener("load", () => {
    // Initialize Bale WebApp
    if (window.Bale && window.Bale.WebApp) {
        // Show Settings Button
        window.Bale.WebApp.SettingsButton.show();
        
        // Handle onClick event on SettingsButton
        window.Bale.WebApp.onEvent("settingsButtonPressed", () => {
            console.log("Settings button pressed");
        });
        
        // Get user data from Bale
        const user = window.Bale.WebApp.initDataUnsafe.user;
        displayUserInfo(user);
    }
    
    // Initialize UI elements
    initializeToolbar();
    initializeUserActions();
    
    // Fetch products from backend (to be implemented)
    fetchProducts();
});

// Display user information
function displayUserInfo(user) {
    const userInfoEl = document.getElementById('user-info');
    
    if (user) {
        userInfoEl.innerHTML = `
            <p class="user-name">${user.first_name || 'کاربر'} ${user.last_name || ''}</p>
            <p class="user-id">شناسه: ${user.id || 'نامشخص'}</p>
            <p class="user-username">نام کاربری: ${user.username || 'نامشخص'}</p>
        `;
    } else {
        userInfoEl.innerHTML = `
            <p class="user-name">کاربر مهمان</p>
            <p>لطفا وارد حساب کاربری خود شوید</p>
        `;
    }
}

// Initialize toolbar functionality
function initializeToolbar() {
    const toolbarItems = document.querySelectorAll('.toolbar-item');
    const sections = {
        'products-container': document.getElementById('products-container'),
        'user-account-section': document.getElementById('user-account-section'),
        'search-section': document.getElementById('search-section')
    };
    
    toolbarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state
            toolbarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Show the corresponding section
            const sectionId = item.getAttribute('data-section');
            
            // Hide all sections first
            Object.values(sections).forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the selected section
            if (sections[sectionId]) {
                sections[sectionId].classList.remove('hidden');
            }
        });
    });
}

// Initialize user action buttons
function initializeUserActions() {
    const registerShopBtn = document.getElementById('register-shop-btn');
    const suggestionsBtn = document.getElementById('suggestions-btn');
    
    registerShopBtn.addEventListener('click', () => {
        console.log('Register shop button clicked');
        // Implement shop registration functionality
        alert('ثبت فروشگاه جدید');
    });
    
    suggestionsBtn.addEventListener('click', () => {
        console.log('Suggestions button clicked');
        // Implement suggestions functionality
        alert('ارسال پیشنهاد');
    });
    
    // Initialize search functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchProducts(query);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
            }
        }
    });
}

// Fetch products from backend
function fetchProducts() {
    const productsContainer = document.getElementById('products-container');
    
    // Show loading indicator
    productsContainer.innerHTML = '<div class="loading-indicator">در حال بارگذاری محصولات...</div>';
    
    // This would be replaced with an actual API call to your Flask backend
    // For example:
    // fetch('/api/products')
    //     .then(response => response.json())
    //     .then(data => displayProducts(data))
    //     .catch(error => {
    //         console.error('Error fetching products:', error);
    //         productsContainer.innerHTML = '<div class="error-message">خطا در بارگذاری محصولات</div>';
    //     });
    
    // Simulating API delay
    setTimeout(() => {
        productsContainer.innerHTML = '<div class="loading-indicator">محصولات از سرور دریافت خواهند شد.</div>';
    }, 1000);
}

// Display products in the UI
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    
    if (!products || products.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">محصولی یافت نشد</div>';
        return;
    }
    
    let productsHTML = '';
    
    products.forEach(product => {
        productsHTML += `
            <div class="product" data-id="${product.id}">
                <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${formatPrice(product.price)} تومان</div>
                </div>
            </div>
        `;
    });
    
    productsContainer.innerHTML = productsHTML;
    
    // Add click event to products
    const productElements = document.querySelectorAll('.product');
    productElements.forEach(productEl => {
        productEl.addEventListener('click', () => {
            const productId = productEl.getAttribute('data-id');
            showProductDetails(productId);
        });
    });
}

// Search products
function searchProducts(query) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '<div class="loading-indicator">در حال جستجو...</div>';
    
    // This would be replaced with an actual API call to your Flask backend
    // For example:
    // fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
    //     .then(response => response.json())
    //     .then(data => displaySearchResults(data, query))
    //     .catch(error => {
    //         console.error('Error searching products:', error);
    //         searchResults.innerHTML = '<div class="error-message">خطا در جستجوی محصولات</div>';
    //     });
    
    // Simulating API delay
    setTimeout(() => {
        searchResults.innerHTML = `<div class="search-message">نتایج جستجو برای "${query}" از سرور دریافت خواهند شد.</div>`;
    }, 1000);
}

// Display search results
function displaySearchResults(products, query) {
    const searchResults = document.getElementById('search-results');
    
    if (!products || products.length === 0) {
        searchResults.innerHTML = `<div class="no-results">محصولی با عبارت "${query}" یافت نشد</div>`;
        return;
    }
    
    let resultsHTML = `<div class="results-title">نتایج جستجو برای "${query}":</div>`;
    
    products.forEach(product => {
        resultsHTML += `
            <div class="search-product" data-id="${product.id}">
                <img src="${product.image || 'https://via.placeholder.com/50'}" alt="${product.name}">
                <div class="search-product-info">
                    <div class="search-product-name">${product.name}</div>
                    <div class="search-product-price">${formatPrice(product.price)} تومان</div>
                </div>
            </div>
        `;
    });
    
    searchResults.innerHTML = resultsHTML;
    
    // Add click event to search results
    const searchProductElements = document.querySelectorAll('.search-product');
    searchProductElements.forEach(productEl => {
        productEl.addEventListener('click', () => {
            const productId = productEl.getAttribute('data-id');
            showProductDetails(productId);
        });
    });
}

// Show product details
function showProductDetails(productId) {
    console.log(`Showing details for product ID: ${productId}`);
    // This would open a product detail view
    // Implementation depends on your app's navigation structure
}

// Format price with thousand separators
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener('DOMContentLoaded', function() {
    // Load products
    fetchProducts();
    
    // Setup toolbar navigation
    setupToolbarNavigation();
    
    // Initialize Bale Mini App if available
    initializeBaleApp();
});

function fetchProducts() {
    // Placeholder for product fetching logic
    // Replace with actual API call
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            document.querySelector('.loading-indicator').textContent = 'خطا در بارگذاری محصولات!';
        });
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    
    // Clear loading indicator
    productsContainer.innerHTML = '';
    
    // If no products, show message
    if (!products || products.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">محصولی یافت نشد</div>';
        return;
    }
    
    // Display each product
    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

function createProductElement(product) {
    // Create product card element
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    // Add product content (customize based on your product data structure)
    productCard.innerHTML = `
        <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price} تومان</p>
        <button class="buy-button">خرید</button>
    `;
    
    return productCard;
}

function setupToolbarNavigation() {
    const toolbarItems = document.querySelectorAll('.toolbar-item');
    
    toolbarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the target section ID
            const targetSectionId = this.getAttribute('data-section');
            
            // Hide all sections
            document.querySelectorAll('.user-section, .search-section, .products').forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the target section
            document.getElementById(targetSectionId).classList.remove('hidden');
            
            // Update active toolbar item
            toolbarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initializeBaleApp() {
    // Check if Bale Mini App API is available
    if (window.BaleAPI) {
        // Get user info
        BaleAPI.getUserInfo()
            .then(userInfo => {
                // Display user info
                const userInfoElement = document.getElementById('user-info');
                if (userInfoElement) {
                    userInfoElement.innerHTML = `
                        <p class="user-name">${userInfo.name || 'کاربر'}</p>
                        <p class="user-id">شناسه: ${userInfo.id || 'نامشخص'}</p>
                    `;
                }
            })
            .catch(error => {
                console.error('Error getting user info from Bale:', error);
            });
            
        // Setup other Bale-specific functionality
        setupBaleButtons();
    }
}

function setupBaleButtons() {
    // Register shop button
    const registerShopBtn = document.getElementById('register-shop-btn');
    if (registerShopBtn) {
        registerShopBtn.addEventListener('click', function() {
            // Implement shop registration logic
            alert('این قابلیت به زودی فعال خواهد شد');
        });
    }
    
    // Suggestions button
    const suggestionsBtn = document.getElementById('suggestions-btn');
    if (suggestionsBtn) {
        suggestionsBtn.addEventListener('click', function() {
            // Implement suggestions logic
            alert('لطفا پیشنهاد خود را ارسال کنید');
        });
    }
    
    // Search button
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = document.getElementById('search-input').value;
            if (searchTerm.trim()) {
                searchProducts(searchTerm);
            }
        });
    }
}

function searchProducts(term) {
    // Implement search functionality
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '<div class="loading-indicator">در حال جستجو...</div>';
    
    // Replace with actual search API call
    fetch(`/api/search?term=${encodeURIComponent(term)}`)
        .then(response => response.json())
        .then(results => {
            displaySearchResults(results);
        })
        .catch(error => {
            console.error('Error searching products:', error);
            searchResults.innerHTML = '<div class="error">خطا در جستجو</div>';
        });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    
    if (!results || results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">نتیجه‌ای یافت نشد</div>';
        return;
    }
    
    results.forEach(product => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result-item';
        resultElement.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/50'}" alt="${product.name}">
            <div class="result-details">
                <h4>${product.name}</h4>
                <p>${product.price} تومان</p>
            </div>
        `;
        searchResults.appendChild(resultElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bale Mini App
    if (window.BaleAPI) {
        // Get user data
        BaleAPI.getUserInfo().then(function(user) {
            const userDataElement = document.getElementById('user_data');
            if (userDataElement) {
                // Format user data for display
                let userData = `
                    <p><strong>نام:</strong> ${user.firstName || 'نامشخص'} ${user.lastName || ''}</p>
                    <p><strong>نام کاربری:</strong> ${user.username || 'نامشخص'}</p>
                    <p><strong>شناسه کاربری:</strong> ${user.id || 'نامشخص'}</p>
                `;
                
                if (user.photoUrl) {
                    // If user has a photo, update the avatar
                    const userAvatar = document.querySelector('.user-avatar');
                    if (userAvatar) {
                        userAvatar.innerHTML = `<img src="${user.photoUrl}" alt="تصویر کاربر" class="user-photo">`;
                    }
                }
                
                userDataElement.innerHTML = userData;
            }
        }).catch(function(error) {
            console.error('Error getting user info:', error);
            const userDataElement = document.getElementById('user_data');
            if (userDataElement) {
                userDataElement.textContent = 'خطا در دریافت اطلاعات کاربر';
            }
        });
        
        // Set up callback buttons
        const closeButton = document.getElementById('close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                BaleAPI.close();
            });
        }
        
        const enableClosingConfirmationButton = document.getElementById('enableClosingConfirmation');
        if (enableClosingConfirmationButton) {
            enableClosingConfirmationButton.addEventListener('click', function() {
                BaleAPI.enableClosingConfirmation();
            });
        }
        
        const expandButton = document.getElementById('expand');
        if (expandButton) {
            expandButton.addEventListener('click', function() {
                BaleAPI.expand();
            });
        }
        
        const requestContactButton = document.getElementById('requestContact');
        if (requestContactButton) {
            requestContactButton.addEventListener('click', function() {
                BaleAPI.requestContact().then(function(contact) {
                    const userDataElement = document.getElementById('user_data');
                    if (userDataElement) {
                        // Add contact info to user data
                        userDataElement.innerHTML += `
                            <p><strong>شماره تلفن:</strong> ${contact.phoneNumber || 'نامشخص'}</p>
                        `;
                    }
                }).catch(function(error) {
                    console.error('Error requesting contact:', error);
                });
            });
        }
    }
    
    // Existing toolbar functionality
    const toolbarItems = document.querySelectorAll('.toolbar-item');
    toolbarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all toolbar items
            toolbarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            document.getElementById('products-container').classList.add('hidden');
            document.getElementById('user-account-section').classList.add('hidden');
            document.getElementById('search-section').classList.add('hidden');
            
            // Show the selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.remove('hidden');
        });
    });
    
    // Add your existing code here...
});
