// Redireciona usuário não logado
document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split('/').pop();
    if (['produtos.html', 'cart.html'].includes(page)) {
      if (!localStorage.getItem('usuarioLogado')) {
        window.location.href = 'login.html';
      }
    }
  });
  