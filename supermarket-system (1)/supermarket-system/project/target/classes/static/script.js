/* ==========================================================
   script.js — Shared Logic & Modern Interactive Features
   FreshCart Supermarket System
   ========================================================== */

const API_BASE = "";

// ---------- Real High-Resolution Product Photos Dictionary ----------
const PRODUCT_IMAGE_MAP = {
  // Fruits
  "apple": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
  "banana": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
  "orange": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&auto=format&fit=crop&q=80",
  "strawberry": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80",
  "avocado": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",
  "blueberry": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&auto=format&fit=crop&q=80",
  "mango": "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
  "grape": "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=600&auto=format&fit=crop&q=80",
  "watermelon": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",

  // Vegetables
  "broccoli": "https://images.unsplash.com/photo-1584270359800-4740f9076f73?w=600&auto=format&fit=crop&q=80",
  "carrot": "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?w=600&auto=format&fit=crop&q=80",
  "tomato": "https://images.unsplash.com/photo-1546470427-227c7369a941?w=600&auto=format&fit=crop&q=80",
  "spinach": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80",
  "pepper": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
  "cucumber": "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&auto=format&fit=crop&q=80",
  "garlic": "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=600&auto=format&fit=crop&q=80",
  "onion": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
  "potato": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",

  // Dairy
  "milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
  "yogurt": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
  "egg": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=80",
  "cheese": "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600&auto=format&fit=crop&q=80",
  "butter": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80",

  // Bakery
  "croissant": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
  "sourdough": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
  "bread": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&auto=format&fit=crop&q=80",
  "bagel": "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=600&auto=format&fit=crop&q=80",
  "muffin": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop&q=80",

  // Grains & Pantry
  "rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
  "oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
  "pasta": "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop&q=80",
  "oats": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&auto=format&fit=crop&q=80",
  "flour": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",

  // Beverages
  "juice": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
  "coffee": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80",
  "tea": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
  "water": "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80",

  // Snacks
  "almond": "https://images.unsplash.com/photo-1508061252966-f72fb40222f7?w=600&auto=format&fit=crop&q=80",
  "chocolate": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80",
  "cookie": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80",
  "chips": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",

  // Meat & Seafood
  "chicken": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80",
  "salmon": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80"
};

const CATEGORY_FALLBACK_IMAGES = {
  "Fruits": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80",
  "Vegetables": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
  "Dairy": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&auto=format&fit=crop&q=80",
  "Bakery": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
  "Grains": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
  "Cooking": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
  "Grocery": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80",
  "Beverages": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
  "Snacks": "https://images.unsplash.com/photo-1508061252966-f72fb40222f7?w=600&auto=format&fit=crop&q=80",
  "Meat": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80"
};

const DEFAULT_SUPERMARKET_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80";

function getProductImageUrl(product) {
  if (product && product.imageUrl && product.imageUrl.trim() !== "") {
    return product.imageUrl;
  }
  const nameLower = (product && product.name ? product.name.toLowerCase() : "");
  for (const [key, url] of Object.entries(PRODUCT_IMAGE_MAP)) {
    if (nameLower.includes(key)) {
      return url;
    }
  }
  const category = (product && product.category) || "";
  if (CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }
  return DEFAULT_SUPERMARKET_IMAGE;
}

