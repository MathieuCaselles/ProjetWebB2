<template>
  <div>
    <h5 class="header">Panier de réservation de : NOM VENDEUR.</h5>
    <section class="section">
      <div class="row">
        <div class="col s12 l10 xl8 offset-l1 offset-xl2">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th class="right">Quantité</th>
                <th class="center">Prix Unitaire</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in produitsPanier" v-bind:key="index">
                <td>{{product.value.data.dataProduit.nom}}</td>

                <td class="right">
                  <input type="text" size="2" :value="product.qte" />
                </td>
                <td class="center">{{product.value.data.prix}} €</td>
                <td class="center">{{product.value.data.prix * product.qte}} €</td>
                <td class="right">
                  <a
                    class="waves-effect waves-black btn red"
                    @click="removeFromCart(product)"
                  >Retirer</a>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th class="center">Prix Total : Montant global</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="formulaireReservation" v-if="isOpen">
        <h5>Veuillez vérifiez que votre profil soit à jour :</h5>
        <h6>Mettez le à jour si necessaire.</h6>
        <div class="row">
          <ProfileUser />
          <div class="center">
            <a
              @click="checkOut"
              class="waves-effect waves-yellow btn-large green offset-s3"
            >Valider et payer</a>
          </div>
        </div>
      </div>
    </section>

    <div class="row">
      <div class="col s12 m5 offset-m1">
        <a
          @click="goToShop"
          class="waves-effect waves-yellow btn-large amber darken-3"
        >Retour dans la boutique du vendeur</a>
      </div>
      <div class="col s12 m5">
        <a
          id="switchFormulaireReservation"
          v-bind:class="!isOpen ? 'blue' : 'red'"
          class="waves-effect waves-yellow btn-large darken-1 right"
          v-if="!estVide"
          @click="isOpen = !isOpen"
        >{{!isOpen ? "Étape suivante" : "Annuler"}}</a>
      </div>
      <div class="col s12 m11 offset-m1">
        <blockquote>
          Vous avez des questions ou rencontrez un problème ?
          <br />Nous vous aiderons avec plaisir !
          <router-link to="/contact">Contactez-nous !</router-link>
        </blockquote>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileUser from "@/components/ProfileUser.vue";
export default {
  name: "Panier",
  components: {
    ProfileUser
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    produitsPanier: function() {
      return this.$store.state.cart;
    },
    estVide: function() {
      return this.produitsPanier.length < 1;
    }
  },
  methods: {
    goToShop() {
      if (this.$router.currentRoute.path != "/boutique") {
        this.$router.push("/boutique");
      }
    },
    removeFromCart(product) {
      this.$store.commit("removeFromCart", product);
    },
    checkOut() {
      alert("Faut faire la méthode de paiement");
    }
  }
};
</script>