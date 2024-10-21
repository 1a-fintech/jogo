// Definição das perguntas para cada papel
const questions = {
    citizen1: [
        { text: "Você é a favor de aumentar os subsídios para pequenas famílias?", effects: { population: 10, economy: -5, reputation: 5 } },
        { text: "Você apoia a criação de novas áreas de lazer comunitárias?", effects: { population: 8, economy: -3, reputation: 2 } },
        { text: "Você é contra o aumento das tarifas públicas para energia?", effects: { population: 5, economy: -7, reputation: 3 } },
        { text: "Deve-se aumentar o investimento em educação pública?", effects: { population: 10, economy: -5, reputation: 4 } },
        { text: "Você aprova a construção de um novo hospital público na cidade?", effects: { population: 12, economy: -10, reputation: 5 } },
        { text: "Deve-se reduzir os impostos para pequenas empresas locais?", effects: { population: 5, economy: -8, reputation: 2 } },
        { text: "Você é a favor de aumentar as multas para empresas que poluem?", effects: { population: 7, economy: -5, reputation: 8 } },
        { text: "Você defende a criação de hortas comunitárias para melhorar a segurança alimentar?", effects: { population: 8, economy: -4, reputation: 5 } },
        { text: "Você é contra privatizar o sistema de água da cidade?", effects: { population: 6, economy: -6, reputation: 6 } },
        { text: "Você apoia a construção de ciclovias para aumentar a mobilidade urbana?", effects: { population: 7, economy: -5, reputation: 3 } },
        { text: "Você defende aumentar o salário dos professores?", effects: { population: 9, economy: -7, reputation: 4 } },
        { text: "Você é contra o corte de gastos no sistema de saúde?", effects: { population: 10, economy: -8, reputation: 7 } }
    ],
    citizen2: [
        { text: "Você apoia o aumento do salário mínimo?", effects: { population: 10, economy: -8, reputation: 6 } },
        { text: "Deve-se garantir assistência financeira a comunidades rurais?", effects: { population: 8, economy: -6, reputation: 4 } },
        { text: "Você é a favor da criação de centros culturais públicos?", effects: { population: 6, economy: -4, reputation: 5 } },
        { text: "Você é contra o corte de verbas de programas de alimentação escolar?", effects: { population: 9, economy: -5, reputation: 6 } },
        { text: "Deve-se incentivar práticas sustentáveis nas indústrias?", effects: { population: 7, economy: -4, reputation: 6 } },
        { text: "Você apoia a distribuição gratuita de medicamentos essenciais?", effects: { population: 11, economy: -9, reputation: 5 } },
        { text: "Você é contra a redução do horário de atendimento dos postos de saúde?", effects: { population: 8, economy: -6, reputation: 4 } },
        { text: "Você defende a ampliação do transporte público?", effects: { population: 9, economy: -7, reputation: 5 } },
        { text: "Você apoia o fortalecimento de programas de combate à fome?", effects: { population: 10, economy: -8, reputation: 7 } },
        { text: "Deve-se aumentar as taxas para produtos de luxo?", effects: { population: 4, economy: -3, reputation: 6 } },
        { text: "Você é contra cortes no financiamento de universidades?", effects: { population: 7, economy: -6, reputation: 5 } },
        { text: "Você apoia o acesso gratuito a água potável para comunidades vulneráveis?", effects: { population: 11, economy: -7, reputation: 6 } }
    ],
    media: [
        { text: "Você apoia o aumento da liberdade de imprensa?", effects: { population: 4, reputation: 10, economy: -3 } },
        { text: "Deve-se reduzir o controle estatal sobre a imprensa?", effects: { reputation: 8, economy: -2, population: 3 } },
        { text: "Você é a favor da transparência total nas ações do governo?", effects: { reputation: 10, economy: -4, population: 5 } },
        { text: "Você apoia a crítica aberta às decisões governamentais?", effects: { reputation: 6, economy: -3, population: 2 } },
        { text: "Deve-se permitir a imprensa acessar livremente documentos do governo?", effects: { reputation: 9, economy: -4, population: 4 } },
        { text: "Você é contra a censura de conteúdos políticos?", effects: { reputation: 7, population: 6, economy: -3 } },
        { text: "Você defende o financiamento estatal à mídia pública?", effects: { reputation: 5, economy: -5, population: 3 } },
        { text: "Você apoia campanhas de conscientização promovidas pela mídia?", effects: { reputation: 8, population: 4, economy: -3 } },
        { text: "Deve-se responsabilizar a imprensa por disseminação de fake news?", effects: { reputation: 10, population: 2, economy: -2 } },
        { text: "Você é a favor de fortalecer a segurança de jornalistas?", effects: { reputation: 9, population: 5, economy: -4 } },
        { text: "Você apoia campanhas de esclarecimento sobre políticas públicas?", effects: { reputation: 8, population: 3, economy: -3 } },
        { text: "Deve-se garantir espaço para opinião popular na mídia?", effects: { reputation: 7, population: 6, economy: -2 } }
    ],
    economist: [
        { text: "Você apoia o aumento de impostos para grandes corporações?", effects: { economy: 10, population: -5, reputation: 4 } },
        { text: "Deve-se incentivar a indústria local com subsídios?", effects: { economy: 7, population: 3, reputation: -4 } },
        { text: "Você é a favor da desoneração fiscal para pequenos negócios?", effects: { economy: 5, population: 6, reputation: -3 } },
        { text: "Deve-se aumentar as reservas financeiras do país?", effects: { economy: 8, population: -3, reputation: 2 } },
        { text: "Você apoia a criação de novos impostos sobre produtos de luxo?", effects: { economy: 6, population: 4, reputation: 3 } },
        { text: "Deve-se reduzir os gastos públicos com eventos sociais?", effects: { economy: 9, population: -6, reputation: -2 } },
        { text: "Você é contra aumentar os impostos sobre produtos básicos?", effects: { economy: -5, population: 8, reputation: 4 } },
        { text: "Você apoia a privatização de empresas estatais ineficientes?", effects: { economy: 10, population: -4, reputation: -3 } },
        { text: "Deve-se investir em infraestrutura para aumentar a produtividade?", effects: { economy: 8, population: 3, reputation: 2 } },
        { text: "Você é a favor de aumentar os salários dos trabalhadores públicos?", effects: { economy: -7, population: 10, reputation: 4 } },
        { text: "Você defende o corte de subsídios para setores que não geram retorno?", effects: { economy: 9, population: -6, reputation: 3 } },
        { text: "Deve-se criar incentivos fiscais para atrair investidores estrangeiros?", effects: { economy: 10, population: 2, reputation: -4 } }
    ]
};

