// Variáveis de Estado do Jogo
let rodadaAtual = 1;
const totalRodadas = 4;
let populacao = 50;
let economia = 50;
let reputacaoInternacional = 50;
let reputacaoMídia = 50;
let reputacaoLocal = 50;
let score = 0;
let perguntasUsadas = {
    "Cidadão 1": [],
    "Cidadão 2": [],
    "Mídia": [],
    "Economista": []
};
const personagens = ["Cidadão 1", "Cidadão 2", "Mídia", "Economista"];
let jogadores = [];
let presidentIndex = null;
let selectedQuestions = [];
let difficulty = 'medium';
let eventIntervalId = null;

// Elementos do DOM
const playerSelection = document.querySelector('.player-selection');
const startGameButton = document.getElementById('startGameButton');
const presidentSelection = document.querySelector('.president-selection');
const presidentDisplay = document.getElementById('presidentDisplay');
const gameArea = document.querySelector('.game-area');
const endGameArea = document.querySelector('.end-game');
const endMessage = document.getElementById('endMessage');
const restartButton = document.getElementById('restartButton');
const currentRoundSpan = document.getElementById('currentRound');
const currentPlayerSpan = document.getElementById('currentPlayer');
const questionList = document.getElementById('questionList');
const submitQuestionsButton = document.getElementById('submitQuestionsButton');
const decisionSection = document.getElementById('decisionSection');
const decisionsContainer = document.getElementById('decisionsContainer');

const populacaoBar = document.getElementById('populacao');
const economiaBar = document.getElementById('economia');
const reputacaoInternacionalBar = document.getElementById('reputacaoInternacional');
const reputacaoMídiaBar = document.getElementById('reputacaoMídia');
const reputacaoLocalBar = document.getElementById('reputacaoLocal');

const feedbackSection = document.getElementById('feedback');
const feedbackMessage = document.getElementById('feedbackMessage');
const popChange = document.getElementById('popChange');
const econChange = document.getElementById('econChange');
const repInternacionalChange = document.getElementById('repInternacionalChange');
const repMídiaChange = document.getElementById('repMídiaChange');
const repLocalChange = document.getElementById('repLocalChange');

const scoreDisplay = document.getElementById('score');

const historyList = document.getElementById('historyList');

const eventModal = document.getElementById('eventModal');
const closeEventModalButton = document.getElementById('closeEventModal');
const eventDescription = document.getElementById('eventDescription');
const eventAcceptButton = document.getElementById('eventAcceptButton');

const narrativeSection = document.getElementById('narrativeSection');
const narrativeText = document.getElementById('narrativeText');

const visualFeedback = document.getElementById('visualFeedback');
const impactChartCanvas = document.getElementById('impactChart');
const evolutionChartCanvas = document.getElementById('evolutionChart');
let impactChart = null;
let evolutionChart = null;

// Funções Principais

// Função para atribuir funções aos jogadores
function atribuirFuncoes(nomes) {
    const shuffled = nomes.sort(() => 0.5 - Math.random());
    const presidente = shuffled.pop(); // Presidente é o último
    const funcaoRestantes = shuffled.sort(() => 0.5 - Math.random());

    let atribuicoes = [];
    atribuicoes.push({ nome: presidente, personagem: "Presidente" });
    for (let i = 0; i < funcaoRestantes.length; i++) {
        atribuicoes.push({ nome: funcaoRestantes[i], personagem: personagens[i] });
    }
    return atribuicoes;
}

// Evento de Iniciar Jogo
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
    const presidente = jogadores[presidentIndex];

    playerSelection.style.display = 'none';
    presidentSelection.style.display = 'block';
    presidentDisplay.textContent = `${presidente.nome} (${presidente.personagem}) é o Presidente!`;

    setTimeout(() => {
        presidentSelection.style.display = 'none';
        gameArea.style.display = 'block';
        iniciarRodada();
        iniciarEventosAleatorios();
        iniciarGráficos();
    }, 3000);
});

