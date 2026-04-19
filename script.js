// Page load position: prevents the browser from reopening halfway down the page after refresh.
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);
});

// Product data: every item in the catalog is defined here once.
// The page, search, filters, product rails, and cart all read from this array.
const products = [
    {
        name: "Backtake Rashguard",
        price: 68,
        originalPrice: 75,
        category: "nogi",
        collections: ["backtake"],
        images: [
            "images/backtake-rashguard.png"
        ]
    },
    {
        name: "Backtake Shorts",
        price: 68,
        originalPrice: 75,
        category: "shorts",
        collections: ["backtake"],
        images: [
            "images/backtake-shorts.png"
        ]
    },
    {
        name: "Black Shorts",
        price: 75,
        category: "shorts",
        images: [
            "images/black-shorts.png"
        ]
    },
    {
        name: "Bloodsport Rashguard",
        price: 75,
        category: "nogi",
        material: "Standard",
        collections: ["new", "bloodsport"],
        blendBackground: true,
        images: [
            "images/bloodsport-rashguard-front.png",
            "images/bloodsport-rashguard-back.png"
        ]
    },
    {
        name: "Bloodsport Shorts",
        price: 75,
        category: "shorts",
        material: "Standard",
        collections: ["new", "bloodsport"],
        blendBackground: true,
        images: [
            "images/bloodsport-shorts.png"
        ]
    },
    {
        name: "Bolo Hoodie",
        price: 58,
        originalPrice: 65,
        category: "apparel",
        images: [
            "images/bolo-hoodie.jpg"
        ]
    },
    {
        name: "Bolobear Rashguard",
        price: 75,
        category: "nogi",
        collections: ["new", "bolobear"],
        images: [
            "images/bolobear-rashguard.png"
        ]
    },
    {
        name: "Bolobear T-Shirt",
        price: 45,
        category: "apparel",
        collections: ["bolobear"],
        images: [
            "images/Bolobear-tshirt.png",
            "images/bolobear-tshirt-2.png"
        ]
    },
    {
        name: "Salmon T-Shirt",
        price: 40,
        category: "apparel",
        images: [
            "images/salmon-tshirt.png"
        ]
    },
    {
        name: "Fanny Pack",
        price: 26,
        originalPrice: 35,
        category: "apparel",
        images: [
            "images/fanny-pack.jpg"
        ]
    },
    {
        name: "Snapback Hat",
        price: 35,
        category: "apparel",
        images: [
            "images/snapback-hat.jpg"
        ]
    },
    {
        name: "Dad Hat",
        price: 35,
        category: "apparel",
        images: [
            "images/dad-hat.jpg"
        ]
    },
    {
        name: "Classic Black Rashguard",
        price: 75,
        category: "nogi",
        images: [
            "images/classic-black-rashguard.png"
        ]
    },
    {
        name: "Classic Blue Rashguard",
        price: 68,
        pricePrefix: "from ",
        category: "nogi",
        images: [
            "images/classic-blue-rashguard.png"
        ]
    },
    {
        name: "Classic Gold Rashguard",
        price: 75,
        category: "nogi",
        images: [
            "images/classic-gold-rashguard-front.png",
            "images/classic-gold-rashguard-back.png"
        ]
    },
    {
        name: "Classic Red Rashguard",
        price: 68,
        originalPrice: 75,
        category: "nogi",
        images: [
            "images/classic-red-rashguard.png"
        ]
    },
    {
        name: "Classic Red Shorts",
        price: 68,
        originalPrice: 75,
        category: "shorts",
        images: [
            "images/classic-red-shorts.png"
        ]
    },
    {
        name: "Colorblock Rashguard",
        price: 75,
        category: "nogi",
        images: [
            "images/colorblock-rashguard.png"
        ]
    },
    {
        name: "Colorblock Shorts",
        price: 75,
        category: "shorts",
        images: [
            "images/colorblock-shorts.png"
        ]
    },
    {
        name: "Gi Shorts",
        price: 75,
        category: "shorts",
        images: [
            "images/gi-shorts.png"
        ]
    },
    {
        name: "Green Shorts",
        price: 75,
        category: "shorts",
        images: [
            "images/green-shorts.png"
        ]
    },
    {
        name: "Longsleeve Black Rashguard",
        price: 75,
        category: "nogi",
        images: [
            "images/longsleeve-black-rashguard.png"
        ]
    },
    {
        name: "Salmon Rashguard",
        price: 75,
        category: "nogi",
        images: [
            "images/salmon-rashguard.png"
        ]
    },
    {
        name: "Salmon Shorts",
        price: 75,
        category: "shorts",
        images: [
            "images/salmon-shorts.png"
        ]
    },
    {
        name: "Scribble Rashguard",
        price: 75,
        category: "nogi",
        collections: ["new"],
        images: [
            "images/scribble-rashguard.png"
        ]
    },
    {
        name: "Scribble Shorts",
        price: 75,
        category: "shorts",
        collections: ["new"],
        images: [
            "images/scribble-shorts.png"
        ]
    },
    {
        name: "Shortys Rashguard",
        price: 75,
        category: "nogi",
        images: [
            "images/shortys-rashguard.png"
        ]
    }
];

