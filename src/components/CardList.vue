<template>
  <div>
    <h2>Liste des Cartes</h2>
    <button @click="toggleImages">
      {{ showImages ? "Cacher" : "Montrer" }} les images
    </button>
    <div class="navigation-buttons">
      <button @click="prevPage" :disabled="page <= 1">Précédent</button>
      <button @click="nextPage">Suivant</button>
    </div>
    <ul class="card-list">
      <CardItem
        v-for="card in cards"
        :key="card.id"
        :card="card"
        :show-images="showImages"
        @add-to-cart="addToCart"
      />
    </ul>
  </div>
</template>

<script>
import CardItem from "./CardItem.vue"; // Assurez-vous que le chemin est correct
import { onMounted, ref, reactive } from "vue";
import axios from "axios";

export default {
  components: { CardItem },
  setup() {
    const cards = ref([]);
    const page = ref(1);
    const pageSize = 10;
    const showImages = ref(true);
    const cart = reactive([]);

    const getPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://api.magicthegathering.io/v1/cards?page=${page.value}&pageSize=${pageSize}`
        );
        cards.value = response.data.cards;
      } catch (error) {
        console.error("There was an error fetching the cards:", error);
      }
    };

    const nextPage = () => {
      page.value++;
      getPokemonData();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        getPokemonData();
      }
    };

    const toggleImages = () => {
      showImages.value = !showImages.value;
    };

    const addToCart = (card) => {
      cart.push(card);
      // Affichez le panier dans la console pour le débogage, ou implémentez une logique pour afficher le panier.
    };

    onMounted(getPokemonData);

    return { cards, nextPage, prevPage, toggleImages, showImages, addToCart };
  },
};
</script>

<style scoped></style>
