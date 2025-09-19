// Manipula abas de login/cadastro
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Alterna abas
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.classList.remove('d-none');
  registerForm.classList.add('d-none');
});

registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.classList.remove('d-none');
  loginForm.classList.add('d-none');
});

// Validação de senha (mínimo 8 caracteres, 1 letra maiúscula, 1 número)
function validarSenha(senha) {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(senha);
}

// Formulário de registro
registerForm.addEventListener('submit', e => {
  e.preventDefault();

  const user = document.getElementById('register-username');
  const pass = document.getElementById('register-password');
  const confirmPass = document.getElementById('register-confirm-password');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  // Limpa erros anteriores
  user.classList.remove('is-invalid');
  pass.classList.remove('is-invalid');
  confirmPass.classList.remove('is-invalid');

  // Verifica se usuário já existe
  if (usuarios[user.value]) {
    user.classList.add('is-invalid');
    alert('Usuário já cadastrado!');
    return;
  }

  // Valida senha
  if (!validarSenha(pass.value)) {
    pass.classList.add('is-invalid');
    alert('Senha inválida! Use pelo menos 8 caracteres, 1 letra maiúscula e 1 número.');
    return;
  }

  // Confirmação de senha
  if (pass.value !== confirmPass.value) {
    confirmPass.classList.add('is-invalid');
    alert('As senhas não conferem!');
    return;
  }

  // Salva usuário no localStorage
  usuarios[user.value] = pass.value;
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cadastro realizado com sucesso!');
  loginTab.click();
});

// Formulário de login
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const user = document.getElementById('login-username');
  const pass = document.getElementById('login-password');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  // Limpa erro anterior
  pass.classList.remove('is-invalid');

  if (usuarios[user.value] === pass.value) {
    localStorage.setItem('usuarioLogado', JSON.stringify({ nome: user.value }));
    window.location.href = 'produtos.html';
  } else {
    pass.classList.add('is-invalid');
    alert('Usuário ou senha incorretos!');
  }
});
