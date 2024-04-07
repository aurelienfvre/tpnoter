<template>
  <li class="card-item">
    <div>
      <router-link :to="{ name: 'CardDetail', params: { id: card.id } }">
        <img
          v-if="showImages"
          :src="card.imageUrl || 'url_de_votre_image_par_defaut'"
          alt="Image de la carte"
          class="card-image"
        />
        <span><strong>Nom:</strong> {{ card.name }}</span>
        <span><strong>Type:</strong> {{ card.type }}</span>
        <span><strong>Rareté:</strong> {{ card.rarity }}</span>
        <span
          ><strong>Couleur(s):</strong>
          {{ card.colorIdentity.join(", ") }}</span
        >
        <span><strong>Coût en Mana:</strong> {{ card.manaCost }}</span>
      </router-link>
      <button @click="addToCart(card)">Ajouter au panier</button>
    </div>
  </li>
</template>

<script>
import { inject } from "vue";

export default {
  props: {
    card: Object,
    showImages: Boolean,
  },
  setup() {
    const cart = inject("cart"); // Injection du panier

    function addToCart(cardToAdd) {
      const found = cart.find((item) => item.id === cardToAdd.id);
      if (found) {
        found.quantity++;
      } else {
        cart.push({ ...cardToAdd, quantity: 1 });
      }
    }

    return {
      addToCart,
    };
  },
};
</script>

<style scoped>
/* Vos styles pour CardItem ici */
* {
  text-decoration: none;
}
span {
  color: #333;
}
</style>