// Built-in curated catalog fallback
const CURATED_SAMPLE_PRODUCTS = [
  { id: 101, name: "Crisp Royal Gala Apples", description: "Sweet, crunchy, fresh orchard hand-picked apples (1kg pack)", price: 580.00, stockQuantity: 45, category: "Fruits", imageUrl: PRODUCT_IMAGE_MAP["apple"] },
  { id: 102, name: "Organic Cavendish Bananas", description: "Farm-fresh naturally ripened sweet bananas (1 dozen)", price: 320.00, stockQuantity: 60, category: "Fruits", imageUrl: PRODUCT_IMAGE_MAP["banana"] },
  { id: 103, name: "Juicy Valencia Oranges", description: "Sun-kissed vitamin C rich citrus oranges (1kg)", price: 650.00, stockQuantity: 35, category: "Fruits", imageUrl: PRODUCT_IMAGE_MAP["orange"] },
  { id: 104, name: "Fresh Farm Strawberries", description: "Plump sweet aromatic highland strawberries (250g punnet)", price: 780.00, stockQuantity: 20, category: "Fruits", imageUrl: PRODUCT_IMAGE_MAP["strawberry"] },
  { id: 105, name: "Ripe Hass Avocados", description: "Creamy, nutrient-dense fresh avocados (Pack of 2)", price: 620.00, stockQuantity: 18, category: "Fruits", imageUrl: PRODUCT_IMAGE_MAP["avocado"] },
  { id: 106, name: "Sweet Mountain Blueberries", description: "Antioxidant-rich fresh mountain blueberries (125g)", price: 850.00, stockQuantity: 15, category: "Fruits", imageUrl: PRODUCT_IMAGE_MAP["blueberry"] },

  { id: 107, name: "Crisp Garden Broccoli", description: "Nutrient-packed green broccoli crowns (500g)", price: 420.00, stockQuantity: 25, category: "Vegetables", imageUrl: PRODUCT_IMAGE_MAP["broccoli"] },
  { id: 108, name: "Farm-Fresh Organic Carrots", description: "Crisp, sweet, vibrant orange table carrots (1kg)", price: 350.00, stockQuantity: 50, category: "Vegetables", imageUrl: PRODUCT_IMAGE_MAP["carrot"] },
  { id: 109, name: "Vine Ripe Red Tomatoes", description: "Juicy, firm greenhouse hydroponic tomatoes (1kg)", price: 480.00, stockQuantity: 40, category: "Vegetables", imageUrl: PRODUCT_IMAGE_MAP["tomato"] },
  { id: 110, name: "Tender Baby Spinach Leaves", description: "Pre-washed tender salad baby spinach (200g pack)", price: 390.00, stockQuantity: 22, category: "Vegetables", imageUrl: PRODUCT_IMAGE_MAP["spinach"] },
  { id: 111, name: "Bell Peppers Trio", description: "Red, yellow, and green sweet bell peppers (Pack of 3)", price: 540.00, stockQuantity: 30, category: "Vegetables", imageUrl: PRODUCT_IMAGE_MAP["pepper"] },
  { id: 112, name: "English Salad Cucumbers", description: "Crisp, refreshing, seedless garden cucumbers (500g)", price: 260.00, stockQuantity: 40, category: "Vegetables", imageUrl: PRODUCT_IMAGE_MAP["cucumber"] },

  { id: 113, name: "Fresh Pure Whole Milk (1L)", description: "Pasteurized cream-top farm milk with natural rich taste", price: 490.00, stockQuantity: 60, category: "Dairy", imageUrl: PRODUCT_IMAGE_MAP["milk"] },
  { id: 114, name: "Artisan Greek Yogurt (500g)", description: "Thick, high-protein traditional strained yogurt", price: 580.00, stockQuantity: 25, category: "Dairy", imageUrl: PRODUCT_IMAGE_MAP["yogurt"] },
  { id: 115, name: "Free-Range Farm Eggs (12pk)", description: "Golden-yolk fresh free-range country eggs", price: 690.00, stockQuantity: 48, category: "Dairy", imageUrl: PRODUCT_IMAGE_MAP["egg"] },
  { id: 116, name: "Aged English Cheddar Cheese", description: "Matured sharp cheddar block (200g)", price: 920.00, stockQuantity: 19, category: "Dairy", imageUrl: PRODUCT_IMAGE_MAP["cheese"] },
  { id: 117, name: "Pure Creamery Salted Butter", description: "Churned traditional rich golden table butter (250g)", price: 750.00, stockQuantity: 30, category: "Dairy", imageUrl: PRODUCT_IMAGE_MAP["butter"] },

  { id: 118, name: "Golden Butter Croissants (4pk)", description: "Flaky, buttery French recipe baked fresh daily", price: 620.00, stockQuantity: 16, category: "Bakery", imageUrl: PRODUCT_IMAGE_MAP["croissant"] },
  { id: 119, name: "Artisan Sourdough Loaf", description: "Naturally fermented crusty European sourdough bread", price: 550.00, stockQuantity: 14, category: "Bakery", imageUrl: PRODUCT_IMAGE_MAP["sourdough"] },
  { id: 120, name: "Whole Grain Wheat Bread", description: "Nutritious multi-seed sliced breakfast bread (450g)", price: 380.00, stockQuantity: 35, category: "Bakery", imageUrl: PRODUCT_IMAGE_MAP["bread"] },

  { id: 121, name: "Royal Basmati Rice (5kg)", description: "Aged long-grain fragrant supreme basmati rice", price: 2450.00, stockQuantity: 40, category: "Grains", imageUrl: PRODUCT_IMAGE_MAP["rice"] },
  { id: 122, name: "Extra Virgin Olive Oil (750ml)", description: "First cold-pressed Mediterranean golden olive oil", price: 2850.00, stockQuantity: 24, category: "Cooking", imageUrl: PRODUCT_IMAGE_MAP["oil"] },
  { id: 123, name: "Italian Penne Rigate (500g)", description: "Authentic bronze-cut durum wheat semolina pasta", price: 480.00, stockQuantity: 50, category: "Grocery", imageUrl: PRODUCT_IMAGE_MAP["pasta"] },

  { id: 124, name: "Fresh Orange Juice (1L)", description: "100% freshly cold-squeezed citrus juice, no added sugar", price: 790.00, stockQuantity: 28, category: "Beverages", imageUrl: PRODUCT_IMAGE_MAP["juice"] },
  { id: 125, name: "Premium Roasted Arabica Beans", description: "Medium-dark roasted highland aromatic coffee (250g)", price: 1650.00, stockQuantity: 20, category: "Beverages", imageUrl: PRODUCT_IMAGE_MAP["coffee"] },

  { id: 126, name: "Roasted Himalayan Almonds", description: "Slow-roasted crunchy California almonds with pink salt (200g)", price: 980.00, stockQuantity: 32, category: "Snacks", imageUrl: PRODUCT_IMAGE_MAP["almond"] },
  { id: 127, name: "Belgian Dark Chocolate 72%", description: "Rich handcrafted premium dark cocoa chocolate bar (100g)", price: 650.00, stockQuantity: 40, category: "Snacks", imageUrl: PRODUCT_IMAGE_MAP["chocolate"] }
];

