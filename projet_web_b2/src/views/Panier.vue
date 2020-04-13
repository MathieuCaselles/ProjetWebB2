<template>
  <div>
    <h5 class="header">Panier :</h5>
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
                <th>Retirer du panier</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in produitsPanier" v-bind:key="index">
                <td>{{product.value.data.dataProduit.nom}}</td>

                <td class="right">
                  <input
                    type="text"
                    size="2"
                    :value="product.qte"
                    @keyup.enter="setQte($event.target.value, product)"
                  />
                </td>
                <td class="center">{{product.value.data.prix}} €</td>
                <td ref class="center">{{(product.value.data.prix * product.qte).toFixed(2)}} €</td>
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
                <th class="center">Prix Total : {{ montantTotal }} €</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="formulaireReservation" v-if="isOpen">
        <h5>Veuillez vérifiez que votre profil soit à jour :</h5>
        <h6>Mettez le à jour si necessaire.</h6>
        <div class="row">
          <ProfileUser ref="user" />
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
import { db, auth } from "@/firebase";
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
    },
    montantTotal: function() {
      let resultat = 0;
      this.produitsPanier.forEach(product => {
        resultat += product.value.data.prix * product.qte;
      });
      return resultat;
    },
    argentUser: function() {
      return this.$refs.user.profileList[0].balance;
    },
    idVendeur: function() {
      return this.produitsPanier[0].value.data.idVendeur;
    }
  },
  methods: {
    goToShop() {
      if (this.$router.currentRoute.path != "/boutique") {
        this.$router.push("/boutique");
      }
    },
    setQte(value, product) {
      console.log(product.value.data.stock);
      console.log(value);
      if (!value || value == 0) {
        this.removeFromCart(product);
      } else if (product.value.data.stock < parseInt(value)) {
        alert("Désolé mais nous n'en avons pas assez en stock.");
      } else {
        this.$store.commit("setQteProductCart", {
          newValue: value,
          productSet: product
        });
      }
    },
    removeFromCart(product) {
      this.$store.commit("removeFromCart", product);
    },
    checkOut() {
      if (parseFloat(this.argentUser) < parseFloat(this.montantTotal)) {
        alert("Nous sommes désolé mais vous n'avez pas assez d'argent.");
      } else {
        let nouveauSolde =
          parseFloat(this.argentUser) - parseFloat(this.montantTotal);
        let listeProduits = [];
        this.produitsPanier.forEach(product => {
          listeProduits.push({
            nom: product.value.data.dataProduit.nom,
            quantite: product.qte,
            prixUnitaire: product.value.data.prix,
            total: product.value.data.prix * product.qte
          });
        });
        const facture = {
          vendeur: db.doc(`/vendeur/${this.idVendeur}`),
          user: db.doc(`/profiles/${auth.currentUser.uid}`),
          produits: listeProduits,
          montantTotal: this.montantTotal
        };
        db.collection("factures")
          .add(facture)
          .then(() => {
            alert("Merci, votre commande a bien été passé");
          })
          .then(() => {
            db.collection("profiles")
              .doc(auth.currentUser.uid)
              .update({ balance: nouveauSolde });
          });
      }
    }
  }
};
</script>