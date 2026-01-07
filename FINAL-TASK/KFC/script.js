// KFC Menu Data Array
const kfcMenuItems = [
    {
        id: 1,
        name: "Original Recipe Chicken",
        description: "Our world-famous chicken made with Colonel's secret recipe of 11 herbs and spices",
        price: 12.99,
        category: "buckets",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710"
    },
    {
        id: 2,
        name: "Zinger Burger",
        description: "Spicy crispy chicken fillet with lettuce and mayo in a soft sesame seed bun",
        price: 5.99,
        category: "burgers",
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58"
    },
    {
        id: 3,
        name: "Popcorn Chicken",
        description: "Bite-sized pieces of our famous chicken, perfect for sharing",
        price: 8.99,
        category: "buckets",
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92"
    },
    {
        id: 4,
        name: "Twister Wrap",
        description: "Tender chicken strips with lettuce, tomato, and sauce in a soft tortilla",
        price: 6.49,
        category: "burgers",
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828"
    },
    {
        id: 5,
        name: "French Fries",
        description: "Crispy golden fries seasoned with our special blend of spices",
        price: 3.99,
        category: "sides",
        image: "https://images.unsplash.com/photo-1576107232684-1279f7b88b9e"
    },
    {
        id: 6,
        name: "Coleslaw",
        description: "Creamy coleslaw made with fresh cabbage and carrots",
        price: 2.99,
        category: "sides",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d"
    },
    {
        id: 7,
        name: "Mashed Potatoes & Gravy",
        description: "Creamy mashed potatoes served with our signature gravy",
        price: 4.49,
        category: "sides",
        image: "https://images.unsplash.com/photo-1608377209381-7070b5d0d6c7"
    },
    {
        id: 8,
        name: "Chocolate Chip Cookie",
        description: "Freshly baked cookie loaded with chocolate chips",
        price: 1.99,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e"
    },
    {
        id: 9,
        name: "Apple Pie",
        description: "Warm apple pie with cinnamon filling",
        price: 3.49,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1561626423-8fa0ae7b5c9b"
    },
    {
        id: 10,
        name: "Pepsi",
        description: "Regular fountain drink (medium)",
        price: 2.49,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97"
    },
    {
        id: 11,
        name: "Iced Tea",
        description: "Freshly brewed iced tea (medium)",
        price: 2.49,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca"
    },
    {
        id: 12,
        name: "Bucket Meal (8pc)",
        description: "8 pieces chicken, 4 regular fries, 4 drinks, and 4 coleslaw",
        price: 24.99,
        category: "buckets",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086"
    },
    {
        id: 13,
        name: "Spicy Chicken Sandwich",
        description: "New! Spicy chicken fillet with pickles and sauce",
        price: 6.99,
        category: "burgers",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086"
    },
    {
        id: 14,
        name: "Mac & Cheese",
        description: "Creamy macaroni and cheese",
        price: 4.99,
        category: "sides",
        image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686"
    },
    {
        id: 15,
        name: "Brownie Sundae",
        description: "Warm brownie with ice cream and chocolate sauce",
        price: 5.49,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    }
];

// DOM Elements
let menuContainer = document.getElementById('menuContainer');
let searchInput = document.getElementById('searchInput');
let alertContainer = document.getElementById('alertContainer');
let orderForm = document.getElementById('orderForm');

// Initialize menu on page load
document.addEventListener('DOMContentLoaded', function() {
    if (menuContainer) {
        displayMenuItems(kfcMenuItems);
        
        // Set active state for All button
        document.querySelector('.btn-outline-danger').classList.add('active');
    }
    
    // Set min date for orders to today
    let dateInput = document.getElementById('date');
    if (dateInput) {
        let today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
});

// Display menu items
function displayMenuItems(items) {
    if (!menuContainer) return;
    
    menuContainer.innerHTML = '';
    
    if (items.length === 0) {
        menuContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-danger">No items found</h4>
                <p>Try a different search term or category</p>
            </div>
        `;
        return;
    }
    
    items.forEach(item => {
        const menuItemHTML = `
            <div class="col-md-4 col-lg-3 mb-4 menu-item" data-category="${item.category}">
                <div class="card h-100 border-0 shadow-sm hover-effect">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 180px; object-fit: cover;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-1" style="color: #e4002b;">${item.name}</h5>
                            <span class="badge bg-warning text-dark fs-6">$${item.price}</span>
                        </div>
                        <p class="card-text small text-muted mb-3">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-secondary category">${item.category.toUpperCase()}</span>
                            <button class="btn btn-sm btn-outline-danger" onclick="addToCart(${item.id})">
                                <i class="fas fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        menuContainer.innerHTML += menuItemHTML;
    });
}

