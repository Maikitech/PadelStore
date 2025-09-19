let produtos = [];

// Função que verifica se o usuário está logado
function usuarioLogado() {
  return !!localStorage.getItem('usuarioLogado'); // true se existe
}

// Carrega JSON e renderiza
fetch('data/produtos.json')
  .then(res => res.json())
  .then(data => {
    produtos = data;

    // Salva os produtos no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));

    renderizarProdutos(produtos);
  });

// Cria card do produto
function criarCard(prod) {
  const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  const notas = avaliacoes[prod.id] || [];
  const avg = notas.length > 0 ? (notas.reduce((a, b) => a + b, 0) / notas.length) : 0;

  return `
    <div class="col-md-3 product-card">
      <div class="card h-100">
        <img src="${prod.imagem}" class="card-img-top product-image" alt="${prod.nome}">
        <div class="card-body d-flex flex-column">
          <h5 class="product-title product-name">${prod.nome}</h5>
          <p class="mb-1 text-secondary">${prod.descricao}</p>
          <p class="fw-bold mb-2">R$ ${prod.preco.toFixed(2)}</p>

          <div class="rating mb-2" data-id="${prod.id}">
            ${[1,2,3,4,5].map(i => i <= avg 
                ? `<i class="fa-solid fa-star text-warning" data-value="${i}"></i>` 
                : `<i class="fa-regular fa-star text-warning" data-value="${i}"></i>`).join('')}
            <span class="average ms-2">${avg.toFixed(1)}</span>
          </div>

          <button class="btn btn-primary mt-auto add-cart-btn" data-id="${prod.id}">
            <i class="fas fa-cart-plus me-1"></i>Adicionar
          </button>
        </div>
      </div>
    </div>
  `;
}

// Renderiza lista de produtos
function renderizarProdutos(lista) {
  document.getElementById('product-list').innerHTML =
    lista.map(criarCard).join('');
  inicializarRating();
  inicializarCarrinho();
}

// Inicializa avaliação interativa
function inicializarRating() {
  document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('i');
    const average = rating.querySelector('.average');
    let currentRating = parseFloat(average.textContent);

    stars.forEach(star => {
      const val = parseInt(star.dataset.value);

      star.addEventListener('mouseover', () => highlightStars(stars, val));
      star.addEventListener('mouseout', () => highlightStars(stars, currentRating));

      star.addEventListener('click', () => {
        if (!usuarioLogado()) {
          alert('Faça login para avaliar o produto!');
          return;
        }

        const prodId = parseInt(rating.dataset.id);
        let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
        if (!avaliacoes[prodId]) avaliacoes[prodId] = [];

        avaliacoes[prodId].push(val);
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

        const notas = avaliacoes[prodId];
        currentRating = notas.reduce((a, b) => a + b, 0) / notas.length;
        average.textContent = currentRating.toFixed(1);

        highlightStars(stars, currentRating);
      });
    });
  });
}

function highlightStars(stars, rating) {
  stars.forEach(star => {
    if (parseInt(star.dataset.value) <= rating) {
      star.classList.add('fa-solid', 'filled');
      star.classList.remove('fa-regular');
    } else {
      star.classList.remove('fa-solid', 'filled');
      star.classList.add('fa-regular');
    }
  });
}

function inicializarCarrinho() {
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      if (!usuarioLogado()) {
        alert('Faça login para adicionar ao carrinho!');
        return;
      }

      adicionarCarrinho(id);
      alert(`Produto ${id} adicionado ao carrinho!`);
    });
  });
}
function inicializarLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.product-image').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove('d-none');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('d-none');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('d-none');
    }
  });
}

// Chame dentro de renderizarProdutos
function renderizarProdutos(lista) {
  document.getElementById('product-list').innerHTML =
    lista.map(criarCard).join('');
  inicializarRating();
  inicializarCarrinho();
  inicializarLightbox(); // <-- Adicionado aqui
}

// Função unificada de filtro
function filtrarProdutos() {
  const nome = document.getElementById('search-input').value.toLowerCase();
  const min = parseFloat(document.getElementById('min-price').value) || 0;
  const max = parseFloat(document.getElementById('max-price').value) || Infinity;

  const filtrado = produtos.filter(p =>
    p.nome.toLowerCase().includes(nome) &&
    p.preco >= min && p.preco <= max
  );

  renderizarProdutos(filtrado);
}

// Filtrar ao clicar no botão
document.getElementById('filter-btn').addEventListener('click', filtrarProdutos);

// Filtrar em tempo real e ao apertar Enter
['search-input', 'min-price', 'max-price'].forEach(id => {
  const input = document.getElementById(id);

  input.addEventListener('input', filtrarProdutos);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') filtrarProdutos();
  });
});