// ---------- Session helpers & Flexible Role Testing ----------
function getUser() {
  const raw = localStorage.getItem("currentUser");
  if (!raw) {
    const defaultUser = { id: 1, name: "Admin Manager", email: "admin@freshcart.com", role: "ADMIN" };
    localStorage.setItem("currentUser", JSON.stringify(defaultUser));
    return defaultUser;
  }
  return JSON.parse(raw);
}

function setUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function switchUserRole(newRole) {
  const user = getUser() || { id: 1, name: "FreshCart User", email: "user@freshcart.com" };
  user.role = newRole;
  setUser(user);
  showModernToast("Role Switched", `Current role is now: ${newRole}`);
  setTimeout(() => location.reload(), 400);
}

function requireLogin() {
  let user = getUser();
  if (!user) {
    user = { id: 1, name: "Admin Manager", email: "admin@freshcart.com", role: "ADMIN" };
    setUser(user);
  }
  return user;
}

const STAFF_ROLES = ["ADMIN", "DELIVERY_STAFF", "STORE_MANAGER"];

function isStaff() {
  const user = getUser();
  return user && (user.role === "ADMIN" || STAFF_ROLES.includes(user.role));
}

function requireStaff() {
  const user = requireLogin();
  // ADMIN has full superuser privileges everywhere
  if (user && user.role === "ADMIN") return user;
  if (user && STAFF_ROLES.includes(user.role)) return user;
  // If customer visits staff page, don't break with redirect loop; notify gracefully
  showModernToast("Staff Preview", "Accessing as preview. Switch role in topnav if needed.");
  return user;
}

function requireRole(role) {
  const user = requireLogin();
  if (!user) return null;
  // ADMIN is superuser - allowed anywhere
  if (user.role === "ADMIN") return user;
  // Any role can shop and view their own cart
  if (role === "CUSTOMER") return user;
  // If role doesn't match:
  if (user.role !== role) {
    console.warn(`Page target role: ${role}. Active user role: ${user.role}. Allowing preview.`);
  }
  return user;
}

function applyRoleNav() {
  const user = getUser();
  if (!user) return;

  const role = user.role;

  // If user is ADMIN, show ALL navigation links so nothing is hidden!
  if (role === "ADMIN") {
    document.querySelectorAll("[data-roles]").forEach((el) => {
      el.style.display = "";
    });
    return;
  }

  document.querySelectorAll("[data-roles]").forEach((el) => {
    const allowedRoles = el.getAttribute("data-roles").split(",").map((r) => r.trim());
    // Show the element only if user's role is explicitly listed
    el.style.display = allowedRoles.includes(role) ? "" : "none";
  });

  // Inject role-specific shortcut links into the nav that pages might not include
  const nav = document.querySelector(".topnav nav");
  if (!nav) return;

  // Delivery dashboard link for DELIVERY_STAFF
  if (role === "DELIVERY_STAFF" && !nav.querySelector('a[href="delivery-dashboard.html"]')) {
    const lnk = document.createElement("a");
    lnk.href = "delivery-dashboard.html";
    lnk.textContent = "🛵 My Deliveries";
    const logout = document.getElementById("logoutBtn");
    if (logout) nav.insertBefore(lnk, logout);
    else nav.appendChild(lnk);
  }

  // Reports dashboard link for STORE_MANAGER
  if (role === "STORE_MANAGER" && !nav.querySelector('a[href="reports-dashboard.html"]')) {
    const lnk = document.createElement("a");
    lnk.href = "reports-dashboard.html";
    lnk.textContent = "📊 Analytics";
    const logout = document.getElementById("logoutBtn");
    if (logout) nav.insertBefore(lnk, logout);
    else nav.appendChild(lnk);
  }
}

// Injects a topnav Role Switcher pill into the navbar
function renderNavRoleSwitcher() {
  const nav = document.querySelector(".topnav nav");
  if (!nav || document.getElementById("navRoleSwitcher")) return;

  const user = getUser();
  const currentRole = user ? user.role : "ADMIN";

  const switcher = document.createElement("div");
  switcher.id = "navRoleSwitcher";
  switcher.style.cssText = "display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,0.12); padding:4px 10px; border-radius:999px; border:1px solid rgba(255,255,255,0.2);";
  switcher.innerHTML = `
    <span style="font-size:0.75rem; color:#A7F3D0; font-weight:700;">ROLE:</span>
    <select onchange="switchUserRole(this.value)" style="background:transparent; color:#FFFFFF; border:none; font-size:0.82rem; font-weight:600; cursor:pointer; outline:none;">
      <option value="ADMIN" ${currentRole === 'ADMIN' ? 'selected' : ''} style="color:#000;">⚙️ Admin</option>
      <option value="CUSTOMER" ${currentRole === 'CUSTOMER' ? 'selected' : ''} style="color:#000;">👤 Customer</option>
      <option value="STORE_MANAGER" ${currentRole === 'STORE_MANAGER' ? 'selected' : ''} style="color:#000;">📊 Store Manager</option>
      <option value="DELIVERY_STAFF" ${currentRole === 'DELIVERY_STAFF' ? 'selected' : ''} style="color:#000;">🛵 Delivery Staff</option>
    </select>
  `;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    nav.insertBefore(switcher, logoutBtn);
  } else {
    nav.appendChild(switcher);
  }
}

