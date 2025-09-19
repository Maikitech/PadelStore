// Adiciona item ao carrinho no localStorage
function adicionarCarrinho(id) {
  // Pega carrinho existente ou cria vazio
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Adiciona item
  carrinho.push(id);

  // Salva novamente
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Atualiza badge
  atualizarContador();
}

// Atualiza badge do carrinho
function atualizarContador() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const count = carrinho.length;
  const badge = document.getElementById('cart-count');
  if (badge) {
      badge.textContent = count;
  }
}

// Limpa carrinho
function limparCarrinho() {
  localStorage.removeItem('carrinho');
  atualizarContador();
}

// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  atualizarContador();
});
