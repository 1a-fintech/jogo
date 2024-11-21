let rodadaAtual = 1;
const totalRodadas = 4;
let populacao = 50;
let economia = 50;
let reputacaoInternacional = 50;
let reputacaoMidia = 50;
let reputacaoLocal = 50;
let score = 0;
let perguntasUsadas = {
    "Cidadão 1": [],
    "Cidadão 2": [],
    "Mídia": [],
    "Economista": []
};
const personagens = ["Cidadão 1", "Cidadão 2", "Mídia", "Economista", "Presidente"];
let jogadores = [];
let presidentIndex = null;
let selectedQuestions = [];
let difficulty = 'medium';
let eventIntervalId = null;
let currentQuestionPlayerIndex = 0;

const playerSelection = document.querySelector('.player-selection');
const startGameButton = document.getElementById('startGameButton');
const roleAssignment = document.querySelector('.role-assignment');
const rolesDisplay = document.getElementById('rolesDisplay');
const proceedToGameButton = document.getElementById('proceedToGameButton');
const gameArea = document.querySelector('.game-area');
const endGameArea = document.querySelector('.end-game');
const endMessage = document.getElementById('endMessage');
const restartButton = document.getElementById('restartButton');
const currentRoundSpan = document.getElementById('currentRound');
const currentPlayerSpan = document.getElementById('currentPlayer');
const questionList = document.getElementById('questionList');
const decisionSection = document.getElementById('decisionSection');
const decisionsContainer = document.getElementById('decisionsContainer');

const populacaoBar = document.getElementById('populacao');
const economiaBar = document.getElementById('economia');
const reputacaoInternacionalBar = document.getElementById('reputacaoInternacional');
const reputacaoMidiaBar = document.getElementById('reputacaoMidia');
const reputacaoLocalBar = document.getElementById('reputacaoLocal');

const populacaoValue = document.getElementById('populacaoValue');
const economiaValue = document.getElementById('economiaValue');
const reputacaoInternacionalValue = document.getElementById('reputacaoInternacionalValue');
const reputacaoMidiaValue = document.getElementById('reputacaoMidiaValue');
const reputacaoLocalValue = document.getElementById('reputacaoLocalValue');

const feedbackSection = document.getElementById('feedback');
const feedbackMessage = document.getElementById('feedbackMessage');
const popChange = document.getElementById('popChange');
const econChange = document.getElementById('econChange');
const repInternacionalChange = document.getElementById('repInternacionalChange');
const repMidiaChange = document.getElementById('repMidiaChange');
const repLocalChange = document.getElementById('repLocalChange');

const scoreDisplay = document.getElementById('score');

const historyList = document.getElementById('historyList');
const eventHistoryList = document.getElementById('eventHistoryList');

const eventModal = document.getElementById('eventModal');
const closeEventModalButton = document.getElementById('closeEventModal');
const eventDescription = document.getElementById('eventDescription');
const eventAcceptButton = document.getElementById('eventAcceptButton');
const eventTitle = document.getElementById('eventTitle');

const visualFeedback = document.getElementById('visualFeedback');
const evolutionChartCanvas = document.getElementById('evolutionChart');
let evolutionChart = null;

function atribuirFuncoes(nomes) {
    const shuffled = nomes.sort(() => 0.5 - Math.random());
    const atribuicoes = [];
    for (let i = 0; i < shuffled.length; i++) {
        atribuicoes.push({ nome: shuffled[i], personagem: personagens[i] });
    }
    // Reordenar para que o presidente seja o primeiro
    atribuicoes.sort((a, b) => {
        if (a.personagem === "Presidente") return -1;
        if (b.personagem === "Presidente") return 1;
        return 0;
    });
    return atribuicoes;
}