// Variáveis de estado
let currentRound = 1;
const totalRounds = 4;
let selectedQuestions = [];
let decisions = [];
let status = {
    population: 50,
    economy: 50,
    reputation: 50
};

// Elementos do DOM
const populationBar = document.getElementById('population');
const economyBar = document.getElementById('economy');
const reputationBar = document.getElementById('reputation');
const questionsContainer = document.getElementById('questions-container');
const decisionButtons = document.getElementById('decision-buttons');
const endScreen = document.getElementById('end-screen');
const endImage = document.getElementById('end-image');
const endMessage = document.getElementById('end-message');

// Função para selecionar uma pergunta aleatória sem repetição
function getRandomQuestion(role) {
    const availableQuestions = questions[role];
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
}

// Função para iniciar uma rodada
function startRound() {
    questionsContainer.innerHTML = '';
    decisionButtons.innerHTML = '';

    // Selecionar uma pergunta para cada jogador (exceto o presidente)
    const roles = ['citizen1', 'citizen2', 'economist', 'media'];
    selectedQuestions = roles.map(role => getRandomQuestion(role));

    // Exibir as perguntas
    selectedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p><strong>${getRoleName(roles[index])}:</strong> ${q.text}</p>`;
        questionsContainer.appendChild(questionDiv);
    });

    // Criar botões de decisão para cada pergunta
    selectedQuestions.forEach((q, index) => {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('decision-buttons');

        const acceptBtn = document.createElement('button');
        acceptBtn.textContent = 'Sim';
        acceptBtn.classList.add('accept');
        acceptBtn.onclick = () => makeDecision(index, true);

        const rejectBtn = document.createElement('button');
        rejectBtn.textContent = 'Não';
        rejectBtn.classList.add('reject');
        rejectBtn.onclick = () => makeDecision(index, false);

        buttonDiv.appendChild(acceptBtn);
        buttonDiv.appendChild(rejectBtn);
        decisionButtons.appendChild(buttonDiv);
    });
}

// Função para obter o nome do papel
function getRoleName(role) {
    switch(role) {
        case 'citizen1':
            return 'Cidadão 1';
        case 'citizen2':
            return 'Cidadão 2';
        case 'economist':
            return 'Economista';
        case 'media':
            return 'Jornalista';
        default:
            return '';
    }
}

// Função para aplicar os efeitos das decisões
function makeDecision(questionIndex, isAccepted) {
    const q = selectedQuestions[questionIndex];
    if (isAccepted) {
        status.population += q.effects.population;
        status.economy += q.effects.economy;
        status.reputation += q.effects.reputation;
    } else {
        // Implementar lógica para rejeitar propostas, se necessário
        // Por enquanto, rejeitar não altera o status
    }

    // Atualizar as barras de status
    updateStatusBars();

    // Remover os botões após a decisão
    decisionButtons.children[questionIndex].remove();

    // Verificar se todas as decisões foram tomadas
    decisions.push(isAccepted);
    if (decisions.length === selectedQuestions.length) {
        // Resetar decisões para a próxima rodada
        decisions = [];
        currentRound++;
        if (currentRound > totalRounds) {
            endGame();
        } else {
            // Verificar se o jogo não foi encerrado por impeachment
            if (checkImpeachment()) {
                return;
            }
            // Iniciar a próxima rodada
            startRound();
        }
    }
}

// Função para atualizar as barras de status
function updateStatusBars() {
    populationBar.value = clamp(status.population);
    economyBar.value = clamp(status.economy);
    reputationBar.value = clamp(status.reputation);
}

// Função para garantir que os valores fiquem entre 0 e 100
function clamp(value) {
    return Math.max(0, Math.min(100, value));
}

// Função para verificar se houve impeachment
function checkImpeachment() {
    if (status.population <= 0 || status.economy <= 0 || status.reputation <= 0) {
        endGame(true);
        return true;
    }
    return false;
}

// Função para finalizar o jogo
function endGame(impeachment = false) {
    document.querySelector('.status-bars').style.display = 'none';
    document.querySelector('.question-area').style.display = 'none';
    endScreen.style.display = 'block';

    if (impeachment) {
        endImage.src = 'images/impeachment.png'; // Certifique-se de ter esta imagem
        endMessage.textContent = 'O presidente sofreu impeachment devido a uma crise!';
    } else {
        // Determinar o final com base nas barras de status
        const { population, economy, reputation } = status;
        if (population > 70 && economy > 70 && reputation > 70) {
            endImage.src = 'images/heroe.png'; // Certifique-se de ter esta imagem
            endMessage.textContent = 'O presidente é um herói nacional!';
        } else if (population < 30 || economy < 30 || reputation < 30) {
            endImage.src = 'images/impeachment.png'; // Certifique-se de ter esta imagem
            endMessage.textContent = 'O governo entrou em colapso e o presidente foi impeachado!';
        } else {
            endImage.src = 'images/estavel.png'; // Certifique-se de ter esta imagem
            endMessage.textContent = 'O governo terminou seu mandato de forma estável.';
        }
    }
}

// Inicialização do jogo
window.onload = () => {
    updateStatusBars();
    startRound();
};
