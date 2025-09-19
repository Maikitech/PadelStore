document.addEventListener("DOMContentLoaded", () => {
    // Seleciona elementos do navbar
    const usuarioLogadoSpan = document.getElementById("usuario-logado");
    const btnLogout = document.getElementById("btn-logout");
    const btnLogin = document.getElementById("btn-login");
    const btnCadastro = document.getElementById("btn-cadastro");

    // Pega usuário do localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuario && usuario.nome) {
        // Mostra navbar de usuário logado
        usuarioLogadoSpan.textContent = `Bem-vindo, ${usuario.nome}`;
        usuarioLogadoSpan.classList.remove("d-none");
        btnLogout.classList.remove("d-none");
        btnLogin.classList.add("d-none");
        btnCadastro.classList.add("d-none");

        // Logout
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.href = 'login.html';
        });
    } else {
        // Navbar para visitante
        usuarioLogadoSpan.classList.add("d-none");
        btnLogout.classList.add("d-none");
        btnLogin.classList.remove("d-none");
        btnCadastro.classList.remove("d-none");
    }
});