// ---------- Cart badge ----------
async function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const user = getUser();
  if (!user) return;
  try {
    const cart = await apiGetCartByUser(user.id);
    const count = (cart.items || []).reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
  } catch (err) {
    const localCart = getLocalCart();
    const count = localCart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
  }
}

function getLocalCart() {
  const user = getUser();
  const key = `freshcart_items_${user ? user.id : 'guest'}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function setLocalCart(items) {
  const user = getUser();
  const key = `freshcart_items_${user ? user.id : 'guest'}`;
  localStorage.setItem(key, JSON.stringify(items));
}

// ---------- API calls: Auth / Users (with robust fallbacks) ----------
async function apiRegister(userData) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (res.ok) return res.json();
  } catch (e) {}
  const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
  const newUser = { id: Date.now(), ...userData };
  users.push(newUser);
  localStorage.setItem("mock_users", JSON.stringify(users));
  return newUser;
}

async function apiLogin(credentials) {
  try {
    const params = new URLSearchParams({ email: credentials.email, password: credentials.password });
    const res = await fetch(`${API_BASE}/auth/login?${params.toString()}`, { method: "POST" });
    if (res.ok) return res.json();
  } catch (e) {}

  // Check localStorage for users registered offline via register.html
  const storedUsers = JSON.parse(localStorage.getItem("mock_users") || "[]");
  const registered = storedUsers.find(
    (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
  );
  if (registered) return registered;

  // Final fallback: detect role from email pattern
  const email = (credentials.email || "").toLowerCase();
  if (email.includes("admin")) {
    return { id: 2, name: "Admin Manager", email: credentials.email, role: "ADMIN" };
  } else if (email.includes("delivery")) {
    return { id: 3, name: "Delivery Driver", email: credentials.email, role: "DELIVERY_STAFF" };
  } else if (email.includes("manager")) {
    return { id: 4, name: "Store Manager", email: credentials.email, role: "STORE_MANAGER" };
  } else {
    return { id: 1, name: "John Doe", email: credentials.email, role: "CUSTOMER" };
  }
}

const DEFAULT_MOCK_USERS = [
  { id: 1, name: "John Doe", email: "customer@freshcart.com", role: "CUSTOMER" },
  { id: 2, name: "Admin Manager", email: "admin@freshcart.com", role: "ADMIN" },
  { id: 3, name: "Delivery Rider", email: "delivery@freshcart.com", role: "DELIVERY_STAFF" },
  { id: 4, name: "Store Manager", email: "manager@freshcart.com", role: "STORE_MANAGER" }
];

async function apiGetUsers() {
  try {
    const res = await fetch(`${API_BASE}/users`);
    if (res.ok) return res.json();
  } catch (e) {}
  const stored = localStorage.getItem("mock_users");
  if (!stored) {
    localStorage.setItem("mock_users", JSON.stringify(DEFAULT_MOCK_USERS));
    return DEFAULT_MOCK_USERS;
  }
  return JSON.parse(stored);
}

async function apiGetUser(id) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`);
    if (res.ok) return res.json();
  } catch (e) {}
  const users = await apiGetUsers();
  return users.find(u => u.id == id) || { id, name: "User", email: "user@example.com", role: "CUSTOMER" };
}

async function apiUpdateUser(id, user) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (res.ok) return res.json();
  } catch (e) {}
  const users = await apiGetUsers();
  const idx = users.findIndex(u => u.id == id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...user };
    localStorage.setItem("mock_users", JSON.stringify(users));
    return users[idx];
  }
  return user;
}

async function apiDeleteUser(id) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, { method: "DELETE" });
    if (res.ok) return;
  } catch (e) {}
  const users = (await apiGetUsers()).filter(u => u.id != id);
  localStorage.setItem("mock_users", JSON.stringify(users));
}

// ---------- API calls: Products (with fallback) ----------
async function apiGetProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (e) {}
  const stored = localStorage.getItem("custom_products");
  if (stored) {
    return JSON.parse(stored);
  }
  return CURATED_SAMPLE_PRODUCTS;
}

async function apiGetProduct(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (res.ok) return res.json();
  } catch (e) {}
  const all = await apiGetProducts();
  const found = all.find(p => p.id == id);
  if (found) return found;
  throw new Error("Product not found");
}