// Shared lookup values: these keep repeated strings in one place.
const collectionFilters = ["new", "bloodsport", "backtake", "bolobear"];
const categoryLabels = {
    apparel: "Apparel",
    nogi: "Rashguard",
    shorts: "Shorts"
};

// DOM helpers: shorter names make the rest of the file easier to read.
const getElement = id => document.getElementById(id);
const selectAll = selector => document.querySelectorAll(selector);

// DOM references: these are the page elements JavaScript updates or listens to.
const productsContainer = getElement("products");
const filterSelect = getElement("filter");
const sortSelect = getElement("sort");
const searchForm = getElement("search-form");
const searchInput = getElement("search-input");
const filterLinks = selectAll("[data-filter-link]");
const shortsGuide = getElement("shorts-guide");
const noResults = getElement("no-results");
const imageModal = getElement("image-modal");
const modalImage = getElement("modal-image");
const modalClose = document.querySelector(".image-modal-close");
const rashguardsRail = getElement("rashguards-rail");
const shortsRail = getElement("shorts-rail");
const apparelRail = getElement("apparel-rail");
const cartToggle = getElement("cart-toggle");
const cartCount = getElement("cart-count");
const cartDrawer = getElement("cart-drawer");
const cartClose = getElement("cart-close");
const cartOverlay = getElement("cart-overlay");
const cartItems = getElement("cart-items");
const cartEmpty = getElement("cart-empty");
const cartTotal = getElement("cart-total");
const contactForm = getElement("contact-form");
const contactEmail = getElement("contact-email");
const contactTopic = getElement("contact-topic");
const contactMessage = getElement("contact-message");

// Page state: remembers the current catalog filter, search text, and cart contents.
let activeFilter = "all";
let searchQuery = "";
let cart = loadCart();

// Catalog display: clears the product grid, shows/hides "No products found",
// and inserts one card for each product in the supplied list.
function displayProducts(productList) {
    productsContainer.innerHTML = "";
    noResults.hidden = productList.length > 0;

    productList.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

// Catalog filtering/sorting: search overrides category filters while text is entered.
// When search is empty, the selected dropdown/category controls the product list.
function updateProducts() {
    let updated = [...products];

    const selectedCategory = activeFilter;
    const query = normalizeText(searchQuery);

    if (query) {
        updated = updated.filter(product => getProductSearchText(product).includes(query));
    } else {
        if (collectionFilters.includes(selectedCategory)) {
            updated = updated.filter(product => product.collections?.includes(selectedCategory));
        } else if (selectedCategory !== "all") {
            updated = updated.filter(product => product.category === selectedCategory);
        }
    }

    const selectedSort = sortSelect.value;

    if (selectedSort === "low") {
        updated.sort((a, b) => a.price - b.price);
    }

    if (selectedSort === "high") {
        updated.sort((a, b) => b.price - a.price);
    }

    shortsGuide.hidden = Boolean(query) || selectedCategory !== "shorts";

    displayProducts(updated);
}

// Product card builder: creates the same reusable card for rails and the main catalog.
function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const frontImage = product.images[0];
    const backImage = product.images[1] || product.images[0];
    const showHover = Boolean(backImage);
    const blendClass = product.blendBackground ? " product-img-blend" : "";

    productCard.innerHTML = `
        <div class="product-image">
            <img src="${frontImage}" alt="${product.name}" class="main-img zoomable-image${blendClass}" data-full-image="${frontImage}">
            ${showHover ? `<img src="${backImage}" alt="${product.name}" class="hover-img zoomable-image${blendClass}" data-full-image="${backImage}">` : ""}
        </div>

        <p class="product-category">${getCategoryLabel(product.category)}</p>
        <h3>${product.name}</h3>
        <p class="product-price">${getPriceMarkup(product)}</p>
        <button class="add-to-cart" type="button" data-product-name="${product.name}">Add to Cart</button>
    `;

    return productCard;
}

// Price display: sale items show a current price and a crossed-out original price.
function getPriceMarkup(product) {
    const currentPrice = `${product.pricePrefix || ""}$${product.price}`;

    if (!product.originalPrice) {
        return currentPrice;
    }

    return `<span class="sale-price">${currentPrice}</span> <span class="original-price">$${product.originalPrice}</span>`;
}

