<template>
  <div>
    <h2>Liste des Sets</h2>
    <ul class="set-list">
      <li v-for="set in sets" :key="set.code" class="set-item">
        <span class="set-name">{{ set.name }} ({{ set.code }})</span>

        - Création : {{ set.releaseDate }} - Type : {{ set.type }} - Bloc :
        {{ set.block }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sets: [],
    };
  },
  async created() {
    try {
      const response = await axios.get(
        "https://api.magicthegathering.io/v1/sets"
      );
      this.sets = response.data.sets;
    } catch (error) {
      console.error("There was an error fetching the sets:", error);
    }
  },
};
</script>

<style scoped>
.set-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}
.set-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  padding: 20px;
}
.set-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.set-link {
  display: block;
  color: #333;
  text-decoration: none;
  padding: 10px;
}
.set-image {
  width: 100%;
  height: auto;
  display: block;
}
.set-name {
  display: block;
  text-align: center;
  font-weight: bold;
  margin: 10px 0;
}
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
</style>