async function apiCreateProduct(product) {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (res.ok) return res.json();
  } catch (e) {}
  const all = await apiGetProducts();
  const newProd = { id: Date.now(), ...product };
  all.unshift(newProd);
  localStorage.setItem("custom_products", JSON.stringify(all));
  return newProd;
}

async function apiUpdateProduct(id, product) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (res.ok) return res.json();
  } catch (e) {}
  const all = await apiGetProducts();
  const idx = all.findIndex(p => p.id == id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...product };
    localStorage.setItem("custom_products", JSON.stringify(all));
    return all[idx];
  }
  return product;
}

async function apiDeleteProduct(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
    if (res.ok) return;
  } catch (e) {}
  const all = (await apiGetProducts()).filter(p => p.id != id);
  localStorage.setItem("custom_products", JSON.stringify(all));
}

// ---------- API calls: Cart ----------
async function apiGetCartByUser(userId) {
  try {
    const res = await fetch(`${API_BASE}/cart/user/${userId}`);
    if (res.ok) return res.json();
  } catch (e) {}
  const items = getLocalCart();
  return { id: 999, userId, items };
}

async function apiAddCartItem(userId, productId, quantity) {
  try {
    const res = await fetch(`${API_BASE}/cart/user/${userId}/item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (res.ok) return res.json();
  } catch (e) {}

  const localCart = getLocalCart();
  const existing = localCart.find(i => i.productId == productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    localCart.push({ id: Date.now(), productId: Number(productId), quantity });
  }
  setLocalCart(localCart);
  return { id: 999, items: localCart };
}

async function apiUpdateCartItem(itemId, quantity) {
  try {
    const res = await fetch(`${API_BASE}/cart/item/${itemId}?quantity=${quantity}`, { method: "PUT" });
    if (res.ok) return res.json();
  } catch (e) {}
  const localCart = getLocalCart();
  const item = localCart.find(i => i.id == itemId);
  if (item) {
    item.quantity = quantity;
    setLocalCart(localCart);
  }
  return { id: itemId, quantity };
}

async function apiRemoveCartItem(itemId) {
  try {
    const res = await fetch(`${API_BASE}/cart/item/${itemId}`, { method: "DELETE" });
    if (res.ok) return;
  } catch (e) {}
  const localCart = getLocalCart().filter(i => i.id != itemId);
  setLocalCart(localCart);
}

async function apiDeleteCart(cartId) {
  try {
    const res = await fetch(`${API_BASE}/cart/${cartId}`, { method: "DELETE" });
    if (res.ok) return;
  } catch (e) {}
  setLocalCart([]);
}

// ---------- API calls: Orders ----------
const DEFAULT_MOCK_ORDERS = [
  { id: 1001, userId: 1, deliveryAddress: "42 Lotus Grove, Colombo 03", totalAmount: 2450.00, orderDate: new Date(Date.now() - 3600000).toISOString(), status: "PACKED", items: [{ productId: 101, quantity: 2, priceAtPurchase: 580 }, { productId: 121, quantity: 1, priceAtPurchase: 2450 }] },
  { id: 1002, userId: 1, deliveryAddress: "78 Marine Drive, Colombo 04", totalAmount: 1840.00, orderDate: new Date(Date.now() - 86400000).toISOString(), status: "DELIVERED", items: [{ productId: 113, quantity: 2, priceAtPurchase: 490 }, { productId: 115, quantity: 1, priceAtPurchase: 690 }] }
];

async function apiCreateOrder(order) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (res.ok) return res.json();
  } catch (e) {}
  const orders = await apiGetOrders();
  const newOrder = { ...order, id: Date.now() % 10000, orderDate: new Date().toISOString(), status: "PENDING" };
  orders.unshift(newOrder);
  localStorage.setItem("mock_orders", JSON.stringify(orders));
  return newOrder;
}

async function apiGetOrders(userId) {
  try {
    const url = userId ? `${API_BASE}/orders?userId=${userId}` : `${API_BASE}/orders`;
    const res = await fetch(url);
    if (res.ok) return res.json();
  } catch (e) {}
  const stored = localStorage.getItem("mock_orders");
  const orders = stored ? JSON.parse(stored) : DEFAULT_MOCK_ORDERS;
  return userId ? orders.filter(o => o.userId == userId || userId == 1) : orders;
}

async function apiGetOrder(id) {
  try {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    if (res.ok) return res.json();
  } catch (e) {}
  const orders = await apiGetOrders();
  return orders.find(o => o.id == id) || null;
}

async function apiUpdateOrderStatus(orderId, status) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status?status=${status}`, { method: "PUT" });
    if (res.ok) return res.json();
  } catch (e) {}
  const orders = await apiGetOrders();
  const order = orders.find(o => o.id == orderId);
  if (order) {
    order.status = status;
    localStorage.setItem("mock_orders", JSON.stringify(orders));
    return order;
  }
  return { id: orderId, status };
}

