<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/cards">Cartes</router-link> |
      <router-link to="/sets">Sets</router-link> |
      <router-link to="/about">À propos</router-link>
      <router-link to="/search">Rechercher & Filtrer</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script></script>

<style>
/* Styles pour le menu */
nav a {
  margin-right: 10px;
}
</style>