// Product rails: show a short preview row for each major category.
function renderProductRail(container, category, limit = 4) {
    const railProducts = products
        .filter(product => product.category === category)
        .slice(0, limit);

    container.innerHTML = "";

    railProducts.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

function renderProductRails() {
    renderProductRail(rashguardsRail, "nogi");
    renderProductRail(shortsRail, "shorts");
    renderProductRail(apparelRail, "apparel", 6);
}

// Search helpers: normalize text so "Bolo Bear", "bolo-bear", and "bolo bear" search similarly.
function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getProductSearchText(product) {
    const searchableValues = [
        product.name,
        product.category,
        getCategoryLabel(product.category),
        ...(product.collections || [])
    ];

    return normalizeText(searchableValues.join(" "));
}

function getCategoryLabel(category) {
    return categoryLabels[category] || category;
}

// Image modal: opens a large overlay version of any clicked product or guide image.
function openImageModal(src, alt) {
    modalImage.src = src;
    modalImage.alt = alt;
    imageModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeImageModal() {
    imageModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalImage.src = "";
    modalImage.alt = "";
}

// Cart helpers: update local cart state, persist it to the browser, and refresh the drawer.
function addToCart(productName) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, quantity: 1 });
    }

    saveCart();
    renderCart();
    openCart();
}

function updateCartQuantity(productName, change) {
    const item = cart.find(cartItem => cartItem.name === productName);

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.name !== productName);
    }

    saveCart();
    renderCart();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    renderCart();
}

function loadCart() {
    try {
        return JSON.parse(localStorage.getItem("boloCart") || "[]");
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem("boloCart", JSON.stringify(cart));
}

function renderCart() {
    cartItems.innerHTML = "";

    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => {
        const product = products.find(productItem => productItem.name === item.name);
        return product ? total + product.price * item.quantity : total;
    }, 0);

    cartCount.textContent = itemCount;
    cartEmpty.hidden = cart.length > 0;
    cartTotal.textContent = `$${subtotal}`;

    cart.forEach(item => {
        const product = products.find(productItem => productItem.name === item.name);

        if (!product) {
            return;
        }

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="cart-item-info">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
                <div class="cart-quantity">
                    <button type="button" data-cart-decrease="${product.name}">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" data-cart-increase="${product.name}">+</button>
                </div>
            </div>
            <button class="cart-remove" type="button" data-cart-remove="${product.name}">Remove</button>
        `;

        cartItems.appendChild(cartItem);
    });
}

// Cart drawer visibility: opens and closes the side panel.
function openCart() {
    cartDrawer.setAttribute("aria-hidden", "false");
    cartOverlay.hidden = false;
    document.body.classList.add("cart-open");
}

function closeCart() {
    cartDrawer.setAttribute("aria-hidden", "true");
    cartOverlay.hidden = true;
    document.body.classList.remove("cart-open");
}

// Filter and sort controls: update the main catalog whenever dropdowns change.
filterSelect.addEventListener("change", () => {
    activeFilter = filterSelect.value;
    updateProducts();
});
sortSelect.addEventListener("change", updateProducts);

// Search box: submitting jumps to the catalog, typing filters live.
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    document.getElementById("products-section").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    updateProducts();
});

// Category and collection links: set the dropdown, clear search, and filter the catalog.
filterLinks.forEach(link => {
    link.addEventListener("click", () => {
        activeFilter = link.dataset.filterLink;
        searchQuery = "";
        searchInput.value = "";

        if (filterSelect.querySelector(`option[value="${activeFilter}"]`)) {
            filterSelect.value = activeFilter;
        }

        updateProducts();
    });
});

// Page click handling: one delegated listener handles Add to Cart and image zoom clicks.
document.addEventListener("click", event => {
    const addButton = event.target.closest(".add-to-cart");

    if (addButton) {
        addToCart(addButton.dataset.productName);
        return;
    }

    const image = event.target.closest(".zoomable-image");

    if (!image) {
        return;
    }

    openImageModal(image.dataset.fullImage || image.src, image.alt);
});

// Cart event listeners: open/close drawer and update quantities/removals.
cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

cartItems.addEventListener("click", event => {
    const increaseButton = event.target.closest("[data-cart-increase]");
    const decreaseButton = event.target.closest("[data-cart-decrease]");
    const removeButton = event.target.closest("[data-cart-remove]");

    if (increaseButton) {
        updateCartQuantity(increaseButton.dataset.cartIncrease, 1);
    }

    if (decreaseButton) {
        updateCartQuantity(decreaseButton.dataset.cartDecrease, -1);
    }

    if (removeButton) {
        removeFromCart(removeButton.dataset.cartRemove);
    }
});

// Image modal close behavior.
modalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", event => {
    if (event.target === imageModal || event.target === modalImage) {
        closeImageModal();
    }
});

// Contact form: creates a mailto email with the visitor's reply address and message.
contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const subject = `Bolo Sport - ${contactTopic.value}`;
    const body = [
        `Customer email: ${contactEmail.value}`,
        `Topic: ${contactTopic.value}`,
        "",
        contactMessage.value
    ].join("\n");

    window.location.href = `mailto:info@bolosport.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Keyboard shortcuts: Escape closes whichever overlay is open.
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && imageModal.getAttribute("aria-hidden") === "false") {
        closeImageModal();
    }

    if (event.key === "Escape" && cartDrawer.getAttribute("aria-hidden") === "false") {
        closeCart();
    }
});

// Initial page load: render preview rails, main catalog, and any saved cart items.
renderProductRails();
updateProducts();
renderCart();
