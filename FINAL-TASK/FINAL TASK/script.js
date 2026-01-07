// Menu Data Array
const menuItems = [
    {
        id: 1,
        name: "Truffle Arancini",
        description: "Crispy risotto balls with black truffle and mozzarella",
        price: 14.99,
        category: "starters",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6"
    },
    {
        id: 2,
        name: "Bruschetta Trio",
        description: "Toasted bread with tomato, mushroom, and pesto toppings",
        price: 12.99,
        category: "starters",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f"
    },
    {
        id: 3,
        name: "Calamari Fritti",
        description: "Crispy fried squid with lemon aioli",
        price: 16.99,
        category: "starters",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307"
    },
    {
        id: 4,
        name: "Herb-Crusted Salmon",
        description: "Atlantic salmon with dill sauce and roasted potatoes",
        price: 28.99,
        category: "mains",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
    },
    {
        id: 5,
        name: "Filet Mignon",
        description: "8oz beef tenderloin with red wine reduction and vegetables",
        price: 36.99,
        category: "mains",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d"
    },
    {
        id: 6,
        name: "Mushroom Risotto",
        description: "Creamy arborio rice with wild mushrooms and parmesan",
        price: 22.99,
        category: "mains",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371"
    },
    {
        id: 7,
        name: "Tiramisu",
        description: "Classic Italian dessert with mascarpone and coffee",
        price: 10.99,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e"
    },
    {
        id: 8,
        name: "Chocolate Soufflé",
        description: "Warm chocolate dessert with vanilla ice cream",
        price: 12.99,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb"
    },
    {
        id: 9,
        name: "Berry Pavlova",
        description: "Meringue with fresh berries and whipped cream",
        price: 11.99,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187"
    },
    {
        id: 10,
        name: "Craft Cocktails",
        description: "Seasonal signature cocktails",
        price: 14.99,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b"
    },
    {
        id: 11,
        name: "Wine Selection",
        description: "Curated local and international wines",
        price: 9.99,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb"
    },
    {
        id: 12,
        name: "Fresh Juices",
        description: "Daily pressed fruit and vegetable juices",
        price: 6.99,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba"
    }
];

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