// Evento de Reiniciar Jogo
restartButton.addEventListener('click', () => {
    // Resetar todas as variáveis de estado
    rodadaAtual = 1;
    populacao = 50;
    economia = 50;
    reputacaoInternacional = 50;
    reputacaoMídia = 50;
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

    // Resetar elementos do DOM
    historyList.innerHTML = '';
    scoreDisplay.textContent = score;
    popChange.textContent = "+0";
    econChange.textContent = "+0";
    repInternacionalChange.textContent = "+0";
    repMídiaChange.textContent = "+0";
    repLocalChange.textContent = "+0";

    endGameArea.classList.remove('end-estabilidade', 'end-heroe', 'end-impeachment');

    narrativeSection.style.display = 'none';
    narrativeText.innerHTML = '';
    visualFeedback.style.display = 'none';
    feedbackSection.style.display = 'none';
    decisionSection.style.display = 'none';
    questionList.innerHTML = '';

    playerSelection.style.display = 'block';
    gameArea.style.display = 'none';
    endGameArea.style.display = 'none';

    clearInterval(eventIntervalId);
    // clearTimeout(eventTimeoutId); // Removido porque eventTimeoutId não está definido

    // Resetar Gráficos
    if (impactChart) impactChart.destroy();
    if (evolutionChart) evolutionChart.destroy();
});

// Função para iniciar uma rodada
function iniciarRodada() {
    if (rodadaAtual > totalRodadas) {
        finalizarJogo();
        return;
    }

    // Mostrar a seção de perguntas e esconder a seção de decisões
    document.querySelector('.question-section').style.display = 'block';
    decisionSection.style.display = 'none';

    currentRoundSpan.textContent = rodadaAtual;
    selectedQuestions = [];
    selecionarPerguntas();
    atualizarTurno();
    atualizarNarrativa();
}

// Função para selecionar perguntas para cada jogador (exceto o Presidente)
function selecionarPerguntas() {
    // Limpar a lista de perguntas anteriores
    questionList.innerHTML = '';
    selectedQuestions = [];

    // Filtrar jogadores que não são o Presidente
    let nonPresidentPlayers = jogadores.filter((jogador, index) => index !== presidentIndex);

    // Exibir perguntas para cada jogador individualmente
    nonPresidentPlayers.forEach((jogador, index) => {
        gerarListaPerguntas(jogador);
    });
}

// Função para gerar lista de perguntas para um jogador específico
function gerarListaPerguntas(jogador) {
    const perguntasDisponiveis = perguntas[jogador.personagem].filter((_, index) => !perguntasUsadas[jogador.personagem].includes(index));

    if (perguntasDisponiveis.length < 3) {
        perguntasUsadas[jogador.personagem] = [];
        gerarListaPerguntas(jogador);
        return;
    }

    // Selecionar aleatoriamente 3 perguntas
    const selecionadas = [];
    while (selecionadas.length < 3) {
        const pergunta = perguntasDisponiveis[Math.floor(Math.random() * perguntasDisponiveis.length)];
        if (!selecionadas.includes(pergunta)) {
            selecionadas.push(pergunta);
        }
    }

    // Criar bloco de perguntas para o jogador
    const div = document.createElement('div');
    div.classList.add('question-item');

    const titulo = document.createElement('div');
    titulo.innerHTML = `<strong>${jogador.nome} (${jogador.personagem})</strong>`;
    div.appendChild(titulo);

    const radioButtons = document.createElement('div');
    radioButtons.style.display = 'flex';
    radioButtons.style.flexDirection = 'column';
    radioButtons.style.alignItems = 'flex-start';
    radioButtons.style.gap = '10px';

    const groupName = `pergunta-${jogador.nome.replace(/\s+/g, '')}-rodada-${rodadaAtual}`;

    selecionadas.forEach(pergunta => {
        const label = document.createElement('label');
        label.style.cursor = 'pointer';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = groupName;
        radio.value = pergunta.texto;
        radio.dataset.pergunta = JSON.stringify(pergunta.efeitos);
        radio.dataset.peso = pergunta.peso;

        radio.addEventListener('change', verificarSelecao);

        label.appendChild(radio);
        label.appendChild(document.createTextNode(pergunta.texto));

        radioButtons.appendChild(label);
    });

    div.appendChild(radioButtons);
    questionList.appendChild(div);
}

