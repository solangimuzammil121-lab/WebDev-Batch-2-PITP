// currency.js - PKR Currency Utilities

class PKRCurrency {
    constructor() {
        this.symbol = 'Rs';
        this.decimalSeparator = '.';
        this.thousandsSeparator = ',';
    }
    
    format(amount, showSymbol = true) {
        const formatted = amount.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
        
        return showSymbol ? `${this.symbol} ${formatted}` : formatted;
    }
    
    parse(formattedString) {
        const numberString = formattedString
            .replace(this.symbol, '')
            .replace(new RegExp(`\\${this.thousandsSeparator}`, 'g'), '');
        
        return parseInt(numberString);
    }
    
    convertFromUSD(usdAmount) {
        const exchangeRates = {
            'USD': 280,
            'EUR': 305,
            'GBP': 355,
            'AED': 76,
            'SAR': 75
        };
        
        // You can fetch live rates from an API
        // For now using fixed rates
        return Math.round(usdAmount * exchangeRates['USD']);
    }
    
    formatForDisplay(amount) {
        if (amount >= 1000000) {
            return `${this.symbol} ${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `${this.symbol} ${(amount / 1000).toFixed(1)}K`;
        }
        return this.format(amount);
    }
    
    calculateTax(amount, taxRate = 0.13) {
        return Math.round(amount * taxRate);
    }
    
    calculateDelivery(amount) {
        if (amount === 0) return 0;
        if (amount < 500) return 200;
        if (amount < 2000) return 150;
        if (amount < 5000) return 100;
        return 0; // Free delivery for large orders
    }
}

// Export for use in other files
const pkrCurrency = new PKRCurrency();

// Global helper function
function formatPricePKR(amount) {
    return pkrCurrency.format(amount);
}

// Auto-convert all USD prices on page
function convertAllPricesToPKR() {
    const elements = document.querySelectorAll('[data-price-usd]');
    elements.forEach(element => {
        const usdPrice = parseFloat(element.getAttribute('data-price-usd'));
        if (!isNaN(usdPrice)) {
            const pkrPrice = pkrCurrency.convertFromUSD(usdPrice);
            element.textContent = pkrCurrency.format(pkrPrice);
        }
    });
}

// Initialize when page loads
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', convertAllPricesToPKR);
}
// DOM Elements
let menuContainer = document.getElementById('menuContainer');
let searchInput = document.getElementById('searchInput');
let alertContainer = document.getElementById('alertContainer');
let reservationForm = document.getElementById('reservationForm');

// Initialize menu on page load
document.addEventListener('DOMContentLoaded', function() {
    if (menuContainer) {
        displayMenuItems(menuItems);
    }
    
    // Set min date for reservation to today
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
    
    items.forEach(item => {
        const menuItemHTML = `
            <div class="col-md-4 mb-4 menu-item" data-category="${item.category}">
                <div class="card h-100">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <h5 class="card-title">${item.name}</h5>
                            <span class="price">$${item.price}</span>
                        </div>
                        <p class="card-text">${item.description}</p>
                        <span class="badge bg-secondary category">${item.category.toUpperCase()}</span>
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
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    displayMenuItems(filteredItems);
    
    // Update active button state
    document.querySelectorAll('.btn-outline-primary').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
}

// Search menu items
function searchMenu() {
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayMenuItems(menuItems);
        return;
    }
    
    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    
    displayMenuItems(filteredItems);
    
    // Show message if no results
    if (filteredItems.length === 0) {
        menuContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No items found</h4>
                <p>Try a different search term</p>
            </div>
        `;
    }
}

// Form Validation and Submission
if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        // Validation flags
        let isValid = true;
        
        // Clear previous alerts
        alertContainer.innerHTML = '';
        
        // Validate name
        if (name === '') {
            showError('Please enter your name');
            isValid = false;
        }
        
        // Validate phone (11 digits)
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(phone)) {
            showError('Please enter a valid 11-digit phone number');
            isValid = false;
        }
        
        // Validate date
        if (!date) {
            showError('Please select a date');
            isValid = false;
        }
        
        // Validate time
        if (!time) {
            showError('Please select a time');
            isValid = false;
        }
        
        // Validate guests
        if (!guests || guests < 1) {
            showError('Please select number of guests');
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            showSuccess('Table booked successfully! We will confirm your reservation shortly.');
            
            // Reset form
            reservationForm.reset();
            
            // Reset min date
            let dateInput = document.getElementById('date');
            if (dateInput) {
                let today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
                dateInput.value = today;
            }
        }
    });
}

// Show error message
function showError(message) {
    const alertHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    alertContainer.innerHTML = alertHTML;
}

// Show success message
function showSuccess(message) {
    const alertHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    alertContainer.innerHTML = alertHTML;
}

// Real-time phone validation
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 11);
    });
}

// Search input real-time filtering
if (searchInput) {
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchMenu();
        }
    });
}