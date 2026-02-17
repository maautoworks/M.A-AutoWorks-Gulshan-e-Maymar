// --- DATA & CONFIGURATION ---
const defaultProducts = [
    { id: 1, name: "Luxury Car Perfume", category: "fragrance", price: 850, img: "https://images.unsplash.com/photo-1594035900144-17e9e0238439?w=500&q=80" },
    { id: 2, name: "LED Headlight Bulbs (H4)", category: "lighting", price: 2500, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" },
    { id: 3, name: "Bosch Electric Horn", category: "utility", price: 1200, img: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=500&q=80" },
    { id: 4, name: "3D Custom Floor Mats", category: "interior", price: 3500, img: "https://images.unsplash.com/photo-1611859266264-9c94d389c8a5?w=500&q=80" },
    { id: 5, name: "Pioneer Door Speakers", category: "audio", price: 4500, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80" },
    { id: 6, name: "Android Touch Tablet", category: "audio", price: 8500, img: "https://images.unsplash.com/photo-1616469829941-c7200ed36d3c?w=500&q=80" },
    { id: 7, name: "4-Channel Amplifier", category: "audio", price: 6000, img: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500&q=80" },
    { id: 8, name: "Bluetooth MP3 Player", category: "audio", price: 1500, img: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&q=80" },
    { id: 9, name: "Dashboard Decorative Trim", category: "interior", price: 900, img: "https://images.unsplash.com/photo-1617531653520-4893f7bbf978?w=500&q=80" },
    { id: 10, name: "Leather Seat Covers", category: "interior", price: 5500, img: "https://images.unsplash.com/photo-1503376763036-066120622c74?w=500&q=80" },
    { id: 11, name: "Sport Steering Cover", category: "interior", price: 800, img: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=500&q=80" },
    { id: 12, name: "Dashboard Anti-Slip Mat", category: "interior", price: 400, img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500&q=80" },
    { id: 13, name: "Interior Ambient Light Strip", category: "lighting", price: 1800, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&q=80" },
    { id: 14, name: "Shooter Fog Lights", category: "lighting", price: 2200, img: "https://images.unsplash.com/photo-1503376763036-066120622c74?w=500&q=80" },
    { id: 15, name: "Universal Fog Lamp Set", category: "lighting", price: 3000, img: "https://images.unsplash.com/photo-1542362567-b07e543b53d8?w=500&q=80" },
];

// Initialize Data in LocalStorage if not exists
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}
if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
}

// --- CORE FUNCTIONS ---

function getProducts() {
    return JSON.parse(localStorage.getItem('products'));
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Render Products on Home Page
function renderProducts(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let products = getProducts();

    if (filter !== 'all') {
        products = products.filter(p => p.category === filter || 
            (filter === 'lighting' && (p.category === 'lighting' || p.name.includes('Light'))) ||
            (filter === 'interior' && (p.category === 'interior' || p.name.includes('Mat') || p.name.includes('Cover'))) ||
            (filter === 'audio' && (p.category === 'audio' || p.name.includes('Speaker') || p.name.includes('MP3'))) ||
            (filter === 'utility' && (p.category === 'utility' || p.name.includes('Horn')))
        );
    }

    if (searchTerm) {
        products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy">
            <div class="product-info">
                <span class="category-tag">${p.category.toUpperCase()}</span>
                <h3>${p.name}</h3>
                <div class="price">Rs. ${p.price}</div>
                <button onclick="orderNow(${p.id})" class="btn btn-primary" style="width:100%">Order Now</button>
            </div>
        </div>
    `).join('');
}

// Filter Category
function filterCategory(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts(cat);
}

// Search Function
function toggleSearch() {
    const bar = document.getElementById('searchBar');
    bar.style.display = bar.style.display === 'block' ? 'none' : 'block';
}

function searchProducts() {
    const term = document.getElementById('searchInput').value;
    renderProducts('all', term);
}

// Mobile Menu
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Order System
function orderNow(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    
    const url = `order.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&img=${encodeURIComponent(product.img)}`;
    window.location.href = url;
}

function submitOrder(e) {
    e.preventDefault();
    
    const orderData = {
        productId: document.getElementById('productId').value,
        productName: document.getElementById('orderName').innerText,
        price: document.getElementById('orderPrice').innerText,
        customer: document.getElementById('custName').value,
        phone: document.getElementById('custPhone').value,
        whatsapp: document.getElementById('custWhatsapp').value,
        email: document.getElementById('custEmail').value,
        city: document.getElementById('custCity').value,
        address: document.getElementById('custAddress').value,
        date: new Date().toLocaleString()
    };

    const orders = JSON.parse(localStorage.getItem('orders'));
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    const msg = `Hello M.A AutoWorks! I want to place an order:%0A%0A*Product:* ${orderData.productName}%0A*Price:* ${orderData.price}%0A%0A*My Details:*%0AName: ${orderData.customer}%0ACity: ${orderData.city}%0AAddress: ${orderData.address}%0APhone: ${orderData.phone}%0AWhatsApp: ${orderData.whatsapp}`;
    
    window.open(`https://wa.me/923178016025?text=${msg}`, '_blank');
    
    alert("Order Submitted Successfully! Redirecting to WhatsApp...");
    window.location.href = 'index.html';
}

// --- ADMIN PANEL FUNCTIONS ---

function openAdmin() {
    window.location.href = 'admin.html';
}

function renderAdminProducts() {
    const tbody = document.getElementById('adminProductList');
    if (!tbody) return;
    
    const products = getProducts();
    tbody.innerHTML = products.map(p => `
        <tr>
            <td><img src="${p.img}" width="50"></td>
            <td><input type="text" value="${p.name}" onchange="updateProduct(${p.id}, 'name', this.value)"></td>
            <td>${p.category}</td>
            <td><input type="number" value="${p.price}" onchange="updateProduct(${p.id}, 'price', this.value)"></td>
            <td><input type="text" value="${p.img}" onchange="updateProduct(${p.id}, 'img', this.value)"></td>
        </tr>
    `).join('');
}

function updateProduct(id, field, value) {
    let products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index][field] = field === 'price' ? parseInt(value) : value;
        saveProducts(products);
    }
}

function saveChanges() {
    alert("Changes Saved Successfully!");
}

function resetData() {
    if(confirm("Reset all data to default?")) {
        localStorage.setItem('products', JSON.stringify(defaultProducts));
        renderAdminProducts();
        alert("Data Reset");
    }
}

function renderOrders() {
    const list = document.getElementById('ordersList');
    if (!list) return;
    
    const orders = JSON.parse(localStorage.getItem('orders'));
    if (orders.length === 0) {
        list.innerHTML = "<p>No orders found.</p>";
        return;
    }
    
    list.innerHTML = orders.map(o => `
        <div class="review-card" style="margin-bottom:15px; background:#f8f9fa; color:#333;">
            <h4>${o.productName}</h4>
            <p><strong>Customer:</strong> ${o.customer} | <strong>City:</strong> ${o.city}</p>
            <p><strong>Contact:</strong> ${o.whatsapp}</p>
            <small>${o.date}</small>
        </div>
    `).join('');
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
