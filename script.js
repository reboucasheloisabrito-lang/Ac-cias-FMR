const telaLogin = document.querySelector("#telaLogin");
const telaCadastro = document.querySelector("#telaCadastro");

const formLogin = document.querySelector("#formLogin");
const formCadastro = document.querySelector("#formCadastro");

const abrirCadastro = document.querySelector("#abrirCadastro");
const voltarLogin = document.querySelector("#voltarLogin");

const mensagemLogin = document.querySelector("#mensagemLogin");
const mensagemCadastro = document.querySelector("#mensagemCadastro");
const nascimento = document.querySelector("#nascimento");

function exibirMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = `mensagem ${tipo}`;
}

function mostrarCadastro() {
  if (window.innerWidth < 740) {
    telaLogin.classList.add("oculto");
    telaCadastro.classList.remove("oculto");
    document.querySelector("#nome").focus();
  }
}

function mostrarLogin() {
  if (window.innerWidth < 740) {
    telaCadastro.classList.add("oculto");
    telaLogin.classList.remove("oculto");
    document.querySelector("#loginEmail").focus();
  }
}

abrirCadastro.addEventListener("click", mostrarCadastro);
voltarLogin.addEventListener("click", mostrarLogin);

/* Máscara simples para a data: DD/MM/AAAA */
nascimento.addEventListener("input", function () {
  let numeros = nascimento.value.replace(/\D/g, "").slice(0, 8);

  if (numeros.length > 4) {
    numeros =
      numeros.slice(0, 2) +
      "/" +
      numeros.slice(2, 4) +
      "/" +
      numeros.slice(4);
  } else if (numeros.length > 2) {
    numeros = numeros.slice(0, 2) + "/" + numeros.slice(2);
  }

  nascimento.value = numeros;
});

formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const senha = document.querySelector("#senha").value;
  const confirmarSenha = document.querySelector("#confirmarSenha").value;

  if (senha !== confirmarSenha) {
    exibirMensagem(
      mensagemCadastro,
      "As senhas digitadas não são iguais.",
      "erro"
    );
    return;
  }

  const usuario = {
    nome,
    email,
    senha
  };

  localStorage.setItem("usuarioMiss", JSON.stringify(usuario));

  exibirMensagem(
    mensagemCadastro,
    "Cadastro realizado com sucesso!",
    "sucesso"
  );

  formCadastro.reset();

  setTimeout(() => {
    mostrarLogin();
    document.querySelector("#loginEmail").value = email;
  }, 1000);
});

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();
  const senha = document.querySelector("#loginSenha").value;

  const usuarioSalvo = JSON.parse(
    localStorage.getItem("usuarioMiss")
  );

  if (!usuarioSalvo) {
    exibirMensagem(
      mensagemLogin,
      "Você ainda não possui cadastro.",
      "erro"
    );
    mostrarCadastro();
    return;
  }

  if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
    exibirMensagem(
      mensagemLogin,
      `Bem-vinda, ${usuarioSalvo.nome}!`,
      "sucesso"
    );
    formLogin.reset();
  } else {
    exibirMensagem(
      mensagemLogin,
      "E-mail ou senha incorretos.",
      "erro"
    );
  }
});
