// Guarda o tamanho da letra atual em porcentagem
let escalaFonteAtual = 100;

// Aumenta o tamanho da letra
function funcaoAumentarFonte() {
  if (escalaFonteAtual < 150) {
    escalaFonteAtual += 10;
    document.body.style.fontSize = escalaFonteAtual + "%";
  }
}

// Diminui o tamanho da letra
function funcaoDiminuirFonte() {
  if (escalaFonteAtual > 90) {
    escalaFonteAtual -= 10;
    document.body.style.fontSize = escalaFonteAtual + "%";
  }
}

// Muda as cores para o modo de alto contraste
function funcaoAlternarContraste() {
  document.body.classList.toggle("alto-contraste");
}

// Informacoes dos golpes escritas em Portugues do Brasil (sem acentos)
const dadosDosGolpes = {
  'falso-banco': {
    titulo: "Golpe do Falso Funcionario",
    descricao: "Um criminoso liga fingindo ser do seu banco. Ele diz que a sua conta foi invadida e pede para voce transferir o dinheiro para uma conta segura ou entregar o seu cartao para um motoboy.",
    defesa: "Desligue na hora. Os bancos de verdade nunca mandam ninguem na sua casa para buscar cartoes, nunca pedem sua senha e nem pedem transferencias de seguranca.",
    alerta: "Atencao: Nunca passe seus dados de acesso nem entregue cartoes de pagamento."
  },
  'zap-clonado': {
    titulo: "Golpe do Falso Parente",
    descricao: "Os golpistas usam uma foto de um parente seu em um numero desconhecido. Eles mandam mensagem dizendo que o celular estragou e pedem um Pix urgente.",
    defesa: "Nao mande dinheiro. Tente ligar direto para o numero antigo do seu parente para confirmar a historia pela voz dele.",
    alerta: "Atencao: Sempre confirme a identidade da pessoa por ligacao de voz antes de fazer qualquer Pix."
  },
  'falso-premio': {
    titulo: "Golpe do Sorteio Falso",
    descricao: "Voce recebe um aviso de que ganhou um sorteio de grande valor. Mas, eles exigem que voce pague uma taxa ou imposto antes para liberar o dinheiro.",
    defesa: "Se voce nao entrou em nenhum sorteio, nao tem premio. Sorteios de verdade nao cobram taxas adiantadas para entregar premios.",
    alerta: "Atencao: Nunca pague valores adiantados para receber premios ou presentes."
  },
  'falsa-assinatura': {
    titulo: "Golpe da Confirmacao de Compra",
    descricao: "Chega um SMS avisando sobre uma compra de valor alto no seu cartao em uma loja famosa. Eles colocam um numero de telefone falso para voce ligar caso nao reconheca a compra.",
    defesa: "Nao ligue para o numero que veio na mensagem. Ligue para o atendimento que esta atras do seu cartao de verdade ou olhe no aplicativo oficial do banco no seu celular.",
    alerta: "Atencao: Nao ligue para os contatos que vem nessas mensagens suspeitas."
  }
};

// Abre a janela com as informacoes do golpe clicado
function funcaoAbrirGolpe(chaveGolpe) {
  const golpe = dadosDosGolpes[chaveGolpe];
  if (golpe) {
    document.getElementById("modal-titulo").innerText = golpe.titulo;
    
    let conteudoHtml = `
      <p><strong>O que e esta fraude:</strong></p>
      <p>${golpe.descricao}</p>
      <h4>Como agir para sua seguranca:</h4>
      <p>${golpe.defesa}</p>
      <div class="alerta-caixa">
        ${golpe.alerta}
      </div>
    `;
    
    document.getElementById("modal-corpo").innerHTML = conteudoHtml;
    document.getElementById("modal-alerta").style.display = "flex";
  }
}

// Fecha a janela de aviso
function funcaoFecharModal() {
  document.getElementById("modal-alerta").style.display = "none";
}

// Fecha a janela se clicar na parte escura de fora
function funcaoFecharModalFora(evento) {
  if (evento.target === document.getElementById("modal-alerta")) {
    funcaoFecharModal();
  }
}

// Diz se a resposta do idoso no joguinho foi certa ou errada
function funcaoVerificarResposta(respostaCorreta, tipoGolpe) {
  document.getElementById("modal-titulo").innerText = "Resultado do Teste";
  
  let conteudoHtml = "";
  if (respostaCorreta) {
    conteudoHtml = `
      <div class="resultado-simulado">
        <div class="resultado-simulado-titulo sucesso-texto">Parabens! Resposta Correta.</div>
        <p>Voce mostrou que sabe se proteger. Desligar e ligar por conta propria para o banco e a atitude mais segura.</p>
        <p>Lembre-se sempre: O seu banco nunca vai pedir sua senha nem mandar motoboy buscar seu cartao.</p>
      </div>
    `;
  } else {
    conteudoHtml = `
      <div class="resultado-simulado">
        <div class="resultado-simulado-titulo erro-texto">Alerta! Escolha Perigosa.</div>
        <p>Se voce fizesse isso, cairia no golpe e perderia seu dinheiro.</p>
        <p>Os golpistas falam muito bem e tentam deixar a gente nervoso para decidir com pressa.</p>
        <p><strong>Conselho de ouro:</strong> Nunca entregue nada e nem passe senhas pelo telefone para quem ligou para voce.</p>
      </div>
    `;
  }
  
  document.getElementById("modal-corpo").innerHTML = conteudoHtml;
  document.getElementById("modal-alerta").style.display = "flex";
}

// Variavel global para controlar se esta a ler ou nao
let lendoTela = false;

// Funcao para ler todo o texto da tela ou parar a leitura
function funcaoLerTela() {
  // Verifica se o navegador suporta a funcionalidade de voz
  if ('speechSynthesis' in window) {
    
    // Se ja estiver a ler, para a leitura
    if (lendoTela) {
      window.speechSynthesis.cancel();
      lendoTela = false;
      document.getElementById("botao-leitura").innerText = "Ler Tela (Desativado)";
      return;
    }

    // Pega todo o texto legivel da pagina (dentro da tag main para evitar ler os botoes do cabecalho)
    const conteudoPrincipal = document.querySelector('.conteudo-principal');
    let textoParaLer = conteudoPrincipal ? conteudoPrincipal.innerText : document.body.innerText;

    // Cria o objeto de fala
    const mensagem = new SpeechSynthesisUtterance(textoParaLer);
    
    // Configura para portugues do Brasil
    mensagem.lang = 'pt-BR'; 
    mensagem.rate = 0.9; // Velocidade um pouco mais lenta para facilitar a compreensao
    mensagem.pitch = 1; // Tom normal

    // Evento que dispara quando a leitura termina naturalmente
    mensagem.onend = function() {
      lendoTela = false;
      document.getElementById("botao-leitura").innerText = "Ler Tela";
    };

    // Inicia a leitura
    window.speechSynthesis.speak(mensagem);
    lendoTela = true;
    document.getElementById("botao-leitura").innerText = "Parar Leitura";
    
  } else {
    alert("Desculpe, o seu navegador nao suporta a leitura de tela em voz alta.");
  }
}