startGameButton.addEventListener('click', () => {
    const playerNames = [];

    for (let i = 1; i <= 5; i++) {
        const nome = document.getElementById(`player${i}Name`).value.trim();
        if (nome === "") {
            alert("Por favor, insira os nomes para todos os jogadores.");
            return;
        }
        playerNames.push(nome);
    }

    const selectedDifficulty = document.getElementById('difficultyLevel').value;
    if (selectedDifficulty === "") {
        alert("Por favor, selecione a dificuldade do jogo.");
        return;
    }
    difficulty = selectedDifficulty;

    jogadores = atribuirFuncoes(playerNames);

    presidentIndex = jogadores.findIndex(jogador => jogador.personagem === "Presidente");

    playerSelection.style.display = 'none';
    roleAssignment.style.display = 'block';

    rolesDisplay.innerHTML = '';
    jogadores.forEach((jogador, index) => {
        const div = document.createElement('div');
        div.classList.add('role-item', 'hidden');
        div.classList.add(getRoleClass(jogador.personagem));
        div.style.setProperty('--role-color', getRoleColor(jogador.personagem));
        let iconHTML = '';
        switch (jogador.personagem) {
            case "Presidente":
                iconHTML = '<i class="fas fa-crown role-icon"></i>';
                break;
            case "Cidadão 1":
            case "Cidadão 2":
                iconHTML = '<i class="fas fa-user role-icon"></i>';
                break;
            case "Mídia":
                iconHTML = '<i class="fas fa-newspaper role-icon"></i>';
                break;
            case "Economista":
                iconHTML = '<i class="fas fa-chart-line role-icon"></i>';
                break;
        }
        div.innerHTML = `${iconHTML}<br><strong class="role-name">${jogador.personagem}</strong><br><span class="player-name">${jogador.nome}</span>`;
        const descricao = document.createElement('p');
        descricao.classList.add('role-description');
        descricao.textContent = getDescricaoFuncao(jogador.personagem);
        div.appendChild(descricao);

        rolesDisplay.appendChild(div);
    });

    const roleItems = document.querySelectorAll('.role-item');
    roleItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
            if (index === roleItems.length - 1) {
                proceedToGameButton.style.display = 'block';
            }
        }, index * 500);
    });
});

function getRoleClass(funcao) {
    switch (funcao) {
        case "Presidente":
            return "presidente";
        case "Cidadão 1":
            return "cidadao1";
        case "Cidadão 2":
            return "cidadao2";
        case "Mídia":
            return "midia";
        case "Economista":
            return "economista";
        default:
            return "";
    }
}

function getRoleColor(funcao) {
    switch (funcao) {
        case "Presidente":
            return "#FFD700"; // Dourado
        case "Cidadão 1":
            return "#1E90FF"; // Azul
        case "Cidadão 2":
            return "#32CD32"; // Verde
        case "Mídia":
            return "#FF4500"; // Laranja
        case "Economista":
            return "#8A2BE2"; // Roxo
        default:
            return "#E0E0E0"; // Cinza claro
    }
}

function getDescricaoFuncao(funcao) {
    switch (funcao) {
        case "Presidente":
            return "O Presidente toma as decisões finais que afetam o governo.";
        case "Cidadão 1":
        case "Cidadão 2":
            return "O Cidadão representa os interesses da população e propõe questões sociais.";
        case "Mídia":
            return "A Mídia influencia a opinião pública e questiona a transparência do governo.";
        case "Economista":
            return "O Economista foca em questões econômicas e financeiras do país.";
        default:
            return "";
    }
}

proceedToGameButton.addEventListener('click', () => {
    roleAssignment.style.display = 'none';
    gameArea.style.display = 'block';
    iniciarRodada();
    iniciarEventosAleatorios();
    iniciarGraficos();
});

function iniciarRodada() {
    if (rodadaAtual > totalRodadas) {
        finalizarJogo();
        return;
    }

    currentRoundSpan.textContent = rodadaAtual;
    selectedQuestions = [];
    currentQuestionPlayerIndex = 0;
    iniciarSelecaoDePerguntas();
    atualizarTurno();
}