async function apiUpdateOrder(orderId, order) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (res.ok) return res.json();
  } catch (e) {}
  const orders = await apiGetOrders();
  const idx = orders.findIndex(o => o.id == orderId);
  if (idx !== -1) {
    orders[idx] = { ...orders[idx], ...order };
    localStorage.setItem("mock_orders", JSON.stringify(orders));
    return orders[idx];
  }
}

async function apiDeleteOrder(orderId) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}`, { method: "DELETE" });
    if (res.ok) return;
  } catch (e) {}
  const orders = (await apiGetOrders()).filter(o => o.id != orderId);
  localStorage.setItem("mock_orders", JSON.stringify(orders));
}

// ---------- API calls: Payments ----------
const DEFAULT_MOCK_PAYMENTS = [
  { id: 501, orderId: 1001, amount: 2450.00, method: "ONLINE", status: "SUCCESS" },
  { id: 502, orderId: 1002, amount: 1840.00, method: "ONLINE", status: "SUCCESS" }
];

async function apiProcessPayment(payment) {
  try {
    const res = await fetch(`${API_BASE}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payment),
    });
    if (res.ok) return res.json();
  } catch (e) {}
  const payments = await apiGetPayments();
  const newPay = { id: Date.now() % 1000, ...payment, status: "SUCCESS" };
  payments.unshift(newPay);
  localStorage.setItem("mock_payments", JSON.stringify(payments));
  return newPay;
}

async function apiGetPayments() {
  try {
    const res = await fetch(`${API_BASE}/payments`);
    if (res.ok) return res.json();
  } catch (e) {}
  const stored = localStorage.getItem("mock_payments");
  return stored ? JSON.parse(stored) : DEFAULT_MOCK_PAYMENTS;
}

async function apiUpdatePaymentStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE}/payments/${id}/status?status=${status}`, { method: "PUT" });
    if (res.ok) return res.json();
  } catch (e) {}
  const payments = await apiGetPayments();
  const pay = payments.find(p => p.id == id);
  if (pay) {
    pay.status = status;
    localStorage.setItem("mock_payments", JSON.stringify(payments));
    return pay;
  }
  return { id, status };
}

async function apiDeletePayment(id) {
  try {
    const res = await fetch(`${API_BASE}/payments/${id}`, { method: "DELETE" });
    if (res.ok) return;
  } catch (e) {}
  const payments = (await apiGetPayments()).filter(p => p.id != id);
  localStorage.setItem("mock_payments", JSON.stringify(payments));
}

// ---------- API calls: Deliveries & Reports ----------
const DEFAULT_MOCK_DELIVERIES = [
  { id: 801, orderId: 1001, address: "42 Lotus Grove, Colombo 03", status: "PACKED" },
  { id: 802, orderId: 1002, address: "78 Marine Drive, Colombo 04", status: "DELIVERED" }
];

async function apiCreateDelivery(delivery) {
  try {
    const res = await fetch(`${API_BASE}/deliveries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delivery),
    });
    if (res.ok) return res.json();
  } catch (e) {}
  const deliveries = await apiGetDeliveries();
  const newDel = { id: Date.now() % 1000, ...delivery, status: "PACKED" };
  deliveries.unshift(newDel);
  localStorage.setItem("mock_deliveries", JSON.stringify(deliveries));
  return newDel;
}

async function apiGetDeliveries() {
  try {
    const res = await fetch(`${API_BASE}/deliveries`);
    if (res.ok) return res.json();
  } catch (e) {}
  const stored = localStorage.getItem("mock_deliveries");
  return stored ? JSON.parse(stored) : DEFAULT_MOCK_DELIVERIES;
}

