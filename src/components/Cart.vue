<template>
  <div class="cart">
    <h3>Panier</h3>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - Quantité : {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const cart = inject("cart"); // Injection du panier depuis le parent ou un store global
    return { cart };
  },
};
</script>

<style scoped>
/* Styles du panier */
</style>