// Filter menu by category
function filterMenu(category) {
    const filteredItems = category === 'all' 
        ? kfcMenuItems 
        : kfcMenuItems.filter(item => item.category === category);
    
    displayMenuItems(filteredItems);
    
    // Update active button state
    document.querySelectorAll('.btn-outline-danger').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activate the clicked button
    event.target.classList.add('active');
}

// Search menu items
function searchMenu() {
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayMenuItems(kfcMenuItems);
        // Reset active state for All button
        document.querySelectorAll('.btn-outline-danger').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes('All Items')) {
                btn.classList.add('active');
            }
        });
        return;
    }
    
    const filteredItems = kfcMenuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    
    displayMenuItems(filteredItems);
}

// Add item to cart (simulated)
function addToCart(itemId) {
    const item = kfcMenuItems.find(i => i.id === itemId);
    if (item) {
        showAlert(`${item.name} added to cart!`, 'success');
        console.log(`Added to cart: ${item.name} - $${item.price}`);
    }
}

// Order Form Validation and Submission
if (orderForm) {
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const deliveryTime = document.getElementById('deliveryTime').value;
        const payment = document.getElementById('payment').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Validation flags
        let isValid = true;
        
        // Clear previous alerts
        alertContainer.innerHTML = '';
        
        // Validate name
        if (name === '') {
            showError('Please enter your full name');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            showError('Please enter a valid 10-digit phone number');
            isValid = false;
        }
        
        // Validate address
        if (address === '') {
            showError('Please enter your delivery address');
            isValid = false;
        } else if (address.length < 10) {
            showError('Please enter a complete delivery address');
            isValid = false;
        }
        
        // Validate delivery time
        if (!deliveryTime) {
            showError('Please select delivery time');
            isValid = false;
        }
        
        // Validate payment method
        if (!payment) {
            showError('Please select payment method');
            isValid = false;
        }
        
        // Validate terms agreement
        if (!agreeTerms) {
            showError('You must agree to the Terms & Conditions');
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            showSuccess('Order placed successfully! You will receive a confirmation email shortly.');
            
            // Reset form
            orderForm.reset();
            
            // Reset terms checkbox
            document.getElementById('agreeTerms').checked = false;
        }
    });
}

// Show error message
function showError(message) {
    const alertHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <div class="d-flex align-items-center">
                <i class="fas fa-exclamation-circle me-3 fa-lg"></i>
                <div>${message}</div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    alertContainer.innerHTML = alertHTML;
}

// Show success message
function showSuccess(message) {
    const alertHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <div class="d-flex align-items-center">
                <i class="fas fa-check-circle me-3 fa-lg"></i>
                <div>${message}</div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    alertContainer.innerHTML = alertHTML;
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" style="z-index: 9999;" role="alert">
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-3 fa-lg"></i>
                <div>${message}</div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Remove existing alerts
    document.querySelectorAll('.alert.position-fixed').forEach(alert => alert.remove());
    
    // Add new alert
    document.body.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert.position-fixed');
        if (alert) alert.remove();
    }, 3000);
}

// Real-time phone validation
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
}

// Real-time search
if (searchInput) {
    searchInput.addEventListener('keyup', function(event) {
        // Only search if user stops typing for 500ms
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            searchMenu();
        }, 500);
    });
    
    searchInput.addEventListener('search', function() {
        searchMenu();
    });
}

// Category filter with Enter key support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.classList.contains('btn-outline-danger')) {
        event.target.click();
    }
});

// Shopping cart simulation
let cart = [];

function addToCart(itemId) {
    const item = kfcMenuItems.find(i => i.id === itemId);
    if (item) {
        cart.push(item);
        showAlert(`${item.name} added to cart!`, 'success');
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
    }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});