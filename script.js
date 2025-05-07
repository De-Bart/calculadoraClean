const resultadoDisplay = document.getElementById('resultado');
const botoes = document.querySelectorAll('.botoes button');

let primeiroValor = null;
let operador = null;

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valorBotao = botao.textContent;
        console.log('O botão {valorBotao} foi clicado');

        if (!isNaN(parseFloat(valorBotao)) || valorBotao === '.') {
            // Se o botão for um número ou um ponto decimal
            if (resultadoDisplay.value === '0' || resultadoDisplay.value === null) {
                resultadoDisplay.value = valorBotao;
            } else {
                resultadoDisplay.value += valorBotao;
            }
        } else if (['+', '-', '*', '/'].includes(valorBotao)) {
            // Se o botão for um operador
            if (primeiroValor === null) {
                primeiroValor = parseFloat(resultadoDisplay.value);
                operador = valorBotao;
                resultadoDisplay.value = ''; // Limpa o display para o próximo número
            } else {
                // Se já houver um primeiro valor e um operador, calcula o resultado parcial
                const segundoValor = parseFloat(resultadoDisplay.value);
                const resultado = calcular(primeiroValor, operador, segundoValor);
                resultadoDisplay.value = resultado;
                primeiroValor = resultado;
                operador = valorBotao;
                resultadoDisplay.value = '';
            }
        } else if (valorBotao === '=') {
            // Se o botão for o igual
            if (primeiroValor !== null && operador !== null) {
                const segundoValor = parseFloat(resultadoDisplay.value);
                resultadoDisplay.value = calcular(primeiroValor, operador, segundoValor);
                primeiroValor = null;
                operador = null;
            }
        } else if (valorBotao === 'C') {
            // Se o botão for o "C" (limpar)
            resultadoDisplay.value = '0';
            primeiroValor = null;
            operador = null;
        }
    });
});

function calcular(num1, op, num2) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return 'Erro!';
            }
            return num1 / num2;
        default:
            return num2;
    }
}