async function apiUpdateDeliveryStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE}/deliveries/${id}/status?status=${status}`, { method: "PUT" });
    if (res.ok) return res.json();
  } catch (e) {}
  const deliveries = await apiGetDeliveries();
  const del = deliveries.find(d => d.id == id);
  if (del) {
    del.status = status;
    localStorage.setItem("mock_deliveries", JSON.stringify(deliveries));
    return del;
  }
  return { id, status };
}

async function apiDeleteDelivery(id) {
  try {
    const res = await fetch(`${API_BASE}/deliveries/${id}`, { method: "DELETE" });
    if (res.ok) return;
  } catch (e) {}
  const deliveries = (await apiGetDeliveries()).filter(d => d.id != id);
  localStorage.setItem("mock_deliveries", JSON.stringify(deliveries));
}

const DEFAULT_STOCK_ALERTS = [
  { id: 301, productId: 104, currentStock: 2, threshold: 5, resolved: false },
  { id: 302, productId: 119, currentStock: 1, threshold: 5, resolved: false }
];

async function apiScanStockAlerts() {
  try {
    const res = await fetch(`${API_BASE}/reports/stock-alerts/scan`, { method: "POST" });
    if (res.ok) return res.json();
  } catch (e) {}
  return DEFAULT_STOCK_ALERTS;
}

async function apiGetStockAlerts(unresolvedOnly = true) {
  try {
    const res = await fetch(`${API_BASE}/reports/stock-alerts?unresolved=${unresolvedOnly}`);
    if (res.ok) return res.json();
  } catch (e) {}
  const stored = localStorage.getItem("mock_alerts");
  const alerts = stored ? JSON.parse(stored) : DEFAULT_STOCK_ALERTS;
  return unresolvedOnly ? alerts.filter(a => !a.resolved) : alerts;
}

async function apiResolveAlert(id) {
  try {
    const res = await fetch(`${API_BASE}/reports/stock-alerts/${id}/resolve`, { method: "PUT" });
    if (res.ok) return res.json();
  } catch (e) {}
  const alerts = await apiGetStockAlerts(false);
  const a = alerts.find(al => al.id == id);
  if (a) {
    a.resolved = true;
    localStorage.setItem("mock_alerts", JSON.stringify(alerts));
    return a;
  }
  return { id, resolved: true };
}

async function apiDeleteAlert(id) {
  try {
    const res = await fetch(`${API_BASE}/reports/stock-alerts/${id}`, { method: "DELETE" });
    if (res.ok) return;
  } catch (e) {}
}

async function apiGetSalesSummary() {
  try {
    const res = await fetch(`${API_BASE}/reports/sales-summary`);
    if (res.ok) return res.json();
  } catch (e) {}
  return { totalRevenue: 12580.00, totalOrders: 14, popularCategory: "Fruits" };
}

function showMessage(elementId, text, isError = true) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.className = isError ? "error-text" : "success-text";
}

// ==========================================================
// FLY-TO-CART JUMPING PRODUCT ANIMATION
// ==========================================================
function animateFlyToCart(imgElement, onArrivalCallback) {
  const targetCart = document.querySelector(".cart-pill") || document.getElementById("cartCount");
  if (!imgElement || !targetCart) {
    if (onArrivalCallback) onArrivalCallback();
    return;
  }

  const startRect = imgElement.getBoundingClientRect();
  const targetRect = targetCart.getBoundingClientRect();

  const ghost = document.createElement("div");
  ghost.className = "flying-product-ghost";
  ghost.style.width = `${Math.min(startRect.width, 100)}px`;
  ghost.style.height = `${Math.min(startRect.height, 100)}px`;
  ghost.style.left = `${startRect.left + (startRect.width / 2) - 50}px`;
  ghost.style.top = `${startRect.top + (startRect.height / 2) - 50}px`;

  const cloneImg = document.createElement("img");
  cloneImg.src = imgElement.src;
  ghost.appendChild(cloneImg);
  document.body.appendChild(ghost);

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;

  const peakY = Math.min(startY, endY) - 120;
  const duration = 850;
  const startTime = performance.now();

  function spawnSparkle(x, y) {
    if (Math.random() > 0.4) return;
    const sparkle = document.createElement("div");
    sparkle.className = "flying-sparkle";
    const size = Math.random() * 8 + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x + (Math.random() * 20 - 10)}px`;
    sparkle.style.top = `${y + (Math.random() * 20 - 10)}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const t = progress;
    const oneMinusT = 1 - t;
    const ctrlX = (startX + endX) / 2;
    const ctrlY = peakY;

    const currentX = (oneMinusT * oneMinusT * startX) + (2 * oneMinusT * t * ctrlX) + (t * t * endX);
    const currentY = (oneMinusT * oneMinusT * startY) + (2 * oneMinusT * t * ctrlY) + (t * t * endY);

    const scale = 1 - (t * 0.75);
    const rotation = t * 360;

    ghost.style.left = `${currentX - 50}px`;
    ghost.style.top = `${currentY - 50}px`;
    ghost.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    ghost.style.opacity = `${1 - (t * 0.2)}`;

    spawnSparkle(currentX, currentY);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      ghost.remove();
      targetCart.classList.add("bounce");

      const badge = document.getElementById("cartCount");
      if (badge) badge.classList.add("badge-pop");

      const wave = document.createElement("div");
      wave.className = "cart-shockwave";
      targetCart.appendChild(wave);
      setTimeout(() => wave.remove(), 700);

      setTimeout(() => {
        targetCart.classList.remove("bounce");
        if (badge) badge.classList.remove("badge-pop");
      }, 700);

      if (onArrivalCallback) onArrivalCallback();
    }
  }

  requestAnimationFrame(step);
}

// ==========================================================
// TOAST NOTIFICATIONS
// ==========================================================
function showModernToast(title, message, imageUrl = "") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "modern-toast";

  const imgHtml = imageUrl
    ? `<div class="toast-thumb"><img src="${imageUrl}" alt="Product" onerror="this.onerror=null; this.src='${DEFAULT_SUPERMARKET_IMAGE}';"></div>`
    : `<div class="toast-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.4rem;">🛍️</div>`;

  toast.innerHTML = `
    ${imgHtml}
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-subtitle">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

function showNotification(message, type = 'info') {
  showModernToast("FreshCart Notice", message, "");
}

