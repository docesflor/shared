/* ═══════════════════════════════════════════
   DOCES FLOR — UTILITÁRIOS GLOBAIS COMPARTILHADOS
   Extraído exatamente como estava em DEV_index_pedidos.html.

   O cardápio público hoje usa versões próprias e mais simples
   (fmtBRL, escaparHTMLDepoimento) — pode passar a usar estas daqui
   sem problema, o comportamento é equivalente (só mais completo).
═══════════════════════════════════════════ */

function getVal(id) { const el = document.getElementById(id); return el ? el.value : ''; }
function setVal(id, v) { const el = document.getElementById(id); if (el) el.value = v || ''; }

function formatarValor(v) {
    if (!v && v !== 0) return '';
    if (typeof v === 'number') return 'R$ ' + v.toFixed(2).replace('.',',');
    return v;
}

function escaparHTML(str) {
    return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function converterDataParaBR(dataISO) {
    if (!dataISO) return '';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dataISO)) return dataISO;
    const p = dataISO.split('-');
    return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : dataISO;
}

function converterDataParaISO(dataBR) {
    if (!dataBR) return '';
    const p = dataBR.split('/');
    return p.length === 3 ? `${p[2]}-${p[1]}-${p[0]}` : dataBR;
}

function formatarDataComDia(dataInput) {
    if (!dataInput) return '';
    const diasSemana = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];

    let iso = dataInput;
    // Se vier em BR (DD/MM/AAAA), converte para ISO
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dataInput)) {
        const [d, m, a] = dataInput.split('/');
        iso = `${a}-${m}-${d}`;
    }

    const [ano, mes, dia] = iso.split('-').map(Number);
    const date = new Date(ano, mes - 1, dia); // sem UTC, evita bug de fuso
    const nomeDia = diasSemana[date.getDay()];
    const dataBR  = `${String(dia).padStart(2,'0')}/${String(mes).padStart(2,'0')}/${ano}`;

    return `${dataBR} (${nomeDia})`;
}

function maskTelefone(v) {
    v = v.replace(/\D/g,'');
    if (v.length > 11) v = v.slice(0,11);
    if (v.length === 0) return '';
    if (v.length <= 2) return '(' + v;
    if (v.length <= 7) return '(' + v.slice(0,2) + ') ' + v.slice(2);
    return '(' + v.slice(0,2) + ') ' + v.slice(2,7) + '-' + v.slice(7);
}

function maskCEP(v) { return v.replace(/\D/g,'').replace(/(\d{5})(\d{1,3})/,'$1-$2'); }

function maskMoeda(v) {
    v = v.replace(/\D/g,'');
    if (!v) return '';
    return 'R$ ' + (parseInt(v)/100).toFixed(2).replace('.',',');
}

/* ── DARK MODE ──
   Roda assim que utils.js carrega (no <head>, antes do <body> renderizar),
   pra já aplicar o tema salvo sem "piscar" a tela clara primeiro. ── */
(function initTema() {
    let salvo = null;
    try { salvo = localStorage.getItem('docesflor_tema'); } catch(e) {}
    const preferido = salvo || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', preferido);
})();

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    try { localStorage.setItem('docesflor_tema', tema); } catch(e) {}
    document.querySelectorAll('.btn-toggle-tema').forEach(btn => {
        btn.textContent = tema === 'dark' ? '☀️' : '🌙';
        btn.setAttribute('aria-label', tema === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    });
}

function alternarTema() {
    const atual = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    aplicarTema(atual === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
    const temaAtual = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    document.querySelectorAll('.btn-toggle-tema').forEach(btn => {
        btn.textContent = temaAtual === 'dark' ? '☀️' : '🌙';
    });
});