// Função para verificar se todas as perguntas foram selecionadas
function verificarSelecao() {
    const radioGroups = questionList.querySelectorAll('.question-item');
    let totalSelecionadas = 0;

    radioGroups.forEach(group => {
        const checked = group.querySelector('input[type="radio"]:checked');
        if (checked) totalSelecionadas++;
    });

    if (totalSelecionadas === (jogadores.length - 1)) {
        submitQuestionsButton.disabled = false;
    } else {
        submitQuestionsButton.disabled = true;
    }
}

// Evento de Confirmar Seleção de Perguntas
submitQuestionsButton.addEventListener('click', () => {
    const radioGroups = questionList.querySelectorAll('.question-item');

    selectedQuestions = []; // Resetar as perguntas selecionadas

    radioGroups.forEach(group => {
        const jogador = jogadores.find(j => `${j.nome} (${j.personagem})` === group.querySelector('strong').textContent);
        const checked = group.querySelector('input[type="radio"]:checked');
        if (checked) {
            const efeitos = JSON.parse(checked.dataset.pergunta);
            const peso = parseInt(checked.dataset.peso, 10);
            const perguntaTexto = checked.value;

            selectedQuestions.push({ jogador, texto: perguntaTexto, efeitos, peso });

            // Encontrar o índice da pergunta selecionada
            const perguntaIndex = perguntas[jogador.personagem].findIndex(p => p.texto === perguntaTexto);
            perguntasUsadas[jogador.personagem].push(perguntaIndex);

            // Atualizar histórico
            adicionarAoHistorico(jogador, perguntaTexto, "Selecionada");
        }
    });

    questionList.innerHTML = '';
    submitQuestionsButton.disabled = true;

    permitirDecisaoDoPresidente();
});

// Função para permitir decisões do Presidente
function permitirDecisaoDoPresidente() {
    decisionSection.style.display = 'block';
    document.querySelector('.question-section').style.display = 'none';

    selectedQuestions.forEach((pergunta, index) => {
        const decisionDiv = document.createElement('div');
        decisionDiv.classList.add('decisao-item');

        const perguntaTexto = document.createElement('p');
        perguntaTexto.textContent = `${index + 1}. ${pergunta.texto}`;
        decisionDiv.appendChild(perguntaTexto);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('decisao-buttons');

        const simButtonPergunta = document.createElement('button');
        simButtonPergunta.textContent = 'Sim';
        simButtonPergunta.classList.add('decisao-sim');
        simButtonPergunta.addEventListener('click', () => {
            aplicarEfeitos(pergunta.efeitos, pergunta.texto, "Sim", pergunta.peso);
            decisionDiv.remove();
            verificarDecisoes();
        });
        buttonsDiv.appendChild(simButtonPergunta);

        const naoButtonPergunta = document.createElement('button');
        naoButtonPergunta.textContent = 'Não';
        naoButtonPergunta.classList.add('decisao-no');
        naoButtonPergunta.addEventListener('click', () => {
            const efeitosNegados = getEfeitosNegadosPresidente(pergunta);
            aplicarEfeitos(efeitosNegados, pergunta.texto, "Não", pergunta.peso);
            decisionDiv.remove();
            verificarDecisoes();
        });
        buttonsDiv.appendChild(naoButtonPergunta);

        decisionDiv.appendChild(buttonsDiv);
        decisionsContainer.appendChild(decisionDiv);
    });
}

// Função para verificar se todas as decisões foram tomadas
function verificarDecisoes() {
    if (decisionsContainer.querySelectorAll('.decisao-item').length === 0) {
        rodadaAtual++;
        iniciarRodada();
    }
}

