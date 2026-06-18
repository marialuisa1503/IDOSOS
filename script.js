// Define o tamanho inicial da fonte (o mesmo definido no CSS)
let tamanhoFonteAtual = 22;

function mudarTamanhoTexto(modificador) {
    // Multiplica o modificador por 2 para aumentar ou diminuir de 2 em 2 pixels
    tamanhoFonteAtual = tamanhoFonteAtual + (modificador * 2);
    
    // Limita o tamanho da fonte para não ficar nem minúsculo, nem gigante demais
    if (tamanhoFonteAtual < 18) {
        tamanhoFonteAtual = 18;
    } else if (tamanhoFonteAtual > 34) {
        tamanhoFonteAtual = 34;
    }
    
    // Aplica o novo tamanho de fonte ao corpo inteiro da página (body)
    document.body.style.fontSize = tamanhoFonteAtual + "px";
}