function iniciarSelecaoDePerguntas() {
    questionList.innerHTML = '';
    decisionSection.style.display = 'none';
    document.querySelector('.question-section').style.display = 'block';

    if (currentQuestionPlayerIndex >= jogadores.length) {
        permitirDecisaoDoPresidente();
        return;
    }

    if (currentQuestionPlayerIndex === presidentIndex) {
        currentQuestionPlayerIndex++;
        iniciarSelecaoDePerguntas();
        return;
    }

    const jogador = jogadores[currentQuestionPlayerIndex];
    gerarListaPerguntas(jogador);
}

function gerarListaPerguntas(jogador) {
    questionList.innerHTML = '';
    const perguntasDisponiveis = perguntas[jogador.personagem].filter((_, index) => !perguntasUsadas[jogador.personagem].includes(index));

    if (perguntasDisponiveis.length < 3) {
        perguntasUsadas[jogador.personagem] = [];
        gerarListaPerguntas(jogador);
        return;
    }

    const selecionadas = [];
    while (selecionadas.length < 3) {
        const pergunta = perguntasDisponiveis[Math.floor(Math.random() * perguntasDisponiveis.length)];
        if (!selecionadas.includes(pergunta)) {
            selecionadas.push(pergunta);
        }
    }

    selecionadas.forEach(pergunta => {
        const card = document.createElement('div');
        card.classList.add('tarot-card');
        card.addEventListener('click', () => {
            if (card.classList.contains('selected')) return;
            card.classList.add('selected');
            selecionarPergunta(jogador, pergunta);
        });

        const cardContent = document.createElement('div');
        cardContent.classList.add('tarot-card-content');
        cardContent.textContent = pergunta.texto;

        card.appendChild(cardContent);
        questionList.appendChild(card);
    });

    currentPlayerSpan.innerHTML = `<span style="color: ${getRoleColor(jogador.personagem)};">${jogador.nome} (${jogador.personagem})</span>`;
}

function selecionarPergunta(jogador, pergunta) {
    selectedQuestions.push({ jogador, texto: pergunta.texto, efeitos: pergunta.efeitos, peso: pergunta.peso });

    const perguntaIndex = perguntas[jogador.personagem].findIndex(p => p.texto === pergunta.texto);
    perguntasUsadas[jogador.personagem].push(perguntaIndex);

    adicionarAoHistorico(jogador, pergunta.texto);

    currentQuestionPlayerIndex++;
    setTimeout(() => {
        iniciarSelecaoDePerguntas();
    }, 1000);
}

function permitirDecisaoDoPresidente() {
    decisionSection.style.display = 'block';
    document.querySelector('.question-section').style.display = 'none';

    decisionsContainer.innerHTML = '';

    const presidente = jogadores[presidentIndex];
    currentPlayerSpan.innerHTML = `<span style="color: ${getRoleColor(presidente.personagem)};">${presidente.nome} (${presidente.personagem})</span>`;

    processarDecisoes();
}

function processarDecisoes() {
    if (selectedQuestions.length === 0) {
        rodadaAtual++;
        iniciarRodada();
        return;
    }

    const pergunta = selectedQuestions.shift();

    const decisionDiv = document.createElement('div');
    decisionDiv.classList.add('decisao-item');
    decisionDiv.style.setProperty('--role-color', getRoleColor(pergunta.jogador.personagem));

    const questionHeader = document.createElement('div');
    questionHeader.classList.add('question-header');
    questionHeader.innerHTML = `<span>${pergunta.jogador.nome} (${pergunta.jogador.personagem})</span>`;
    decisionDiv.appendChild(questionHeader);

    const perguntaTexto = document.createElement('p');
    perguntaTexto.classList.add('question-text');
    perguntaTexto.textContent = `${pergunta.texto}`;
    decisionDiv.appendChild(perguntaTexto);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('decisao-buttons');

    const simButtonPergunta = document.createElement('button');
    simButtonPergunta.innerHTML = '<i class="fas fa-check"></i> Sim';
    simButtonPergunta.classList.add('decisao-sim');
    simButtonPergunta.addEventListener('click', () => {
        aplicarEfeitos(pergunta.efeitos, pergunta, "Sim", pergunta.peso);
        decisionDiv.remove();
        processarDecisoes();
    });
    buttonsDiv.appendChild(simButtonPergunta);

    const naoButtonPergunta = document.createElement('button');
    naoButtonPergunta.innerHTML = '<i class="fas fa-times"></i> Não';
    naoButtonPergunta.classList.add('decisao-no');
    naoButtonPergunta.addEventListener('click', () => {
        const efeitosNegados = getEfeitosNegadosPresidente(pergunta);
        aplicarEfeitos(efeitosNegados, pergunta, "Não", pergunta.peso);
        decisionDiv.remove();
        processarDecisoes();
    });
    buttonsDiv.appendChild(naoButtonPergunta);

    decisionDiv.appendChild(buttonsDiv);
    decisionsContainer.appendChild(decisionDiv);
}