// Função para obter efeitos negados quando o Presidente escolhe "Não"
function getEfeitosNegadosPresidente(pergunta) {
    let efeitosNao = {};
    for (let chave in pergunta.efeitos) {
        // Aplicar apenas uma parte dos efeitos negativos
        efeitosNao[chave] = -Math.floor(pergunta.efeitos[chave] * 0.5);
    }
    return efeitosNao;
}

// Função para atualizar as barras de status
function atualizarBarras() {
    populacaoBar.value = populacao;
    economiaBar.value = economia;
    reputacaoInternacionalBar.value = reputacaoInternacional;
    reputacaoMídiaBar.value = reputacaoMídia;
    reputacaoLocalBar.value = reputacaoLocal;
}

// Função para atualizar a pontuação
function atualizarScore() {
    scoreDisplay.textContent = score;
}

// Função para aplicar os efeitos das decisões
function aplicarEfeitos(effects, perguntaTexto, resposta, peso) {
    const efeitosAplicados = {
        Populacao: effects.Populacao || 0,
        Economia: effects.Economia || 0,
        ReputacaoInternacional: effects.ReputacaoInternacional || 0,
        ReputacaoMídia: effects.ReputacaoMídia || 0,
        ReputacaoLocal: effects.ReputacaoLocal || 0
    };

    populacao += efeitosAplicados.Populacao;
    economia += efeitosAplicados.Economia;
    reputacaoInternacional += efeitosAplicados.ReputacaoInternacional;
    reputacaoMídia += efeitosAplicados.ReputacaoMídia;
    reputacaoLocal += efeitosAplicados.ReputacaoLocal;

    // Garantir que os valores estejam dentro dos limites
    populacao = Math.max(0, Math.min(100, populacao));
    economia = Math.max(0, Math.min(100, economia));
    reputacaoInternacional = Math.max(0, Math.min(100, reputacaoInternacional));
    reputacaoMídia = Math.max(0, Math.min(100, reputacaoMídia));
    reputacaoLocal = Math.max(0, Math.min(100, reputacaoLocal));

    atualizarBarras();
    atualizarPontuacao(efeitosAplicados, peso);
    mostrarFeedback(efeitosAplicados);
    atualizarHistorico(perguntaTexto, resposta, efeitosAplicados);
    atualizarGráficos(effects);
    verificarStatus();
}

// Função para atualizar a pontuação com base nos efeitos
function atualizarPontuacao(efeitos, peso) {
    let roundScore = 0;

    // Pontos positivos
    if (efeitos.Populacao > 0) roundScore += efeitos.Populacao * peso;
    if (efeitos.Economia > 0) roundScore += efeitos.Economia * peso;
    if (efeitos.ReputacaoInternacional > 0) roundScore += efeitos.ReputacaoInternacional * peso;
    if (efeitos.ReputacaoMídia > 0) roundScore += efeitos.ReputacaoMídia * peso;
    if (efeitos.ReputacaoLocal > 0) roundScore += efeitos.ReputacaoLocal * peso;

    // Pontos negativos
    if (efeitos.Populacao < 0) roundScore += efeitos.Populacao * peso;
    if (efeitos.Economia < 0) roundScore += efeitos.Economia * peso;
    if (efeitos.ReputacaoInternacional < 0) roundScore += efeitos.ReputacaoInternacional * peso;
    if (efeitos.ReputacaoMídia < 0) roundScore += efeitos.ReputacaoMídia * peso;
    if (efeitos.ReputacaoLocal < 0) roundScore += efeitos.ReputacaoLocal * peso;

    // Bônus por equilíbrio
    const balancePenalty = Math.abs(populacao - economia) + Math.abs(populacao - reputacaoInternacional) + Math.abs(populacao - reputacaoMídia) +
                            Math.abs(populacao - reputacaoLocal) + Math.abs(economia - reputacaoInternacional) + Math.abs(economia - reputacaoMídia) +
                            Math.abs(economia - reputacaoLocal) + Math.abs(reputacaoInternacional - reputacaoMídia) +
                            Math.abs(reputacaoInternacional - reputacaoLocal) + Math.abs(reputacaoMídia - reputacaoLocal);
    const maxBalancePenalty = 1000;
    const balanceBonus = Math.floor(((maxBalancePenalty - balancePenalty) / maxBalancePenalty) * 20);
    roundScore += balanceBonus;

    score += roundScore;
    atualizarScore();
}

