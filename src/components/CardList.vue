<template>
  <div>
    <h2>Liste des Cartes</h2>
    <div class="navigation-buttons">
      <button @click="prevPage" :disabled="page <= 1">Précédent</button>
      <button @click="nextPage">Suivant</button>
    </div>
    <ul class="card-list">
      <li v-for="card in cards" :key="card.id" class="card-item">
        <router-link
          :to="{
            name: 'CardDetail',
            params: {
              id: card.id,
              title: card.title,
              description: card.description,
            },
          }"
          class="card-link"
        >
          <img
            :src="card.imageUrl || 'url_de_votre_image_par_defaut'"
            alt="Image de la carte"
            class="card-image"
          />

          <span><strong>Nom:</strong> {{ card.name }}</span>
          <span><strong>Type:</strong> {{ card.type }}</span>
          <span><strong>Rareté:</strong> {{ card.rarity }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const cards = ref([]);
    const page = ref(1);
    const pageSize = 10; // Ajustez en fonction du nombre de cartes que vous souhaitez afficher par page

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

    onMounted(getPokemonData);

    return { cards, nextPage, prevPage };
  },
};
</script>

<style scoped></style>
