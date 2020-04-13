<template>
  <div>
    <section
      v-if="vendeur"
      class="section green lighten-4"
      style="max-height: 10em; overflow: auto;"
    >
      <div class="row">
        <div class="col s12">
          <table class="responsive-table highlight">
            <tbody>
              <tr>
                <td>{{vendeur.data.nom}}</td>
                <td>{{vendeur.data.horaire}}</td>
                <td>{{vendeur.data.description}}</td>
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
  name: "infoVendeur",
  computed: {
    vendeur: function() {
      return this.$store.state.vendeurSelect;
    }
  },
  methods: {
    adaptToMaps(adresse) {
      return `https://www.google.com/maps/place/${adresse
        .split(" ")
        .join("+")}`;
    }
  }
};
</script>