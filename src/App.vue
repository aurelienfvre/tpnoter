<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/cards">Cartes</router-link> |
      <router-link to="/sets">Sets</router-link> |
      <router-link to="/about">À propos</router-link>
      <router-link to="/search">Rechercher & Filtrer</router-link>
    </nav>
    <Cart />
    <!-- Le panier est maintenant ici et sera affiché sur toutes les pages -->
    <router-view />
  </div>
</template>

<script>
import { provide, reactive } from "vue";
import Cart from "./components/Cart.vue"; // Assurez-vous que le chemin vers Cart.vue est correct

export default {
  components: {
    Cart,
  },
  setup() {
    const cart = reactive([]);

    provide("cart", cart);

    return {};
  },
};
</script>

<style>
/* Styles pour le menu */
nav a {
  margin-right: 10px;
}
</style>
