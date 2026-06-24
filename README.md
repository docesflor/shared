# docesflor/shared

Repositório centralizado de arquivos compartilhados entre todos os sites Doces Flor.
Elimina duplicação de código entre os repositórios `cardapio`, `pedidos` e `admin`.

---

## Estrutura

```
shared/
├── firebase-config.js   # Configuração e inicialização do Firebase
├── theme.css            # Variáveis CSS de tema + import das fontes Google
├── utils.js             # Funções utilitárias JS (formatação, preços, masks, etc.)
├── images/
│   ├── icon-512.png     # Logo Doces Flor (usada em todos os sites)
│   ├── amendoim.png
│   ├── beijinho.png
│   ├── brigadeiro.png
│   ├── cafe.png
│   ├── dois-amores.png
│   ├── leite-ninho.png
│   ├── moranguinho.png
│   ├── prestigio.png
│   ├── sensacao.png
│   ├── amora.png
│   ├── banana.png
│   ├── cereja.png
│   ├── frutas-vermelhas.png
│   ├── limao.png
│   ├── maracuja.png
│   ├── uva.png
│   ├── chocolate-gourmet.png
│   ├── confete.png
│   ├── churros.png
│   ├── ferrero.png
│   ├── leite-ninho-nutella.png
│   ├── negresco.png
│   └── ovomaltine.png
└── README.md
```

---

## URLs de produção (jsDelivr CDN)

O jsDelivr serve arquivos do GitHub com cache de CDN global.
Use `@main` para sempre pegar a versão mais recente do branch main.

### Arquivos JS/CSS

```
https://cdn.jsdelivr.net/gh/docesflor/shared@main/firebase-config.js
https://cdn.jsdelivr.net/gh/docesflor/shared@main/theme.css
https://cdn.jsdelivr.net/gh/docesflor/shared@main/utils.js
```

### Imagens

```
https://cdn.jsdelivr.net/gh/docesflor/shared@main/images/icon-512.png
https://cdn.jsdelivr.net/gh/docesflor/shared@main/images/brigadeiro.png
https://cdn.jsdelivr.net/gh/docesflor/shared@main/images/[nome-do-arquivo].png
```

> **Dica:** Para forçar atualização do cache do jsDelivr após um push,
> acesse: `https://purge.jsdelivr.net/gh/docesflor/shared@main/[arquivo]`

---

## Como importar em cada repositório

Cole este bloco no `<head>` de cada HTML, **antes** de qualquer `<style>` próprio:

```html
<!-- ── Doces Flor Shared ── -->
<!-- Tema: variáveis CSS + fontes Google -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/docesflor/shared@main/theme.css">

<!-- Firebase SDKs (necessário antes do firebase-config.js) -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

<!-- Firebase config centralizada -->
<script src="https://cdn.jsdelivr.net/gh/docesflor/shared@main/firebase-config.js"></script>

<!-- Utilitários JS -->
<script src="https://cdn.jsdelivr.net/gh/docesflor/shared@main/utils.js"></script>
<!-- ── fim Shared ── -->
```

> **Cardápio público:** não precisa importar `firebase-config.js` (não usa Firebase).
> Importe apenas `theme.css` e `utils.js`.

---

## O que cada arquivo substitui

### `theme.css` substitui em cada HTML:
- O `<link>` do Google Fonts (Cormorant Garamond + DM Sans)
- O bloco `:root { --brown-dark, --amber, --cream... }`
- O reset `*, *::before, *::after { box-sizing... }`
- A animação `@keyframes toastEntrar`
- A animação `@keyframes floatLogo` (logo do login)

### `firebase-config.js` substitui em cada HTML:
- O objeto `firebaseConfig = { apiKey... }`
- A chamada `firebase.initializeApp(firebaseConfig)`
- Expõe: `window.FIREBASE_AUTH`, `window.FIREBASE_DB`, `window.FIREBASE_APP`

### `utils.js` substitui em cada HTML:
| Função | Usada em |
|---|---|
| `formatarValor(v)` | pedidos, admin |
| `fmtPreco(cat, qtd)` | cardápio |
| `maskTelefone(v)` | pedidos |
| `maskCEP(v)` | pedidos, cardápio |
| `maskMoeda(v)` | pedidos |
| `converterDataParaBR(iso)` | pedidos |
| `converterDataParaISO(br)` | pedidos |
| `dataHoje()` | pedidos |
| `getVal(id)` / `setVal(id, v)` | pedidos |
| `escaparHTML(str)` | pedidos |
| `toast(msg, tipo)` | pedidos, admin |
| `copiarParaClipboard(texto)` | pedidos |
| `buscarCEP(cep)` | pedidos |
| `precoUnitario(sabor, qtd)` | pedidos, cardápio |
| `precoUnitarioPorFaixa(cat, qtd)` | pedidos |
| `calcularValorNormal(qtdT, qtdG)` | pedidos |
| `gerarLinkWhatsApp(msg)` | cardápio, pedidos |
| `TABELA_PRECOS` | pedidos, cardápio, admin |
| `COMBOS_MISTOS` | pedidos, cardápio |
| `CATEGORIA_SABOR` | pedidos |
| `WHATSAPP_NUMBER` | cardápio, pedidos |

---

## O que NÃO está aqui (fica em cada repo)

| Arquivo | Motivo |
|---|---|
| `manifest.json` | Exige same-origin — cada site precisa do próprio |
| `sw.js` | Service Worker só registra no mesmo domínio |
| `index.html` | Lógica específica de cada site |
| `dados-cardapio.json` | Lido pelo cardápio e admin via fetch |
| `dados-pedidos.json` | Lido pelo pedidos e admin via fetch |

---

## Atualizando preços ou sabores

Os preços e a lista de sabores estão em dois lugares:

1. **`utils.js`** — `TABELA_PRECOS` e `CATEGORIA_SABOR` (usados pelo JS dos sites)
2. **`dados-cardapio.json`** (repo `admin`) — fonte de verdade para o cardápio público
3. **`dados-pedidos.json`** (repo `admin`) — fonte de verdade para o sistema de pedidos

Quando atualizar um preço ou adicionar um sabor, atualize os 3 lugares.
_(Migrar para Firebase como fonte única eliminaria essa duplicação — ver melhorias futuras)_

---

## Estrutura dos repositórios após a migração

```
docesflor/
├── shared/          ← este repositório (privado)
│   ├── firebase-config.js
│   ├── theme.css
│   ├── utils.js
│   └── images/
├── cardapio/        ← site público do cliente
│   ├── index.html   (importa theme.css + utils.js do shared)
│   ├── manifest.json
│   ├── sw.js
│   └── dados-cardapio.json
├── pedidos/         ← sistema interno de pedidos
│   ├── index.html   (importa theme.css + firebase-config.js + utils.js do shared)
│   ├── manifest.json
│   └── sw.js
└── admin/           ← painel administrativo
    ├── index.html   (importa theme.css + firebase-config.js + utils.js do shared)
    ├── manifest.json
    ├── sw.js
    ├── dados-cardapio.json
    └── dados-pedidos.json
```
