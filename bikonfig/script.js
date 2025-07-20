/**
 * BIKONFIG - Funcionalidades Globais
 * @version 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== MENU MOBILE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 
                navToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
            navList.classList.toggle('active');
        });
    }

    // ===== DETECÇÃO DE PÁGINA ATIVA =====
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage || 
           (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // ===== CARREGAMENTO DE PRODUTOS DINÂMICO =====
    if (document.querySelector('.product-grid')) {
        fetchProducts();
    }

    // ===== GERENCIAMENTO DE CARRINHO =====
    if (document.querySelector('.add-to-cart')) {
        initCart();
    }
});

/**
 * Simula carregamento de produtos via API
 */
async function fetchProducts() {
    try {
        // Simulação de API
        const response = await fetch('https://api.example.com/products');
        const products = await response.json();
        
        const grid = document.querySelector('.product-grid');
        grid.innerHTML = products.map(product => `
            <div class="product-card" itemscope itemtype="http://schema.org/Product">
                <img src="${product.image}" alt="${product.name}" itemprop="image">
                <h3 itemprop="name">${product.name}</h3>
                <p class="price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                    <span itemprop="priceCurrency" content="BRL">R$</span>
                    <span itemprop="price">${product.price.toFixed(2)}</span>
                </p>
                <button class="button add-to-cart" data-id="${product.id}">Adicionar</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

/**
 * Inicializa funcionalidades do carrinho
 */
function initCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            cart.push(productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Feedback visual
            e.target.textContent = '✔ Adicionado';
            setTimeout(() => {
                e.target.textContent = 'Adicionar';
            }, 2000);
        });
    });
}