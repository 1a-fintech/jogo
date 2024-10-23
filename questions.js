// Dados das Perguntas e Eventos (Completo)
const perguntas = { 
    "Cidadão 1": [
        { texto: "Você é a favor de aumentar os subsídios para pequenas famílias?", efeitos: { Populacao: 10, Economia: -5, ReputacaoMidia: 5, ReputacaoLocal: 3, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você apoia a criação de novas áreas de lazer comunitárias?", efeitos: { Populacao: 8, Economia: -3, ReputacaoMidia: 2, ReputacaoLocal: 4, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você é contra o aumento das tarifas públicas para energia?", efeitos: { Populacao: 5, Economia: -7, ReputacaoMidia: 3, ReputacaoLocal: -2, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Deve-se aumentar o investimento em educação pública?", efeitos: { Populacao: 10, Economia: -5, ReputacaoMidia: 4, ReputacaoLocal: 6, ReputacaoInternacional: 2 }, peso: 2 },
        { texto: "Você aprova a construção de um novo hospital público na cidade?", efeitos: { Populacao: 12, Economia: -10, ReputacaoMidia: 5, ReputacaoLocal: 7, ReputacaoInternacional: 0 }, peso: 3 },
        { texto: "Deve-se reduzir os impostos para pequenas empresas locais?", efeitos: { Populacao: 5, Economia: -8, ReputacaoMidia: 2, ReputacaoLocal: 2, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você é a favor de aumentar as multas para empresas que poluem?", efeitos: { Populacao: 7, Economia: -5, ReputacaoMidia: 8, ReputacaoLocal: 3, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Você defende a criação de hortas comunitárias para melhorar a segurança alimentar?", efeitos: { Populacao: 8, Economia: -4, ReputacaoMidia: 5, ReputacaoLocal: 4, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você é contra privatizar o sistema de água da cidade?", efeitos: { Populacao: 6, Economia: -6, ReputacaoMidia: 6, ReputacaoLocal: 5, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Você apoia a construção de ciclovias para aumentar a mobilidade urbana?", efeitos: { Populacao: 7, Economia: -5, ReputacaoMidia: 3, ReputacaoLocal: 3, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você defende aumentar o salário dos professores?", efeitos: { Populacao: 9, Economia: -7, ReputacaoMidia: 4, ReputacaoLocal: 6, ReputacaoInternacional: 1 }, peso: 2 },
        { texto: "Você é contra o corte de gastos no sistema de saúde?", efeitos: { Populacao: 10, Economia: -8, ReputacaoMidia: 7, ReputacaoLocal: 8, ReputacaoInternacional: 0 }, peso: 3 },
        { texto: "Você apoia a implementação de programas de reciclagem em toda a cidade?", efeitos: { Populacao: 6, Economia: -4, ReputacaoMidia: 5, ReputacaoLocal: 3, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Deve-se aumentar o investimento em transporte público sustentável?", efeitos: { Populacao: 7, Economia: -5, ReputacaoMidia: 6, ReputacaoLocal: 4, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você é a favor de oferecer bolsas de estudo para estudantes de baixa renda?", efeitos: { Populacao: 8, Economia: -6, ReputacaoMidia: 7, ReputacaoLocal: 4, ReputacaoInternacional: 0 }, peso: 2 }
    ],
    "Cidadão 2": [
        { texto: "Você apoia o aumento do salário mínimo?", efeitos: { Populacao: 10, Economia: -8, ReputacaoMidia: 6, ReputacaoLocal: 5, ReputacaoInternacional: 1 }, peso: 2 },
        { texto: "Deve-se garantir assistência financeira a comunidades rurais?", efeitos: { Populacao: 8, Economia: -6, ReputacaoMidia: 4, ReputacaoLocal: 5, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você é a favor da criação de centros culturais públicos?", efeitos: { Populacao: 6, Economia: -4, ReputacaoMidia: 5, ReputacaoLocal: 5, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você é contra o corte de verbas de programas de alimentação escolar?", efeitos: { Populacao: 9, Economia: -5, ReputacaoMidia: 6, ReputacaoLocal: 6, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Deve-se incentivar práticas sustentáveis nas indústrias?", efeitos: { Populacao: 7, Economia: -4, ReputacaoMidia: 6, ReputacaoLocal: 5, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você apoia a distribuição gratuita de medicamentos essenciais?", efeitos: { Populacao: 11, Economia: -9, ReputacaoMidia: 5, ReputacaoLocal: 7, ReputacaoInternacional: 0 }, peso: 3 },
        { texto: "Você é contra a redução do horário de atendimento dos postos de saúde?", efeitos: { Populacao: 8, Economia: -6, ReputacaoMidia: 4, ReputacaoLocal: 5, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você defende a ampliação do transporte público?", efeitos: { Populacao: 9, Economia: -7, ReputacaoMidia: 5, ReputacaoLocal: 6, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Você apoia o fortalecimento de programas de combate à fome?", efeitos: { Populacao: 10, Economia: -8, ReputacaoMidia: 7, ReputacaoLocal: 7, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Deve-se aumentar as taxas para produtos de luxo?", efeitos: { Populacao: 4, Economia: -3, ReputacaoMidia: 6, ReputacaoLocal: 2, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você é contra cortes no financiamento de universidades?", efeitos: { Populacao: 7, Economia: -6, ReputacaoMidia: 5, ReputacaoLocal: 5, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você apoia o acesso gratuito a água potável para comunidades vulneráveis?", efeitos: { Populacao: 11, Economia: -7, ReputacaoMidia: 6, ReputacaoLocal: 7, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Você é a favor de implementar programas de habitação social?", efeitos: { Populacao: 9, Economia: -5, ReputacaoMidia: 7, ReputacaoLocal: 6, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Deve-se aumentar o investimento em pesquisa e desenvolvimento?", efeitos: { Populacao: 5, Economia: -4, ReputacaoMidia: 6, ReputacaoLocal: 5, ReputacaoInternacional: 0 }, peso: 1 },
        { texto: "Você é a favor de estabelecer um salário mínimo regionalizado?", efeitos: { Populacao: 5, Economia: -3, ReputacaoMidia: 6, ReputacaoLocal: 2, ReputacaoInternacional: 1 }, peso: 2 }
    ],
    "Mídia": [
        { texto: "Você apoia o aumento da liberdade de imprensa?", efeitos: { Populacao: 4, Economia: -3, ReputacaoMidia: 10, ReputacaoLocal: 5, ReputacaoInternacional: 3 }, peso: 2 },
        { texto: "Deve-se reduzir o controle estatal sobre a imprensa?", efeitos: { Populacao: 3, Economia: -2, ReputacaoMidia: 8, ReputacaoLocal: 1, ReputacaoInternacional: 2 }, peso: 1 },
        { texto: "Você é a favor da transparência total nas ações do governo?", efeitos: { Populacao: 5, Economia: -4, ReputacaoMidia: 10, ReputacaoLocal: 6, ReputacaoInternacional: 4 }, peso: 2 },
        { texto: "Você apoia a crítica aberta às decisões governamentais?", efeitos: { Populacao: 2, Economia: -3, ReputacaoMidia: 6, ReputacaoLocal: 3, ReputacaoInternacional: 1 }, peso: 1 },
        { texto: "Deve-se permitir a imprensa acessar livremente documentos do governo?", efeitos: { Populacao: 4, Economia: -4, ReputacaoMidia: 9, ReputacaoLocal: 4, ReputacaoInternacional: 2 }, peso: 1 },
        { texto: "Você é a favor da censura de conteúdos políticos?", efeitos: { Populacao: 2, Economia: -2, ReputacaoMidia: 10, ReputacaoLocal: -1, ReputacaoInternacional: -2 }, peso: 2 },
        { texto: "Você defende o financiamento estatal à mídia pública?", efeitos: { Populacao: 3, Economia: -5, ReputacaoMidia: 5, ReputacaoLocal: 2, ReputacaoInternacional: 1 }, peso: 1 },
        { texto: "Você apoia campanhas de conscientização promovidas pela mídia?", efeitos: { Populacao: 4, Economia: -3, ReputacaoMidia: 8, ReputacaoLocal: 4, ReputacaoInternacional: 2 }, peso: 1 },
        { texto: "Deve-se responsabilizar a imprensa por disseminação de fake news?", efeitos: { Populacao: 2, Economia: -2, ReputacaoMidia: 10, ReputacaoLocal: 3, ReputacaoInternacional: 1 }, peso: 2 },
        { texto: "Você é a favor de fortalecer a segurança de jornalistas?", efeitos: { Populacao: 5, Economia: -4, ReputacaoMidia: 9, ReputacaoLocal: 4, ReputacaoInternacional: 2 }, peso: 1 },
        { texto: "Você apoia campanhas de esclarecimento sobre políticas públicas?", efeitos: { Populacao: 3, Economia: -3, ReputacaoMidia: 8, ReputacaoLocal: 3, ReputacaoInternacional: 1 }, peso: 1 },
        { texto: "Deve-se garantir espaço para opinião popular na mídia?", efeitos: { Populacao: 6, Economia: -2, ReputacaoMidia: 7, ReputacaoLocal: 5, ReputacaoInternacional: 2 }, peso: 1 },
        { texto: "Você apoia a criação de um conselho de ética para a mídia?", efeitos: { Populacao: 5, Economia: -3, ReputacaoMidia: 8, ReputacaoLocal: 4, ReputacaoInternacional: 1 }, peso: 1 },
        { texto: "Deve-se incentivar a diversidade na redação dos jornais?", efeitos: { Populacao: 4, Economia: -2, ReputacaoMidia: 7, ReputacaoLocal: 3, ReputacaoInternacional: 1 }, peso: 1 },
        { texto: "Você é a favor de programas de treinamento para jornalistas investigativos?", efeitos: { Populacao: 6, Economia: -3, ReputacaoMidia: 9, ReputacaoLocal: 4, ReputacaoInternacional: 2 }, peso: 2 }
    ],
    "Economista": [
        { texto: "Você apoia o aumento de impostos para grandes corporações?", efeitos: { Populacao: -5, Economia: 10, ReputacaoMidia: 4, ReputacaoLocal: 1, ReputacaoInternacional: 3 }, peso: 3 },
        { texto: "Deve-se incentivar a indústria local com subsídios?", efeitos: { Populacao: 3, Economia: 7, ReputacaoMidia: -4, ReputacaoLocal: 3, ReputacaoInternacional: 2 }, peso: 1 },
        { texto: "Você é a favor da desoneração fiscal para pequenos negócios?", efeitos: { Populacao: 6, Economia: 5, ReputacaoMidia: -3, ReputacaoLocal: 2, ReputacaoInternacional: 1 }, peso: 2 },
        { texto: "Deve-se aumentar as reservas financeiras do país?", efeitos: { Populacao: -3, Economia: 8, ReputacaoMidia: 2, ReputacaoLocal: 0, ReputacaoInternacional: 2 }, peso: 2 },
        { texto: "Você apoia a criação de novos impostos sobre produtos de luxo?", efeitos: { Populacao: 4, Economia: 6, ReputacaoMidia: 3, ReputacaoLocal: -2, ReputacaoInternacional: 1 }, peso: 1 },
        { texto: "Deve-se reduzir os gastos públicos com eventos sociais?", efeitos: { Populacao: -6, Economia: 9, ReputacaoMidia: -2, ReputacaoLocal: -1, ReputacaoInternacional: 0 }, peso: 3 },
        { texto: "Você é contra aumentar os impostos sobre produtos básicos?", efeitos: { Populacao: 8, Economia: -5, ReputacaoMidia: 4, ReputacaoLocal: -1, ReputacaoInternacional: 2 }, peso: 2 },
        { texto: "Você apoia a privatização de empresas estatais ineficientes?", efeitos: { Populacao: -4, Economia: 10, ReputacaoMidia: -3, ReputacaoLocal: -1, ReputacaoInternacional: 1 }, peso: 3 },
        { texto: "Deve-se investir em infraestrutura para aumentar a produtividade?", efeitos: { Populacao: 3, Economia: 8, ReputacaoMidia: 2, ReputacaoLocal: 1, ReputacaoInternacional: 2 }, peso: 2 },
        { texto: "Você é a favor de aumentar os salários dos trabalhadores públicos?", efeitos: { Populacao: 10, Economia: -7, ReputacaoMidia: 4, ReputacaoLocal: 2, ReputacaoInternacional: 1 }, peso: 3 },
        { texto: "Você defende o corte de subsídios para setores que não geram retorno?", efeitos: { Populacao: -6, Economia: 9, ReputacaoMidia: 3, ReputacaoLocal: -1, ReputacaoInternacional: 0 }, peso: 2 },
        { texto: "Deve-se criar incentivos fiscais para atrair investidores estrangeiros?", efeitos: { Populacao: 2, Economia: 10, ReputacaoMidia: -4, ReputacaoLocal: 0, ReputacaoInternacional: 3 }, peso: 1 },
        { texto: "Você apoia a implementação de uma taxa sobre transações financeiras?", efeitos: { Populacao: -2, Economia: 8, ReputacaoMidia: 5, ReputacaoLocal: -1, ReputacaoInternacional: 2 }, peso: 2 },
        { texto: "Deve-se aumentar o investimento em pesquisa e desenvolvimento?", efeitos: { Populacao: 3, Economia: 7, ReputacaoMidia: 4, ReputacaoLocal: 2, ReputacaoInternacional: 3 }, peso: 1 },
        { texto: "Você é a favor de estabelecer um salário mínimo regionalizado?", efeitos: { Populacao: 5, Economia: -3, ReputacaoMidia: 6, ReputacaoLocal: 2, ReputacaoInternacional: 1 }, peso: 2 }
    ]
};

const eventos = [
    {
        descricao: "Crise econômica inesperada! O PIB caiu 5% no último trimestre.",
        efeitos: { Populacao: -7, Economia: -10, ReputacaoMidia: -5, ReputacaoLocal: -3, ReputacaoInternacional: -2 },
        tempoParaDecidir: 10
    },
    {
        descricao: "Protestos generalizados por melhorias nos serviços públicos.",
        efeitos: { Populacao: -5, Economia: -3, ReputacaoMidia: -8, ReputacaoLocal: -5, ReputacaoInternacional: -3 },
        tempoParaDecidir: 15
    },
    {
        descricao: "Descoberta de corrupção em uma grande corporação estatal.",
        efeitos: { Populacao: -6, Economia: -5, ReputacaoMidia: -10, ReputacaoLocal: -7, ReputacaoInternacional: -4 },
        tempoParaDecidir: 12
    },
    {
        descricao: "Avanços tecnológicos aumentam a produtividade nacional.",
        efeitos: { Populacao: 5, Economia: 10, ReputacaoMidia: 7, ReputacaoLocal: 5, ReputacaoInternacional: 3 },
        tempoParaDecidir: 8
    },
    {
        descricao: "Desastres naturais causam danos significativos à infraestrutura.",
        efeitos: { Populacao: -10, Economia: -8, ReputacaoMidia: -6, ReputacaoLocal: -4, ReputacaoInternacional: -5 },
        tempoParaDecidir: 20
    },
    // Eventos Adicionais
    {
        descricao: "Aumento nas taxas de desemprego devido à crise econômica.",
        efeitos: { Populacao: -8, Economia: -7, ReputacaoMidia: -6, ReputacaoLocal: -5, ReputacaoInternacional: -4 },
        tempoParaDecidir: 18
    },
    {
        descricao: "Implementação de novas leis ambientais que restringem indústrias.",
        efeitos: { Populacao: -4, Economia: -6, ReputacaoMidia: 5, ReputacaoLocal: 6, ReputacaoInternacional: 2 },
        tempoParaDecidir: 14
    },
    {
        descricao: "Surto de doença que sobrecarrega o sistema de saúde.",
        efeitos: { Populacao: -9, Economia: -7, ReputacaoMidia: -5, ReputacaoLocal: -6, ReputacaoInternacional: -4 },
        tempoParaDecidir: 16
    },
    {
        descricao: "Recebimento de doações significativas para projetos sociais.",
        efeitos: { Populacao: 8, Economia: 5, ReputacaoMidia: 7, ReputacaoLocal: 8, ReputacaoInternacional: 3 },
        tempoParaDecidir: 10
    },
    {
        descricao: "Investimentos estrangeiros impulsionam a economia local.",
        efeitos: { Populacao: 6, Economia: 9, ReputacaoMidia: 6, ReputacaoLocal: 5, ReputacaoInternacional: 4 },
        tempoParaDecidir: 12
    },
    // Novos Eventos Positivos
    {
        descricao: "Descoberta de uma nova fonte de energia renovável.",
        efeitos: { Populacao: 7, Economia: 8, ReputacaoMidia: 6, ReputacaoLocal: 7, ReputacaoInternacional: 5 },
        tempoParaDecidir: 10
    },
    {
        descricao: "Acordo internacional fortalece relações comerciais.",
        efeitos: { Populacao: 5, Economia: 10, ReputacaoMidia: 7, ReputacaoLocal: 6, ReputacaoInternacional: 8 },
        tempoParaDecidir: 15
    },
    {
        descricao: "Programa de habitação social bem-sucedido aumenta a confiança pública.",
        efeitos: { Populacao: 9, Economia: 5, ReputacaoMidia: 6, ReputacaoLocal: 9, ReputacaoInternacional: 4 },
        tempoParaDecidir: 12
    },
    {
        descricao: "Iniciativa de sustentabilidade é elogiada globalmente.",
        efeitos: { Populacao: 6, Economia: 7, ReputacaoMidia: 8, ReputacaoLocal: 7, ReputacaoInternacional: 9 },
        tempoParaDecidir: 14
    },
    {
        descricao: "Lançamento de um aplicativo governamental melhora a eficiência.",
        efeitos: { Populacao: 7, Economia: 6, ReputacaoMidia: 5, ReputacaoLocal: 7, ReputacaoInternacional: 3 },
        tempoParaDecidir: 10
    }
];