// Função para mostrar feedback das decisões
function mostrarFeedback(effects) {
    let mensagem = "Decisão do Presidente impactou o governo de várias maneiras:";
    feedbackMessage.textContent = mensagem;

    popChange.textContent = `População: ${effects.Populacao >=0 ? '+' : ''}${effects.Populacao}`;
    econChange.textContent = `Economia: ${effects.Economia >=0 ? '+' : ''}${effects.Economia}`;
    repInternacionalChange.textContent = `Reputação Internacional: ${effects.ReputacaoInternacional >=0 ? '+' : ''}${effects.ReputacaoInternacional}`;
    repMídiaChange.textContent = `Reputação (Mídia): ${effects.ReputacaoMídia >=0 ? '+' : ''}${effects.ReputacaoMídia}`;
    repLocalChange.textContent = `Reputação Local: ${effects.ReputacaoLocal >=0 ? '+' : ''}${effects.ReputacaoLocal}`;

    popChange.classList.remove('positive', 'negative');
    econChange.classList.remove('positive', 'negative');
    repInternacionalChange.classList.remove('positive', 'negative');
    repMídiaChange.classList.remove('positive', 'negative');
    repLocalChange.classList.remove('positive', 'negative');

    popChange.classList.add(effects.Populacao >= 0 ? 'positive' : 'negative');
    econChange.classList.add(effects.Economia >= 0 ? 'positive' : 'negative');
    repInternacionalChange.classList.add(effects.ReputacaoInternacional >= 0 ? 'positive' : 'negative');
    repMídiaChange.classList.add(effects.ReputacaoMídia >= 0 ? 'positive' : 'negative');
    repLocalChange.classList.add(effects.ReputacaoLocal >= 0 ? 'positive' : 'negative');

    feedbackSection.style.display = 'block';
    feedbackSection.classList.add('fade-in');

    setTimeout(() => {
        feedbackSection.classList.remove('fade-in');
    }, 700);
}

// Função para adicionar itens ao histórico
function adicionarAoHistorico(jogador, pergunta, status) {
    const li = document.createElement('li');
    li.innerHTML = `<div class="decision">Pergunta de ${jogador.nome} (${jogador.personagem}): ${pergunta}</div>
                    <div class="impact">${status}</div>`;
    historyList.prepend(li);
}

// Função para atualizar o histórico com os impactos
function atualizarHistorico(pergunta, resposta, efeitos) {
    const firstItem = historyList.querySelector('li');
    if (firstItem) {
        const impactoClass = (efeitos.Populacao >=0 && efeitos.Economia >=0 && efeitos.ReputacaoInternacional >=0 && efeitos.ReputacaoMídia >=0 && efeitos.ReputacaoLocal >=0) ? 'positive' : 'negative';
        const impactoTexto = `Impactos: População ${efeitos.Populacao >=0 ? '+' : ''}${efeitos.Populacao}, Economia ${efeitos.Economia >=0 ? '+' : ''}${efeitos.Economia}, Reputação Internacional ${efeitos.ReputacaoInternacional >=0 ? '+' : ''}${efeitos.ReputacaoInternacional}, Reputação (Mídia) ${efeitos.ReputacaoMídia >=0 ? '+' : ''}${efeitos.ReputacaoMídia}, Reputação Local ${efeitos.ReputacaoLocal >=0 ? '+' : ''}${efeitos.ReputacaoLocal}`;
        firstItem.innerHTML += `<div class="impact ${impactoClass}">${impactoTexto}</div>`;
    }
}

