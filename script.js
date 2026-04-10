// Renderizar produtos na página
function renderizarProdutos(containerId, produtosLista, limite = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const produtosParaExibir = limite ? produtosLista.slice(0, limite) : produtosLista;
    
    container.innerHTML = produtosParaExibir.map(produto => `
        <div class="product-card">
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-title">${produto.nome}</h3>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                ${produto.preco_original ? `<small style="text-decoration:line-through; color:#888">R$ ${produto.preco_original.toFixed(2)}</small>` : ''}
                <button class="btn-buy" data-link="${produto.link}">Comprar na Shopee →</button>
            </div>
        </div>
    `).join('');
    
    // Adicionar evento de clique para cada botão (link individual do produto)
    document.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', () => {
            const link = btn.getAttribute('data-link');
            window.open(link, '_blank');
        });
    });
}

// Busca de produtos
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const produtosFiltrados = produtos.filter(p => 
            p.nome.toLowerCase().includes(termo)
        );
        renderizarProdutos('allProductsGrid', produtosFiltrados);
    });
}

// Contador de ofertas
function initTimer() {
    const timerElement = document.getElementById('countdown');
    if (!timerElement) return;
    
    let tempoRestante = 23 * 3600 + 59 * 60 + 59;
    
    setInterval(() => {
        if (tempoRestante <= 0) {
            timerElement.textContent = "00:00:00";
            return;
        }
        tempoRestante--;
        const horas = Math.floor(tempoRestante / 3600);
        const minutos = Math.floor((tempoRestante % 3600) / 60);
        const segundos = tempoRestante % 60;
        timerElement.textContent = `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
    }, 1000);
}

// Formulário de contato
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome')?.value || '';
        const mensagem = document.getElementById('mensagem')?.value || '';
        
        if (nome && mensagem) {
            alert(`✅ Obrigado ${nome}! Sua mensagem foi enviada. Em breve responderei no WhatsApp!`);
            form.reset();
        } else {
            alert('⚠️ Por favor, preencha nome e mensagem.');
        }
    });
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Página inicial - produtos em destaque
    if (document.getElementById('featuredGrid')) {
        const destaque = produtos.filter(p => p.destaque === true);
        renderizarProdutos('featuredGrid', destaque, 4);
    }
    
    // Página de produtos - todos os produtos
    if (document.getElementById('allProductsGrid')) {
        renderizarProdutos('allProductsGrid', produtos);
        initSearch();
    }
    
    initTimer();
    initContactForm();
});
