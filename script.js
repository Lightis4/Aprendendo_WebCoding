
"use strict";

// ======================================
// BOTÃO INTERATIVO
// ======================================

const btnMensagem = document.getElementById("btnMensagem");
const mensagem = document.getElementById("mensagem");

btnMensagem.addEventListener("click", function () {
    mensagem.textContent =
        "Muito bem! Você executou uma função JavaScript.";
    mensagem.style.color = "#198754";
});

// ======================================
// PERGUNTAS DO QUIZ
// ======================================

const perguntas = [
    {
        pergunta: "Qual é a principal função do HTML?",
        alternativas: [
            "Criar a estrutura da página",
            "Alterar as cores do site",
            "Armazenar dados em um banco",
            "Compilar programas"
        ],
        correta: 0
    },
    {
        pergunta: "Qual tecnologia define cores e fontes?",
        alternativas: [
            "HTML",
            "JavaScript",
            "CSS",
            "Git"
        ],
        correta: 2
    },
    {
        pergunta: "Para que serve o JavaScript?",
        alternativas: [
            "Instalar o sistema operacional",
            "Adicionar interatividade ao site",
            "Substituir o HTML",
            "Criar apenas imagens"
        ],
        correta: 1
    },
    {
        pergunta: "O que é Bootstrap?",
        alternativas: [
            "Um banco de dados",
            "Um compilador",
            "Um sistema operacional",
            "Um framework de interface"
        ],
        correta: 3
    },
    {
        pergunta: "Qual classe do Bootstrap cria um botão azul?",
        alternativas: [
            "text-center",
            "btn btn-primary",
            "container",
            "row"
        ],
        correta: 1
    }
];

// ======================================
// ELEMENTOS DO QUIZ
// ======================================

const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoProgresso = document.getElementById("progresso");
const elementoFeedback = document.getElementById("feedback");
const btnProxima = document.getElementById("btnProxima");

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;

// ======================================
// MOSTRAR PERGUNTA
// ======================================

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[perguntaAtual];

    elementoProgresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    elementoPergunta.textContent = atual.pergunta;

    elementoAlternativas.innerHTML = "";
    elementoFeedback.textContent = "";

    btnProxima.disabled = true;

    atual.alternativas.forEach(function (alternativa, indice) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "btn btn-outline-primary opcao-quiz";
        botao.textContent = alternativa;

        botao.addEventListener("click", function () {
            verificarResposta(indice);
        });

        elementoAlternativas.appendChild(botao);
    });
}

// ======================================
// VERIFICAR RESPOSTA
// ======================================

function verificarResposta(indiceEscolhido) {
    if (respondeu) {
        return;
    }

    respondeu = true;

    const correta = perguntas[perguntaAtual].correta;
    const botoes = elementoAlternativas.querySelectorAll("button");

    botoes.forEach(function (botao, indice) {
        botao.disabled = true;

        if (indice === correta) {
            botao.classList.add("opcao-correta");
        } else if (indice === indiceEscolhido) {
            botao.classList.add("opcao-errada");
        }
    });

    if (indiceEscolhido === correta) {
        pontuacao++;
        elementoFeedback.textContent = "Resposta correta!";
        elementoFeedback.style.color = "#198754";
    } else {
        elementoFeedback.textContent =
            "Resposta incorreta. A alternativa correta foi destacada.";
        elementoFeedback.style.color = "#dc3545";
    }

    btnProxima.disabled = false;

    if (perguntaAtual === perguntas.length - 1) {
        btnProxima.textContent = "Ver resultado";
    }
}

// ======================================
// PRÓXIMA PERGUNTA
// ======================================

btnProxima.addEventListener("click", function () {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// ======================================
// RESULTADO FINAL
// ======================================

function mostrarResultado() {
    elementoProgresso.textContent = "Quiz finalizado";

    elementoPergunta.textContent =
        `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

    elementoAlternativas.innerHTML = "";

    if (pontuacao === perguntas.length) {
        elementoFeedback.textContent =
            "Excelente! Você compreendeu todos os conceitos.";
    } else if (pontuacao >= 3) {
        elementoFeedback.textContent =
            "Muito bem! Continue praticando.";
    } else {
        elementoFeedback.textContent =
            "Continue estudando e tente novamente.";
    }

    elementoFeedback.style.color = "#202938";

    btnProxima.textContent = "Refazer quiz";
    btnProxima.disabled = false;

    btnProxima.onclick = function () {
        perguntaAtual = 0;
        pontuacao = 0;
        btnProxima.textContent = "Próxima pergunta";
        btnProxima.onclick = null;
        mostrarPergunta();
    };
}

// ======================================
// INICIAR QUIZ
// ======================================

mostrarPergunta();
