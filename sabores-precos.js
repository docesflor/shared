/* ═══════════════════════════════════════════
   DOCES FLOR — CATÁLOGO DE SABORES E PREÇOS COMPARTILHADO
   Fonte única de verdade para pedidos e cardápio público.

   As listas de sabores já eram idênticas nos dois arquivos originais
   (mesmos nomes, mesma ordem lógica). Os preços por faixa também
   já eram os mesmos números — só calculados de formas diferentes em
   cada site. Aqui unifiquei numa função só (ver abaixo).
═══════════════════════════════════════════ */

window.CATALOGO_DOCES_FLOR = {
    sabores: {
        trads: [
            "Amendoim","Beijinho","Brigadeiro","Café","Chocotone","Dois Amores",
            "Leite Ninho","Moranguinho (Nesquik)","Prestígio","Quebra Queixo",
            "Sensação","Tapioca"
        ],
        gourmets: [
            "Banoffee","Black Cacau","Canjica","Chocolate Gourmet","Churros",
            "Confete","Doritos","Ferrero Rocher","Floresta Negra","Guacamole",
            "Leite Ninho com Nutella","Menta","Negresco","Nutella","Ovomaltine"
        ],
        frutas: [
            "Amora","Banana","Cereja","Frutas Vermelhas","Limão","Maracujá",
            "Milho","Uva"
        ]
    },

    // preços por faixa de quantidade — idênticos aos dois arquivos originais
    precos: {
        trad:    { 25: 35,  50: 60,  75: 85,  100: 110, avulso: 1.50 },
        frutas:  { 25: 40,  50: 70,  75: 100, 100: 125, avulso: 1.75 },
        gourmet: { 25: 45,  50: 80,  75: 115, 100: 140, avulso: 2.00 }
    }
};

/* Mapa sabor -> categoria, gerado automaticamente a partir das listas acima.
   Substitui o objeto CATEGORIA_SABOR que em pedidos.html vinha parcialmente
   hardcoded (faltavam vários sabores) e só ficava completo depois que
   aplicarDadosDinamicos() rodava. Aqui já nasce completo. */
window.CATEGORIA_SABOR = {};
(function popularCategoriaSabor() {
    const s = window.CATALOGO_DOCES_FLOR.sabores;
    s.trads.forEach(n    => window.CATEGORIA_SABOR[n] = 'trad');
    s.gourmets.forEach(n => window.CATEGORIA_SABOR[n] = 'gourmet');
    s.frutas.forEach(n   => window.CATEGORIA_SABOR[n] = 'frutas');
})();

/* Preço unitário conforme a faixa de quantidade da categoria.
   Testei numericamente contra a precoUnitarioPorFaixa() de pedidos.html
   (que tinha os valores fixos, ex: 85/75, 1.20, 1.40...) e contra a lógica
   de calcularPrecoItem() do cardápio — os três batem em todos os pontos
   (25 / 50 / 75 / 100 / avulso) para trad, frutas e gourmet. */
function precoUnitarioPorFaixa(categoria, qtdTotal) {
    const tabela = window.CATALOGO_DOCES_FLOR.precos[categoria];
    if (!tabela) return 0;
    if (qtdTotal >= 100) return tabela[100] / 100;
    if (qtdTotal >= 75)  return tabela[75]  / 75;
    if (qtdTotal >= 50)  return tabela[50]  / 50;
    if (qtdTotal >= 25)  return tabela[25]  / 25;
    return tabela.avulso;
}