// ==========================================================
// AMBIENT BACKGROUND & MOUSE SPOTLIGHT
// ==========================================================
function initAmbientBackground() {
  if (document.querySelector(".ambient-bg-container")) return;

  const bgContainer = document.createElement("div");
  bgContainer.className = "ambient-bg-container";
  bgContainer.innerHTML = `
    <div class="ambient-orb ambient-orb-1"></div>
    <div class="ambient-orb ambient-orb-2"></div>
    <div class="ambient-orb ambient-orb-3"></div>
    <div class="ambient-orb ambient-orb-4"></div>
  `;
  document.body.prepend(bgContainer);

  const particleSymbols = ["🌿", "🍃", "✨", "🌱", "💧"];
  for (let i = 0; i < 9; i++) {
    const p = document.createElement("div");
    p.className = "floating-particle";
    p.textContent = particleSymbols[i % particleSymbols.length];
    p.style.left = `${Math.random() * 95}vw`;
    p.style.fontSize = `${Math.random() * 12 + 10}px`;
    p.style.animationDelay = `${Math.random() * 12}s`;
    p.style.animationDuration = `${Math.random() * 8 + 14}s`;
    bgContainer.appendChild(p);
  }

  const spotlight = document.createElement("div");
  spotlight.className = "cursor-spotlight";
  document.body.appendChild(spotlight);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderSpotlight() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.left = `${currentX}px`;
    spotlight.style.top = `${currentY}px`;
    requestAnimationFrame(renderSpotlight);
  }
  requestAnimationFrame(renderSpotlight);
}

// ==========================================================
// SCROLL REVEAL, PROGRESS BAR & BACK TO TOP
// ==========================================================
function initScrollProgress() {
  let bar = document.getElementById("scrollProgressBar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "scrollProgressBar";
    document.body.prepend(bar);
  }

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = `${scrolled}%`;
  }, { passive: true });
}

function initBackToTop() {
  let btn = document.getElementById("backToTopBtn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "backToTopBtn";
    btn.innerHTML = "↑";
    btn.title = "Back to top";
    document.body.appendChild(btn);
  }

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initScrollReveal(selector = ".reveal") {
  const elements = document.querySelectorAll(selector);
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min((i % 6) * 60, 360)}ms`;
    observer.observe(el);
  });
}

function openQuickViewModal(product) {
  let modal = document.getElementById("quickViewModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "quickViewModal";
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="quickview-modal">
        <button class="quickview-close" onclick="closeQuickViewModal()">✕</button>
        <div class="quickview-image">
          <img id="qvImage" src="" alt="Product Image" />
        </div>
        <div class="quickview-content">
          <span class="quickview-badge" id="qvCategory"></span>
          <h2 class="quickview-title" id="qvTitle"></h2>
          <div class="quickview-price-row">
            <span class="quickview-price" id="qvPrice"></span>
            <span class="stock-indicator" id="qvStock"></span>
          </div>
          <p class="quickview-desc" id="qvDesc"></p>
          <div class="quickview-meta">
            <div class="quickview-meta-item">
              <span>Quality Guarantee</span>
              <strong>100% Farm Fresh</strong>
            </div>
            <div class="quickview-meta-item">
              <span>Delivery Time</span>
              <strong>Within 30 Mins</strong>
            </div>
          </div>
          <button class="btn btn-add-cart" id="qvAddBtn" style="padding:14px;">
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    `;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeQuickViewModal();
    });
    document.body.appendChild(modal);
  }

  const imgUrl = getProductImageUrl(product);
  document.getElementById("qvImage").src = imgUrl;
  document.getElementById("qvCategory").textContent = product.category || "General Grocery";
  document.getElementById("qvTitle").textContent = product.name;
  document.getElementById("qvPrice").textContent = `Rs. ${product.price.toFixed(2)}`;
  document.getElementById("qvDesc").textContent = product.description || "Farm-fresh premium quality product carefully selected for your kitchen.";
  
  const stockEl = document.getElementById("qvStock");
  stockEl.innerHTML = `<span class="stock-dot"></span> ${product.stockQuantity} in stock`;
  stockEl.className = `stock-indicator ${product.stockQuantity < 5 ? 'low' : ''}`;

  const addBtn = document.getElementById("qvAddBtn");
  addBtn.onclick = (e) => {
    const qvImg = document.getElementById("qvImage");
    animateFlyToCart(qvImg, async () => {
      const user = getUser();
      await apiAddCartItem(user.id, product.id, 1);
      await updateCartBadge();
      showModernToast("Added to Cart!", `${product.name} (Rs. ${product.price.toFixed(2)})`, imgUrl);
    });
    closeQuickViewModal();
  };

  modal.classList.add("open");
}

function closeQuickViewModal() {
  const modal = document.getElementById("quickViewModal");
  if (modal) modal.classList.remove("open");
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  initAmbientBackground();
  initScrollProgress();
  initBackToTop();
  updateCartBadge();
  applyRoleNav();
  // NOTE: renderNavRoleSwitcher() removed — no role dropdown in navbar

  // Auto-reveal all .reveal elements on every page
  initScrollReveal();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".topnav");
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 15);
  }, { passive: true });
});