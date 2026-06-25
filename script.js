// Variaveis para selecionar os elementos da tela
const corpo = document.getElementById('corpo');
const botaoAumentar = document.getElementById('botao-aumentar');
const botaoDiminuir = document.getElementById('botao-diminuir');
const botaoContraste = document.getElementById('botao-contraste');

// Tamanho inicial da fonte em pixels
let tamanhoFonteAtual = 18;

// Funcao para aplicar o tamanho da fonte no corpo da pagina
function aplicarTamanhoFonte() {
    corpo.style.fontSize = tamanhoFonteAtual + 'px';
}

// Acao para aumentar o tamanho da letra
botaoAumentar.addEventListener('click', function() {
    if (tamanhoFonteAtual < 36) {
        tamanhoFonteAtual += 2;
        aplicarTamanhoFonte();
    }
});

// Acao para diminuir o tamanho da letra
botaoDiminuir.addEventListener('click', function() {
    if (tamanhoFonteAtual > 14) {
        tamanhoFonteAtual -= 2;
        aplicarTamanhoFonte();
    }
});

// Acao para ativar ou desativar o modo de alto contraste
botaoContraste.addEventListener('click', function() {
    corpo.classList.toggle('alto-contraste');
});