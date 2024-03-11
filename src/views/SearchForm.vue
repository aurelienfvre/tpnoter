<template>
  <div>
    <div class="filter-controls">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a card"
        @input="filterCards"
        class="search-input"
      />
      <select
        v-model="selectedRarity"
        @change="filterCards"
        class="rarity-select"
      >
        <option value="">All Rarities</option>
        <option value="Common">Common</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Rare">Rare</option>
        <option value="Mythic Rare">Mythic Rare</option>
      </select>
    </div>
    <h2>Liste des Cartes</h2>
    <ul class="card-list">
      <li v-for="card in filteredCards" :key="card.id" class="card-item">
        <a href="#" class="card-link">
          <!-- Insérez votre logique de navigation -->
          <img
            :src="card.imageUrl || 'url_de_votre_image_par_defaut'"
            alt="Image de la carte"
            class="card-image"
          />
          <span><strong>Nom:</strong> {{ card.name }}</span>
          <span><strong>Type:</strong> {{ card.type }}</span>
          <span><strong>Rareté:</strong> {{ card.rarity }}</span>
        </a>
      </li>
    </ul>
    <p v-if="filteredCards.length === 0">No results found.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      selectedRarity: "",
      cards: [],
      allCards: [],
    };
  },
  computed: {
    filteredCards() {
      return this.allCards.filter((card) => {
        return (
          card.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedRarity ? card.rarity === this.selectedRarity : true)
        );
      });
    },
  },
  async created() {
    await this.fetchAllCards();
  },
  methods: {
    async fetchAllCards() {
      try {
        const response = await axios.get(
          "https://api.magicthegathering.io/v1/cards"
        );
        this.allCards = response.data.cards;
        this.cards = this.allCards; // Initialisation avec toutes les cartes
      } catch (error) {
        console.error("Error fetching all cards:", error);
      }
    },
    filterCards() {
      // Cette méthode est maintenant utilisée pour déclencher le filtrage à la fois par nom et rareté.
      // Pas besoin d'implémentation supplémentaire car le filtrage est géré par la propriété calculée `filteredCards`.
    },
  },
};
</script>

<style scoped>
.search-input,
.rarity-select {
  margin: 20px 0;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.filter-controls {
  display: flex;
  flex-direction: column;
}

/* Ajoutez d'autres styles ici si nécessaire */
</style>
