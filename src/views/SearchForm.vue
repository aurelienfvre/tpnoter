<template>
  <div>
    <div class="filter-controls">
      <!-- Recherche par texte -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a card"
        @input="filterCards"
        class="search-input"
      />
      <!-- Filtrage par rareté -->
      <select
        v-model="selectedRarity"
        @change="filterCards"
        class="filter-select"
      >
        <option value="">All Rarities</option>
        <option value="Common">Common</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Rare">Rare</option>
        <option value="Mythic Rare">Mythic Rare</option>
      </select>
      <!-- Filtrage par couleur (colorIdentity) -->
      <select
        v-model="selectedColorIdentity"
        @change="filterCards"
        class="filter-select"
      >
        <option value="">All Colors</option>
        <option v-for="color in colorIdentities" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <!-- Liste des types -->
      <select
        v-model="selectedType"
        @change="filterCards"
        class="filter-select"
      >
        <option value="">All Types</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
    <h2>Liste des Cartes</h2>
    <ul class="card-list">
      <li v-for="card in filteredCards" :key="card.id" class="card-item">
        <a href="#" class="card-link">
          <img
            :src="card.imageUrl || 'url_de_votre_image_par_defaut'"
            alt="Image de la carte"
            class="card-image"
          />
          <span><strong>Nom:</strong> {{ card.name }}</span>
          <span><strong>Type:</strong> {{ card.type }}</span>
          <span><strong>Rareté:</strong> {{ card.rarity }}</span>
          <!-- Affichage des colorIdentities -->
          <span v-if="card.colorIdentity"
            ><strong>Color Identity:</strong>
            {{ card.colorIdentity.join(", ") }}</span
          >
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
      selectedColorIdentity: "",
      selectedType: "",
      cards: [],
      allCards: [],
      colorIdentities: [], // Liste dynamique des identités de couleur
      types: [], // Liste dynamique des types
    };
  },
  async created() {
    await this.fetchAllCards();
  },
  computed: {
    filteredCards() {
      return this.allCards.filter((card) => {
        const matchesSearch = card.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesRarity = this.selectedRarity
          ? card.rarity === this.selectedRarity
          : true;
        const matchesColorIdentity = this.selectedColorIdentity
          ? card.colorIdentity &&
            card.colorIdentity.includes(this.selectedColorIdentity)
          : true;
        const matchesType = this.selectedType
          ? card.types && card.types.includes(this.selectedType)
          : true;
        return (
          matchesSearch && matchesRarity && matchesColorIdentity && matchesType
        );
      });
    },
  },
  methods: {
    async fetchAllCards() {
      try {
        const response = await axios.get(
          "https://api.magicthegathering.io/v1/cards"
        );
        this.allCards = response.data.cards;
        this.extractUniqueColorIdentities();
        this.extractUniqueTypes();
      } catch (error) {
        console.error("Error fetching all cards:", error);
      }
    },
    extractUniqueColorIdentities() {
      const identitiesSet = new Set();
      this.allCards.forEach((card) => {
        if (card.colorIdentity) {
          card.colorIdentity.forEach((identity) => identitiesSet.add(identity));
        }
      });
      this.colorIdentities = Array.from(identitiesSet).sort();
    },
    extractUniqueTypes() {
      const typesSet = new Set();
      this.allCards.forEach((card) => {
        if (card.types) {
          card.types.forEach((type) => typesSet.add(type));
        }
      });
      this.types = Array.from(typesSet).sort();
    },
    filterCards() {
      // La logique de filtrage est gérée par la propriété calculée `filteredCards`.
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