function getEfeitosNegadosPresidente(pergunta) {
    let efeitosNao = {};
    for (let chave in pergunta.efeitos) {
        efeitosNao[chave] = -Math.floor(pergunta.efeitos[chave] * 0.5);
    }
    return efeitosNao;
}

function atualizarBarras() {
    populacaoBar.value = populacao;
    economiaBar.value = economia;
    reputacaoInternacionalBar.value = reputacaoInternacional;
    reputacaoMidiaBar.value = reputacaoMidia;
    reputacaoLocalBar.value = reputacaoLocal;

    populacaoValue.textContent = populacao;
    economiaValue.textContent = economia;
    reputacaoInternacionalValue.textContent = reputacaoInternacional;
    reputacaoMidiaValue.textContent = reputacaoMidia;
    reputacaoLocalValue.textContent = reputacaoLocal;
}

function atualizarScore() {
    scoreDisplay.textContent = score;
}

function aplicarEfeitos(effects, pergunta, resposta, peso) {
    const efeitosAplicados = {
        Populacao: effects.Populacao || 0,
        Economia: effects.Economia || 0,
        ReputacaoInternacional: effects.ReputacaoInternacional || 0,
        ReputacaoMidia: effects.ReputacaoMidia || 0,
        ReputacaoLocal: effects.ReputacaoLocal || 0
    };

    populacao += efeitosAplicados.Populacao;
    economia += efeitosAplicados.Economia;
    reputacaoInternacional += efeitosAplicados.ReputacaoInternacional;
    reputacaoMidia += efeitosAplicados.ReputacaoMidia;
    reputacaoLocal += efeitosAplicados.ReputacaoLocal;

    populacao = Math.max(0, Math.min(100, populacao));
    economia = Math.max(0, Math.min(100, economia));
    reputacaoInternacional = Math.max(0, Math.min(100, reputacaoInternacional));
    reputacaoMidia = Math.max(0, Math.min(100, reputacaoMidia));
    reputacaoLocal = Math.max(0, Math.min(100, reputacaoLocal));

    atualizarBarras();
    atualizarPontuacao(efeitosAplicados, peso);
    mostrarFeedback(efeitosAplicados);
    atualizarHistorico(pergunta, resposta, efeitosAplicados);
    atualizarGraficos(efeitosAplicados);
    verificarStatus();
}

