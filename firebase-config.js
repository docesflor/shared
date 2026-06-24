/**
 * firebase-config.js — Doces Flor · Shared
 * Importar via jsDelivr em todos os repositórios:
 *
 *   <!-- Firebase SDKs (carregar ANTES deste arquivo) -->
 *   <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
 *   <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
 *   <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
 *
 *   <!-- Config centralizada -->
 *   <script src="https://cdn.jsdelivr.net/gh/docesflor/shared@main/firebase-config.js"></script>
 *
 * Após importar, as variáveis globais disponíveis são:
 *   window.FIREBASE_APP      — instância do firebase app
 *   window.FIREBASE_AUTH     — firebase.auth()
 *   window.FIREBASE_DB       — firebase.database()
 *   window.FIREBASE_CONFIG   — objeto de configuração (somente leitura)
 */

(function () {
  'use strict';

  var config = {
    apiKey:            'AIzaSyCYqic9IlxUXlS_yEuMLZvmg16wGh5_Ing',
    authDomain:        'doces-flor.firebaseapp.com',
    databaseURL:       'https://doces-flor-default-rtdb.firebaseio.com',
    projectId:         'doces-flor',
    storageBucket:     'doces-flor.firebasestorage.app',
    messagingSenderId: '430929421910',
    appId:             '1:430929421910:web:2f1bea78c78602c3387df7'
  };

  // Evita inicializar duas vezes se o script for carregado mais de uma vez
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  window.FIREBASE_CONFIG = Object.freeze(config);
  window.FIREBASE_APP    = firebase.app();
  window.FIREBASE_AUTH   = firebase.auth();
  window.FIREBASE_DB     = firebase.database();

})();
