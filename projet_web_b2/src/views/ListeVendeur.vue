<template>
  <div>
    <section class="section" style="max-height: 37.2em; overflow: auto;">
      <div class="row">
        <div class="col s12 l10 xl8 offset-l1 offset-xl2">
          <table class="responsive-table highlight">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Adresse</th>
              </tr>
            </thead>

            <tbody>
              <tr v-show="vendeur.id != 1" v-for="(vendeur) in listeVendeurs" :key="vendeur.id">
                <td>{{vendeur.data.nom}}</td>
                <td>{{vendeur.data.adresse}}</td>
                <td>
                  <a
                    @click="goToShop(vendeur)"
                    class="waves-effect waves-light btn light-blue lighten-2"
                  >Boutique</a>
                </td>
                <td>
                  <a
                    :href="adaptToMaps(vendeur.data.adresse)"
                    title="Voir sur google maps"
                    target="_blank"
                    class="waves-effect waves-light btn light-green darken-1"
                  >Voir sur google maps</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "ListeVendeur",
  created() {
    this.$store.commit("updateVendeurs");
  },
  computed: {
    listeVendeurs: function() {
      return this.$store.state.listeVendeurs;
    }
  },
  methods: {
    goToShop(vendeur) {
      this.$store.commit("updateStockVendeur", vendeur.id);
      this.$store.commit("setVendeurSelect", vendeur);
      this.$store.commit("setIndexPagination", 0);
      if (this.$router.currentRoute.path != "/boutique") {
        this.$router.push("/boutique");
      }
    },
    adaptToMaps(adresse) {
      return `https://www.google.com/maps/place/${adresse
        .split(" ")
        .join("+")}`;
    }
  }
};
</script>