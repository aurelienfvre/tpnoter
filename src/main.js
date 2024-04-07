import "./assets/main.css";

import { createApp, reactive } from "vue"; // Ajouter reactive à l'importation
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

// Créer un objet réactif pour le panier
const cart = reactive([]);

// Fournir l'objet cart à toute l'application
app.provide("cart", cart);

app.mount("#app");