function atualizarPontuacao(efeitos, peso) {
    let roundScore = 0;

    if (efeitos.Populacao > 0) roundScore += efeitos.Populacao * peso;
    if (efeitos.Economia > 0) roundScore += efeitos.Economia * peso;
    if (efeitos.ReputacaoInternacional > 0) roundScore += efeitos.ReputacaoInternacional * peso;
    if (efeitos.ReputacaoMidia > 0) roundScore += efeitos.ReputacaoMidia * peso;
    if (efeitos.ReputacaoLocal > 0) roundScore += efeitos.ReputacaoLocal * peso;

    if (efeitos.Populacao < 0) roundScore += efeitos.Populacao * peso;
    if (efeitos.Economia < 0) roundScore += efeitos.Economia * peso;
    if (efeitos.ReputacaoInternacional < 0) roundScore += efeitos.ReputacaoInternacional * peso;
    if (efeitos.ReputacaoMidia < 0) roundScore += efeitos.ReputacaoMidia * peso;
    if (efeitos.ReputacaoLocal < 0) roundScore += efeitos.ReputacaoLocal * peso;

    const balancePenalty = Math.abs(populacao - economia) + Math.abs(populacao - reputacaoInternacional) + Math.abs(populacao - reputacaoMidia) +
                            Math.abs(populacao - reputacaoLocal) + Math.abs(economia - reputacaoInternacional) + Math.abs(economia - reputacaoMidia) +
                            Math.abs(economia - reputacaoLocal) + Math.abs(reputacaoInternacional - reputacaoMidia) +
                            Math.abs(reputacaoInternacional - reputacaoLocal) + Math.abs(reputacaoMidia - reputacaoLocal);
    const maxBalancePenalty = 1000;
    const balanceBonus = Math.floor(((maxBalancePenalty - balancePenalty) / maxBalancePenalty) * 20);
    roundScore += balanceBonus;

    score += roundScore;
    atualizarScore();
}

function mostrarFeedback(effects) {
    let mensagem = "Decisão do Presidente impactou o governo de várias maneiras:";
    feedbackMessage.textContent = mensagem;

    popChange.textContent = `${effects.Populacao >=0 ? '+' : ''}${effects.Populacao}`;
    econChange.textContent = `${effects.Economia >=0 ? '+' : ''}${effects.Economia}`;
    repInternacionalChange.textContent = `${effects.ReputacaoInternacional >=0 ? '+' : ''}${effects.ReputacaoInternacional}`;
    repMidiaChange.textContent = `${effects.ReputacaoMidia >=0 ? '+' : ''}${effects.ReputacaoMidia}`;
    repLocalChange.textContent = `${effects.ReputacaoLocal >=0 ? '+' : ''}${effects.ReputacaoLocal}`;

    popChange.classList.remove('positive', 'negative');
    econChange.classList.remove('positive', 'negative');
    repInternacionalChange.classList.remove('positive', 'negative');
    repMidiaChange.classList.remove('positive', 'negative');
    repLocalChange.classList.remove('positive', 'negative');

    popChange.classList.add(effects.Populacao >= 0 ? 'positive' : 'negative');
    econChange.classList.add(effects.Economia >= 0 ? 'positive' : 'negative');
    repInternacionalChange.classList.add(effects.ReputacaoInternacional >= 0 ? 'positive' : 'negative');
    repMidiaChange.classList.add(effects.ReputacaoMidia >= 0 ? 'positive' : 'negative');
    repLocalChange.classList.add(effects.ReputacaoLocal >= 0 ? 'positive' : 'negative');

    feedbackSection.style.display = 'block';
}

function adicionarAoHistorico(jogador, pergunta) {
    const li = document.createElement('li');
    li.innerHTML = `<div class="decision">Pergunta de ${jogador.nome} (${jogador.personagem})</div>
                    <div class="question-text">${pergunta}</div>`;
    historyList.prepend(li);
}

function atualizarHistorico(pergunta, resposta, efeitos) {
    const items = historyList.querySelectorAll('li');
    for (let item of items) {
        if (item.textContent.includes(pergunta.texto)) {
            const impactoTexto = `
                População <span class="${efeitos.Populacao >= 0 ? 'positive' : 'negative'}">${efeitos.Populacao >=0 ? '+' : ''}${efeitos.Populacao}</span>, 
                Economia <span class="${efeitos.Economia >= 0 ? 'positive' : 'negative'}">${efeitos.Economia >=0 ? '+' : ''}${efeitos.Economia}</span>, 
                Internacional <span class="${efeitos.ReputacaoInternacional >= 0 ? 'positive' : 'negative'}">${efeitos.ReputacaoInternacional >=0 ? '+' : ''}${efeitos.ReputacaoInternacional}</span>, 
                Reputação (Mídia) <span class="${efeitos.ReputacaoMidia >= 0 ? 'positive' : 'negative'}">${efeitos.ReputacaoMidia >=0 ? '+' : ''}${efeitos.ReputacaoMidia}</span>, 
                Reputação Local <span class="${efeitos.ReputacaoLocal >= 0 ? 'positive' : 'negative'}">${efeitos.ReputacaoLocal >=0 ? '+' : ''}${efeitos.ReputacaoLocal}</span>`;
            item.innerHTML += `<div class="impact">${impactoTexto}</div>`;
            break;
        }
    }
}

