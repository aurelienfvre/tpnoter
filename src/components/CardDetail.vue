<template>
  <div>
    <select v-model="selectedLanguage">
      <option value="en">Anglais</option>
      <option value="French">Français</option>
      <!-- Ajoutez d'autres langues selon les données disponibles dans foreignNames -->
    </select>
    <button @click="goBack">Retour</button>
    <div class="card-details" v-if="card">
      <h2>{{ translatedName }}</h2>
      <img
        :src="card.imageUrl || 'url_de_votre_image_par_defaut'"
        alt="Image de la carte"
        v-if="card.imageUrl"
        loading="lazy"
      />
      <div class="card-info">
        <p><strong>Type:</strong> {{ card.type }}</p>
        <p><strong>Texte:</strong> {{ card.text || "N/A" }}</p>
        <p><strong>Couleurs:</strong> {{ card.colors?.join(", ") || "N/A" }}</p>
        <p><strong>Coût de mana:</strong> {{ card.manaCost || "N/A" }}</p>
        <p><strong>Rareté:</strong> {{ card.rarity }}</p>
        <p><strong>Set:</strong> {{ card.setName }}</p>
        <p><strong>Artist:</strong> {{ card.artist }}</p>
        <p>
          <strong>Power/Toughness:</strong> {{ card.power }}/{{
            card.toughness
          }}
        </p>
        <!-- Ajoutez ici d'autres champs selon vos besoins -->
      </div>
    </div>
    <div v-else class="loading">
      <p>Chargement des détails de la carte...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      card: null,
      selectedLanguage: "en", // Langue par défaut
      translatedName: "", // Pour stocker le nom traduit
    };
  },
  async created() {
    this.fetchCardDetails(this.$route.params.id);
  },
  watch: {
    selectedLanguage() {
      this.updateTranslatedName();
    },
    $route(to) {
      this.fetchCardDetails(to.params.id);
    },
  },
  methods: {
    async fetchCardDetails(cardId) {
      try {
        const response = await axios.get(
          `https://api.magicthegathering.io/v1/cards/${cardId}`
        );
        this.card = response.data.card;
        this.updateTranslatedName();
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    },
    updateTranslatedName() {
      if (this.selectedLanguage === "en" || !this.card.foreignNames) {
        this.translatedName = this.card?.name || "";
      } else {
        const translation = this.card.foreignNames.find(
          (foreign) => foreign.language === this.selectedLanguage
        );
        this.translatedName = translation?.name || "Traduction non disponible";
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.card-details {
  max-width: 800px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-info > p {
  margin: 10px 0;
}

.loading {
  text-align: center;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 20px;
}
</style>
