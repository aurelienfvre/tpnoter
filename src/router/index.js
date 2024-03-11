import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/cards",
      name: "CardList",
      component: () => import("../components/CardList.vue"), // Affichage de la liste des cartes
    },
    {
      path: "/cards/:id",
      name: "CardDetail",
      component: () => import("../components/CardDetail.vue"), // Affichage des détails d'une carte
      props: true,
    },
    {
      path: "/sets",
      name: "SetList",
      component: () => import("../components/SetList.vue"), // Affichage des sets
    },
    {
      path: "/search",
      name: "SearchForm",
      component: () => import("../views/SearchForm.vue"), // Formulaire de recherche de cartes par nom
    },
    {
      path: "/filter",
      name: "FilterForm",
      component: () => import("../views/FilterForm.vue"), // Formulaire pour filtrer les cartes selon un critère
    },
    // Ajoutez ici d'autres routes selon les besoins de votre application
  ],
});

export default router;