// Função para iniciar os gráficos
function iniciarGráficos() {
    const impactCtx = impactChartCanvas.getContext('2d');
    impactChart = new Chart(impactCtx, {
        type: 'bar',
        data: {
            labels: ['População', 'Economia', 'Reputação Internacional', 'Reputação (Mídia)', 'Reputacao Local'],
            datasets: [{
                label: 'Impactos da Última Decisão',
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    '#e74c3c', // População - Vermelho
                    '#2ecc71', // Economia - Verde
                    '#3498db', // Reputação Internacional - Azul
                    '#f1c40f', // Reputação Mídia - Amarelo
                    '#9b59b6'  // Reputação Local - Roxo
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

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
                    label: 'Reputação Internacional',
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

// Função para atualizar os gráficos após decisões
function atualizarGráficos(effects) {
    // Atualizar Gráfico de Impacto
    impactChart.data.datasets[0].data = [
        effects.Populacao,
        effects.Economia,
        effects.ReputacaoInternacional,
        effects.ReputacaoMídia,
        effects.ReputacaoLocal
    ];
    impactChart.update();

    // Atualizar Gráfico de Evolução
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
                case 'Reputação Internacional':
                    dataset.data.push(reputacaoInternacional);
                    break;
                case 'Reputação (Mídia)':
                    dataset.data.push(reputacaoMídia);
                    break;
                case 'Reputação Local':
                    dataset.data.push(reputacaoLocal);
                    break;
            }
        });
        evolutionChart.update();
    }

    // Mostrar Gráficos após a primeira rodada
    if (rodadaAtual === 2) {
        document.querySelector('.impact-chart-section').style.display = 'block';
    }
}

// Função para finalizar o jogo
function finalizarJogo(impeach = false) {
    gameArea.style.display = 'none';
    feedbackSection.style.display = 'none';
    decisionSection.style.display = 'none';
    narrativeSection.style.display = 'none';
    visualFeedback.style.display = 'none';

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
        const maxValor = Math.max(populacao, economia, reputacaoInternacional, reputacaoMídia, reputacaoLocal);
        const resultados = [];
        if (populacao === maxValor) resultados.push("População no topo");
        if (economia === maxValor) resultados.push("Economia no topo");
        if (reputacaoInternacional === maxValor) resultados.push("Reputação Internacional no topo");
        if (reputacaoMídia === maxValor) resultados.push("Reputação (Mídia) no topo");
        if (reputacaoLocal === maxValor) resultados.push("Reputação Local no topo");

        let mensagem = "";
        let finalClass = "";
        let imagemFinal = "";

        if (resultados.length === 1) {
            switch (resultados[0]) {
                case "População no topo":
                    mensagem = "O presidente é reconhecido como um verdadeiro defensor do povo. A qualidade de vida melhorou significativamente, mas a economia está sob pressão e precisa de ajustes.";
                    imagemFinal = "heroe.png"; // Substitua com o caminho da imagem correspondente
                    finalClass = "end-heroe";
                    break;
                case "Economia no topo":
                    mensagem = "O presidente é celebrado por garantir uma economia forte e estável, atraindo investidores e promovendo o crescimento. No entanto, algumas desigualdades sociais ainda precisam ser resolvidas.";
                    imagemFinal = "estabilidade.png"; // Substitua com o caminho da imagem correspondente
                    finalClass = "end-estabilidade";
                    break;
                case "Reputação Internacional no topo":
                    mensagem = "As relações internacionais estão fortalecidas, elevando a reputação global do governo. No entanto, desafios internos ainda persistem.";
                    imagemFinal = "estabilidade.png"; // Substitua com o caminho da imagem correspondente
                    finalClass = "end-estabilidade";
                    break;
                case "Reputação (Mídia) no topo":
                    mensagem = "A transparência e a liberdade de imprensa estão no auge, tornando o governo muito popular entre jornalistas e a opinião pública. No entanto, o crescimento econômico e os serviços públicos sofrem com falta de recursos.";
                    imagemFinal = "estabilidade.png"; // Substitua com o caminho da imagem correspondente
                    finalClass = "end-estabilidade";
                    break;
                case "Reputação Local no topo":
                    mensagem = "A reputação local do governo está em alta, refletindo a aprovação das administrações municipais e regionais. Contudo, aspectos econômicos e de infraestrutura precisam de atenção.";
                    imagemFinal = "estabilidade.png"; // Substitua com o caminho da imagem correspondente
                    finalClass = "end-estabilidade";
                    break;
            }
        } else {
            mensagem = "O governo terminou seu mandato com um equilíbrio razoável entre População, Economia, Reputação Internacional, Reputação Mídia e Reputação Local, resultando em um <strong>Governo Estável</strong>.";
            imagemFinal = "estabilidade.png"; // Substitua com o caminho da imagem correspondente
            finalClass = "end-estabilidade";
        }

        if (Math.abs(populacao - economia) <= 10 && Math.abs(populacao - reputacaoInternacional) <= 10 &&
            Math.abs(populacao - reputacaoMídia) <= 10 && Math.abs(populacao - reputacaoLocal) <= 10 &&
            Math.abs(economia - reputacaoInternacional) <= 10 && Math.abs(economia - reputacaoMídia) <= 10 &&
            Math.abs(economia - reputacaoLocal) <= 10 && Math.abs(reputacaoInternacional - reputacaoMídia) <= 10 &&
            Math.abs(reputacaoInternacional - reputacaoLocal) <= 10 && Math.abs(reputacaoMídia - reputacaoLocal) <= 10) {
            mensagem = "O presidente conseguiu terminar seu mandato com todas as barras em equilíbrio, garantindo um <strong>Governo Estável</strong> e equilibrado. Não houve grandes conquistas, mas o país permaneceu em paz e sem crises.";
            imagemFinal = "estabilidade.png"; // Substitua com o caminho da imagem correspondente
            finalClass = "end-estabilidade";
        }

        endMessage.innerHTML = `<p>${mensagem}</p><p>Sua pontuação final foi: <strong>${score}</strong></p><img src="${imagemFinal}" alt="Final do Jogo" style="width: 200px; height: auto; margin-top: 20px;">`;
        endGameArea.classList.add(finalClass);
    }
}

// Função para atualizar o turno atual
function atualizarTurno() {
    const jogadorAtual = jogadores[presidentIndex];
    currentPlayerSpan.textContent = jogadorAtual.nome;
}

// Função para exibir eventos
function exibirEvento(evento) {
    eventDescription.textContent = evento.descricao;
    eventModal.style.display = 'block';

    eventAcceptButton.onclick = () => {
        aplicarEfeitos(evento.efeitos, `Evento: ${evento.descricao}`, "Aceitar", 2);
        eventModal.style.display = 'none';
    };
}

// Evento para fechar o modal de eventos
closeEventModalButton.addEventListener('click', () => {
    eventModal.style.display = 'none';
});

// Função para iniciar eventos aleatórios com base na dificuldade
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

// Função para verificar o status do jogo
function verificarStatus() {
    if (populacao <= 0 || economia <= 0 || reputacaoInternacional <= 0 || reputacaoMídia <= 0 || reputacaoLocal <= 0) {
        finalizarJogo(true);
    }
}

// Função para atualizar a narrativa
function atualizarNarrativa() {
    narrativeSection.style.display = 'block';
    narrativeText.innerHTML = `Iniciando a rodada ${rodadaAtual}. Prepare-se para as decisões que impactarão seu governo!`;
}

// Inicialização do script quando a página é carregada
window.addEventListener('load', () => {
    // Inicializar barras e pontuação
    atualizarBarras();
    atualizarScore();

    // Esconder seções que não devem ser visíveis inicialmente
    decisionSection.style.display = 'none';
    feedbackSection.style.display = 'none';
    visualFeedback.style.display = 'none';
    narrativeSection.style.display = 'none';
    document.querySelector('.impact-chart-section').style.display = 'none';
});
