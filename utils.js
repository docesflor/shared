/**
 * utils.js — Doces Flor · Shared
 * Importar via jsDelivr em todos os repositórios:
 *
 *   <script src="https://cdn.jsdelivr.net/gh/docesflor/shared@main/utils.js"></script>
 *
 * Expõe o objeto global window.DocesFlor com todas as funções utilitárias.
 * As funções também são expostas no escopo global (window.X = ...) para
 * compatibilidade com o código existente que as chama diretamente.
 *
 * Funções disponíveis:
 *   Formatação:   formatarValor, fmtPreco
 *   Máscaras:     maskTelefone, maskCEP, maskMoeda
 *   Datas:        converterDataParaBR, converterDataParaISO, dataHoje
 *   DOM:          getVal, setVal, escaparHTML, toast
 *   Clipboard:    copiarParaClipboard
 *   CEP:          buscarCEP
 *   Preços:       TABELA_PRECOS, COMBOS_MISTOS, CATEGORIA_SABOR
 *                 precoUnitario, precoUnitarioPorFaixa, calcularValorNormal
 *   WhatsApp:     WHATSAPP_NUMBER, gerarLinkWhatsApp
 */

(function (global) {
  'use strict';

  /* ── CONSTANTES ─────────────────────────────────────── */

  var WHATSAPP_NUMBER = '5547992745896';

  var TABELA_PRECOS = {
    trad:    { 100: 110, 75: 85,  50: 60,  25: 35,  avulso: 1.50 },
    frutas:  { 100: 125, 75: 100, 50: 70,  25: 40,  avulso: 1.75 },
    gourmet: { 100: 140, 75: 115, 50: 80,  25: 45,  avulso: 2.00 }
  };

  var COMBOS_MISTOS = {
    100: { '100-0': 110, '75-25': 120, '50-50': 125, '25-75': 130, '0-100': 140 },
    50:  { '100-0':  60, '75-25':  65, '50-50':  70, '25-75':  75, '0-100':  80 }
  };

  var CATEGORIA_SABOR = {
    // Tradicionais
    'Amendoim':               'trad',
    'Beijinho':               'trad',
    'Brigadeiro':             'trad',
    'Café':                   'trad',
    'Dois Amores':            'trad',
    'Leite Ninho':            'trad',
    'Moranguinho (Nesquik)':  'trad',
    'Prestígio':              'trad',
    'Sensação':               'trad',
    // Gourmet
    'Chocolate Gourmet':        'gourmet',
    'Chocolate Gourmet Preto':  'gourmet',
    'Confete':                  'gourmet',
    'Churros':                  'gourmet',
    'Ferrero Rocher':           'gourmet',
    'Leite Ninho com Nutella':  'gourmet',
    'Negresco':                 'gourmet',
    'Ovomaltine':               'gourmet',
    // Frutas
    'Amora':           'frutas',
    'Banana':          'frutas',
    'Cereja':          'frutas',
    'Frutas Vermelhas':'frutas',
    'Limão':           'frutas',
    'Maracujá':        'frutas',
    'Uva':             'frutas'
  };

  /* ── FORMATAÇÃO ─────────────────────────────────────── */

  /**
   * Formata um número como moeda BRL.
   * Ex.: 25.5 → "R$ 25,50"
   */
  function formatarValor(v) {
    if (!v && v !== 0) return '';
    if (typeof v === 'number') return 'R$ ' + v.toFixed(2).replace('.', ',');
    return v;
  }

  /**
   * Retorna o preço formatado de uma categoria/quantidade do cardápio.
   * Ex.: fmtPreco('trad', 25) → "R$ 35,00"
   * @param {string} cat   — 'trad' | 'frutas' | 'gourmet'
   * @param {number} qtd   — 25 | 50 | 75 | 100
   */
  function fmtPreco(cat, qtd) {
    var v = TABELA_PRECOS[cat] && TABELA_PRECOS[cat][qtd];
    if (!v) return '—';
    return 'R$ ' + parseFloat(v).toFixed(2).replace('.', ',');
  }

  /* ── MÁSCARAS ───────────────────────────────────────── */

  function maskTelefone(v) {
    v = v.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length === 0) return '';
    if (v.length <= 2)  return '(' + v;
    if (v.length <= 7)  return '(' + v.slice(0, 2) + ') ' + v.slice(2);
    return '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
  }

  function maskCEP(v) {
    return v.replace(/\D/g, '').replace(/(\d{5})(\d{1,3})/, '$1-$2');
  }

  function maskMoeda(v) {
    v = v.replace(/\D/g, '');
    if (!v) return '';
    return 'R$ ' + (parseInt(v) / 100).toFixed(2).replace('.', ',');
  }

  /* ── DATAS ──────────────────────────────────────────── */

  /** "2025-06-01" → "01/06/2025" */
  function converterDataParaBR(dataISO) {
    if (!dataISO) return '';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dataISO)) return dataISO;
    var p = dataISO.split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : dataISO;
  }

  /** "01/06/2025" → "2025-06-01" */
  function converterDataParaISO(dataBR) {
    if (!dataBR) return '';
    var p = dataBR.split('/');
    return p.length === 3 ? p[2] + '-' + p[1] + '-' + p[0] : dataBR;
  }

  /** Retorna a data de hoje no formato ISO (YYYY-MM-DD) */
  function dataHoje() {
    var d = new Date();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  /* ── DOM ────────────────────────────────────────────── */

  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setVal(id, v) {
    var el = document.getElementById(id);
    if (el) el.value = v || '';
  }

  function escaparHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Exibe um toast de notificação na tela.
   * @param {string} msg
   * @param {'sucesso'|'erro'|'aviso'} tipo
   */
  function toast(msg, tipo) {
    tipo = tipo || 'sucesso';
    var cores = { sucesso: '#25d366', erro: '#dc3545', aviso: '#FFA500' };
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText =
      'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
      'background:' + (cores[tipo] || cores.sucesso) + ';color:white;padding:12px 24px;' +
      'border-radius:24px;font-family:"DM Sans",Arial,sans-serif;font-weight:700;' +
      'font-size:0.88em;z-index:99999;pointer-events:none;white-space:nowrap;' +
      'animation:toastEntrar 0.3s ease;box-shadow:0 4px 16px rgba(0,0,0,0.18);';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3000);
  }

  /* ── CLIPBOARD ──────────────────────────────────────── */

  function copiarParaClipboard(texto) {
    return new Promise(function (resolve) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto)
          .then(function () { resolve(true); })
          .catch(function () { _fallbackCopy(texto, resolve); });
      } else {
        _fallbackCopy(texto, resolve);
      }
    });
  }

  function _fallbackCopy(texto, resolve) {
    var ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { resolve(document.execCommand('copy')); }
    catch (e) { resolve(false); }
    document.body.removeChild(ta);
  }

  /* ── CEP ────────────────────────────────────────────── */

  /**
   * Busca endereço pelo CEP via ViaCEP.
   * @param {string} cep — com ou sem máscara
   * @returns {Promise<object|null>} — objeto { logradouro, bairro, localidade, uf } ou null
   */
  function buscarCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep.length !== 8) return Promise.resolve(null);
    return fetch('https://viacep.com.br/ws/' + cep + '/json/')
      .then(function (r) { return r.json(); })
      .then(function (d) { return d.erro ? null : d; })
      .catch(function () { return null; });
  }

  /* ── CÁLCULO DE PREÇOS ──────────────────────────────── */

  /**
   * Retorna o preço unitário de um sabor para uma quantidade total.
   * @param {string} sabor — nome do sabor
   * @param {number} qtd   — quantidade total daquele sabor no pedido
   */
  function precoUnitario(sabor, qtd) {
    var cat = CATEGORIA_SABOR[sabor] || 'trad';
    var t   = TABELA_PRECOS[cat];
    if      (qtd >= 100) return t[100] / 100;
    else if (qtd >= 50)  return t[50]  / 50;
    else if (qtd >= 25)  return t[25]  / 25;
    else                 return t.avulso;
  }

  /**
   * Retorna o preço unitário por faixa de quantidade total (todos os itens).
   * @param {'trad'|'frutas'|'gourmet'} cat
   * @param {number} qtdTotal — total de unidades no pedido
   */
  function precoUnitarioPorFaixa(cat, qtdTotal) {
    var tabelas = {
      trad:    [
        { min: 100, preco: 1.10 }, { min: 75, preco: 1.13 },
        { min: 50,  preco: 1.20 }, { min: 25, preco: 1.40 },
        { min: 0,   preco: 1.50 }
      ],
      frutas:  [
        { min: 100, preco: 1.25 }, { min: 75, preco: 1.33 },
        { min: 50,  preco: 1.40 }, { min: 25, preco: 1.60 },
        { min: 0,   preco: 1.75 }
      ],
      gourmet: [
        { min: 100, preco: 1.40 }, { min: 75, preco: 1.53 },
        { min: 50,  preco: 1.60 }, { min: 25, preco: 1.80 },
        { min: 0,   preco: 2.00 }
      ]
    };
    var faixas = tabelas[cat] || tabelas.trad;
    for (var i = 0; i < faixas.length; i++) {
      if (qtdTotal >= faixas[i].min) return faixas[i].preco;
    }
    return faixas[faixas.length - 1].preco;
  }

  /**
   * Calcula o valor total de um pedido misto (trad + gourmet),
   * otimizando por faixas de caixa.
   */
  function calcularValorNormal(qtdTrad, qtdGourmet) {
    function calcCat(qtd, tabela) {
      var valor = 0, restante = qtd;
      var centos   = Math.floor(restante / 100); valor += centos   * tabela[100]; restante -= centos   * 100;
      var caixas50 = Math.floor(restante / 50);  valor += caixas50 * tabela[50];  restante -= caixas50 * 50;
      var caixas25 = Math.floor(restante / 25);  valor += caixas25 * tabela[25];  restante -= caixas25 * 25;
      valor += restante * tabela.avulso;
      return valor;
    }
    return calcCat(qtdTrad, TABELA_PRECOS.trad) + calcCat(qtdGourmet, TABELA_PRECOS.gourmet);
  }

  /* ── WHATSAPP ───────────────────────────────────────── */

  /**
   * Gera um link de abertura do WhatsApp com mensagem pré-preenchida.
   * @param {string} mensagem — texto a enviar
   * @param {string} [numero] — sobrescreve o número padrão
   */
  function gerarLinkWhatsApp(mensagem, numero) {
    var num = numero || WHATSAPP_NUMBER;
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(mensagem);
  }

  /* ── NAMESPACE PÚBLICO ──────────────────────────────── */

  var DocesFlor = {
    // Constantes
    WHATSAPP_NUMBER:      WHATSAPP_NUMBER,
    TABELA_PRECOS:        TABELA_PRECOS,
    COMBOS_MISTOS:        COMBOS_MISTOS,
    CATEGORIA_SABOR:      CATEGORIA_SABOR,
    // Formatação
    formatarValor:        formatarValor,
    fmtPreco:             fmtPreco,
    // Máscaras
    maskTelefone:         maskTelefone,
    maskCEP:              maskCEP,
    maskMoeda:            maskMoeda,
    // Datas
    converterDataParaBR:  converterDataParaBR,
    converterDataParaISO: converterDataParaISO,
    dataHoje:             dataHoje,
    // DOM
    getVal:               getVal,
    setVal:               setVal,
    escaparHTML:          escaparHTML,
    toast:                toast,
    // Clipboard
    copiarParaClipboard:  copiarParaClipboard,
    // CEP
    buscarCEP:            buscarCEP,
    // Preços
    precoUnitario:        precoUnitario,
    precoUnitarioPorFaixa: precoUnitarioPorFaixa,
    calcularValorNormal:  calcularValorNormal,
    // WhatsApp
    gerarLinkWhatsApp:    gerarLinkWhatsApp
  };

  // Namespace principal
  global.DocesFlor = DocesFlor;

  // Aliases globais para compatibilidade com código existente que chama as funções diretamente
  global.formatarValor        = formatarValor;
  global.fmtPreco             = fmtPreco;
  global.maskTelefone         = maskTelefone;
  global.maskCEP              = maskCEP;
  global.maskMoeda            = maskMoeda;
  global.converterDataParaBR  = converterDataParaBR;
  global.converterDataParaISO = converterDataParaISO;
  global.dataHoje             = dataHoje;
  global.getVal               = getVal;
  global.setVal               = setVal;
  global.escaparHTML          = escaparHTML;
  global.toast                = toast;
  global.copiarParaClipboard  = copiarParaClipboard;
  global.buscarCEP            = buscarCEP;
  global.precoUnitario        = precoUnitario;
  global.precoUnitarioPorFaixa = precoUnitarioPorFaixa;
  global.calcularValorNormal  = calcularValorNormal;
  global.gerarLinkWhatsApp    = gerarLinkWhatsApp;
  global.TABELA_PRECOS        = TABELA_PRECOS;
  global.COMBOS_MISTOS        = COMBOS_MISTOS;
  global.CATEGORIA_SABOR      = CATEGORIA_SABOR;
  global.WHATSAPP_NUMBER      = WHATSAPP_NUMBER;

})(window);
