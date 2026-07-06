/* ═══════════════════════════════════════════
   DOCES FLOR — CONFIG FIREBASE COMPARTILHADA
   Extraído exatamente igual dos dois arquivos (firebaseConfig em
   pedidos e firebaseConfigDepoimentos no cardápio — já eram idênticos).

   Cada site continua chamando firebase.initializeApp() por conta
   própria (o cardápio, inclusive, dá um segundo nome à instância —
   "depoimentosApp" — o que continua funcionando normalmente).
   Aqui só compartilhamos o OBJETO de config, não a inicialização.
═══════════════════════════════════════════ */
window.FIREBASE_CONFIG = {
    apiKey: "AIzaSyCYqic9IlxUXlS_yEuMLZvmg16wGh5_Ing",
    authDomain: "doces-flor.firebaseapp.com",
    databaseURL: "https://doces-flor-default-rtdb.firebaseio.com",
    projectId: "doces-flor",
    storageBucket: "doces-flor.firebasestorage.app",
    messagingSenderId: "430929421910",
    appId: "1:430929421910:web:2f1bea78c78602c3387df7"
};