function iniciarGraficos() {
    const evolutionCtx = evolutionChartCanvas.getContext('2d');
    evolutionChart = new Chart(evolutionCtx, {
        type: 'line',
        data: {
            labels: [`Rodada 1`],
            datasets: [
                {
                    label: 'População',
                    data: [50],
                    borderColor: '#e74c3c',
                    fill: false
                },
                {
                    label: 'Economia',
                    data: [50],
                    borderColor: '#2ecc71',
                    fill: false
                },
                {
                    label: 'Internacional',
                    data: [50],
                    borderColor: '#3498db',
                    fill: false
                },
                {
                    label: 'Reputação (Mídia)',
                    data: [50],
                    borderColor: '#f1c40f',
                    fill: false
                },
                {
                    label: 'Reputação Local',
                    data: [50],
                    borderColor: '#9b59b6',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function atualizarGraficos(effects) {
    if (rodadaAtual <= totalRodadas) {
        evolutionChart.data.labels.push(`Rodada ${rodadaAtual}`);
        evolutionChart.data.datasets.forEach(dataset => {
            switch(dataset.label) {
                case 'População':
                    dataset.data.push(populacao);
                    break;
                case 'Economia':
                    dataset.data.push(economia);
                    break;
                case 'Internacional':
                    dataset.data.push(reputacaoInternacional);
                    break;
                case 'Reputação (Mídia)':
                    dataset.data.push(reputacaoMidia);
                    break;
                case 'Reputação Local':
                    dataset.data.push(reputacaoLocal);
                    break;
            }
        });
        evolutionChart.update();
    }
}

function finalizarJogo(impeach = false) {
    gameArea.style.display = 'none';
    feedbackSection.style.display = 'none';
    decisionSection.style.display = 'none';

    eventModal.style.display = 'none';
    document.querySelector('.modal').style.display = 'none';
    document.body.style.overflow = 'auto';

    endGameArea.style.display = 'block';
    endGameArea.classList.remove('end-estabilidade', 'end-heroe', 'end-impeachment');

    if (impeach) {
        endMessage.innerHTML = `<p>O governo entrou em colapso! O presidente foi <strong>impeachado</strong>.</p>`;
        endGameArea.classList.add('end-impeachment');
        return;
    }

    if (rodadaAtual > totalRodadas) {
        const maxValor = Math.max(populacao, economia, reputacaoInternacional, reputacaoMidia, reputacaoLocal);
        const resultados = [];
        if (populacao === maxValor) resultados.push("População no topo");
        if (economia === maxValor) resultados.push("Economia no topo");
        if (reputacaoInternacional === maxValor) resultados.push("Internacional no topo");
        if (reputacaoMidia === maxValor) resultados.push("Reputação Mídia no topo");
        if (reputacaoLocal === maxValor) resultados.push("Reputação Local no topo");

        let mensagem = "";
        let finalClass = "";
        let imagemFinal = "";

        if (resultados.length === 1) {
            switch (resultados[0]) {
                case "População no topo":
                    mensagem = "O presidente é reconhecido como um verdadeiro defensor do povo. A qualidade de vida melhorou significativamente, mas a economia está sob pressão e precisa de ajustes.";
                    imagemFinal = "imagens/heroe.png";
                    finalClass = "end-heroe";
                    break;
                case "Economia no topo":
                    mensagem = "O presidente é celebrado por garantir uma economia forte e estável, atraindo investidores e promovendo o crescimento. No entanto, algumas desigualdades sociais ainda precisam ser resolvidas.";
                    imagemFinal = "imagens/estabilidade.png";
                    finalClass = "end-estabilidade";
                    break;
                case "Internacional no topo":
                    mensagem = "As relações internacionais estão fortalecidas, elevando a reputação global do governo. No entanto, desafios internos ainda persistem.";
                    imagemFinal = "imagens/estabilidade.png";
                    finalClass = "end-estabilidade";
                    break;
                case "Reputação Mídia no topo":
                    mensagem = "A transparência e a liberdade de imprensa estão no auge, tornando o governo muito popular entre jornalistas e a opinião pública. No entanto, o crescimento econômico e os serviços públicos sofrem com falta de recursos.";
                    imagemFinal = "imagens/estabilidade.png";
                    finalClass = "end-estabilidade";
                    break;
                case "Reputação Local no topo":
                    mensagem = "A reputação local do governo está em alta, refletindo a aprovação das administrações municipais e regionais. Contudo, aspectos econômicos e de infraestrutura precisam de atenção.";
                    imagemFinal = "imagens/estabilidade.png";
                    finalClass = "end-estabilidade";
                    break;
            }
        } else {
            mensagem = "O governo terminou seu mandato com um equilíbrio razoável entre População, Economia, Internacional, Reputação Mídia e Reputação Local, resultando em um <strong>Governo Estável</strong>.";
            imagemFinal = "imagens/estabilidade.png";
            finalClass = "end-estabilidade";
        }

        if (Math.abs(populacao - economia) <= 10 && Math.abs(populacao - reputacaoInternacional) <= 10 &&
            Math.abs(populacao - reputacaoMidia) <= 10 && Math.abs(populacao - reputacaoLocal) <= 10 &&
            Math.abs(economia - reputacaoInternacional) <= 10 && Math.abs(economia - reputacaoMidia) <= 10 &&
            Math.abs(economia - reputacaoLocal) <= 10 && Math.abs(reputacaoInternacional - reputacaoMidia) <= 10 &&
            Math.abs(reputacaoInternacional - reputacaoLocal) <= 10 && Math.abs(reputacaoMidia - reputacaoLocal) <= 10) {
            mensagem = "O presidente conseguiu terminar seu mandato com todas as barras em equilíbrio, garantindo um <strong>Governo Estável</strong> e equilibrado. Não houve grandes conquistas, mas o país permaneceu em paz e sem crises.";
            imagemFinal = "imagens/estabilidade.png";
            finalClass = "end-estabilidade";
        }

        endMessage.innerHTML = `<p>${mensagem}</p><p>Sua pontuação final foi: <strong>${score}</strong></p><img src="${imagemFinal}" alt="Final do Jogo" style="width: 200px; height: auto; margin-top: 20px;">`;
        endGameArea.classList.add(finalClass);
    }
}

function atualizarTurno() {
    const jogadorAtual = jogadores[currentQuestionPlayerIndex];
    currentPlayerSpan.innerHTML = `<span style="color: ${getRoleColor(jogadorAtual.personagem)};">${jogadorAtual.nome} (${jogadorAtual.personagem})</span>`;
}

function exibirEvento(evento) {
    eventDescription.textContent = evento.descricao;

    const impactoTotal = Object.values(evento.efeitos).reduce((acc, val) => acc + val, 0);

    if (impactoTotal >= 0) {
        eventAcceptButton.classList.remove('event-decline');
        eventAcceptButton.classList.add('event-accept');
        eventAcceptButton.textContent = "Aceitar";
        eventTitle.style.color = '#2ecc71';
    } else {
        eventAcceptButton.classList.remove('event-accept');
        eventAcceptButton.classList.add('event-decline');
        eventAcceptButton.textContent = "Aceitar";
        eventTitle.style.color = '#e74c3c';
    }

    eventModal.style.display = 'block';

    eventAcceptButton.onclick = () => {
        aplicarEfeitos(evento.efeitos, evento, "Aceitar", 2);
        eventModal.style.display = 'none';
        adicionarEventoAoHistorico(evento, evento.efeitos);
    };
}

closeEventModalButton.addEventListener('click', () => {
    eventModal.style.display = 'none';
});

function iniciarEventosAleatorios() {
    let eventoInterval;

    switch (difficulty) {
        case 'easy':
            eventoInterval = 90000; // 1.5 minutos
            break;
        case 'medium':
            eventoInterval = 60000; // 1 minuto
            break;
        case 'hard':
            eventoInterval = 30000; // 30 segundos
            break;
        default:
            eventoInterval = 60000;
    }

    eventIntervalId = setInterval(() => {
        const evento = eventos[Math.floor(Math.random() * eventos.length)];
        exibirEvento(evento);
    }, eventoInterval);
}

function verificarStatus() {
    if (populacao <= 0 || economia <= 0 || reputacaoInternacional <= 0 || reputacaoMidia <= 0 || reputacaoLocal <= 0) {
        finalizarJogo(true);
    }
}

function adicionarEventoAoHistorico(evento, efeitos) {
    const impactoTexto = `
        População <span class="${efeitos.Populacao >= 0 ? 'positive' : 'negative'}">${efeitos.Populacao >=0 ? '+' : ''}${efeitos.Populacao}</span>, 
        Economia <span class="${efeitos.Economia >= 0 ? 'positive' : 'negative'}">${efeitos.Economia >=0 ? '+' : ''}${efeitos.Economia}</span>, 
        Internacional <span class="${efeitos.ReputacaoInternacional >= 0 ? 'positive' : 'negative'}">${efeitos.ReputacaoInternacional >=0 ? '+' : ''}${efeitos.ReputacaoInternacional}</span>, 
        Reputação (Mídia) <span class="${efeitos.ReputacaoMidia >= 0 ? 'positive' : 'negative'}">${efeitos.ReputacaoMidia >=0 ? '+' : ''}${efeitos.ReputacaoMidia}</span>, 
        Reputação Local <span class="${efeitos.ReputacaoLocal >= 0 ? 'positive' : 'negative'}">${efeitos.ReputacaoLocal >=0 ? '+' : ''}${efeitos.ReputacaoLocal}</span>`;
    const li = document.createElement('li');
    li.innerHTML = `<div class="decision">${evento.descricao}</div><div class="impact">${impactoTexto}</div>`;
    eventHistoryList.prepend(li);
}

restartButton.addEventListener('click', () => {
    rodadaAtual = 1;
    populacao = 50;
    economia = 50;
    reputacaoInternacional = 50;
    reputacaoMidia = 50;
    reputacaoLocal = 50;
    score = 0;
    perguntasUsadas = {
        "Cidadão 1": [],
        "Cidadão 2": [],
        "Mídia": [],
        "Economista": []
    };
    jogadores = [];
    presidentIndex = null;
    selectedQuestions = [];
    difficulty = 'medium';

    historyList.innerHTML = '';
    eventHistoryList.innerHTML = '';
    scoreDisplay.textContent = score;
    popChange.textContent = "+0";
    econChange.textContent = "+0";
    repInternacionalChange.textContent = "+0";
    repMidiaChange.textContent = "+0";
    repLocalChange.textContent = "+0";

    endGameArea.classList.remove('end-estabilidade', 'end-heroe', 'end-impeachment');

    visualFeedback.style.display = 'none';
    feedbackSection.style.display = 'none';
    decisionSection.style.display = 'none';
    questionList.innerHTML = '';

    playerSelection.style.display = 'block';
    gameArea.style.display = 'none';
    endGameArea.style.display = 'none';

    clearInterval(eventIntervalId);

    if (evolutionChart) evolutionChart.destroy();
});

window.addEventListener('load', () => {
    atualizarBarras();
    atualizarScore();

    decisionSection.style.display = 'none';
    feedbackSection.style.display = 'none';
    visualFeedback.style.display = 'none';
});
