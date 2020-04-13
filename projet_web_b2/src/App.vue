<template>
  <div id="div-navbar">
    <nav id="navbar">
      <div class="nav-wrapper green app">
        <router-link to="/" class="brand-logo green">Shop Project</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down green darken-2">
          <li>
            <router-link class="waves-effect waves-light btn green" to="/">
              Accueil
              <i class="material-icons right">home</i>
            </router-link>
          </li>
          <li>
            <Dropdown :titleDropDown="dropDownSelect" :items="services" />
          </li>
          <li>
            <router-link class="waves-effect waves-light btn green" to="/contact">
              Contact
              <i class="material-icons right">phone</i>
            </router-link>
          </li>
          <li v-if="!getUserStore">
            <router-link class="waves-effect waves-light btn green" to="/authentification">
              S'authentifier
              <i class="material-icons right">account_circle</i>
            </router-link>
          </li>
          <li v-else>
            <button @click="logout" class="waves-effect waves-light btn green">Deconnexion</button>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
    <Footer id="bottom" />
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown.vue";
import Footer from "@/components/Footer.vue";
const firebase = require("./firebase.js");
export default {
  components: {
    Dropdown,
    Footer
  },
  data() {
    return {
      services: {
        0: {
          id: 0,
          data: {
            nom: "Boutique en ligne"
          }
        },
        1: {
          id: 1,
          data: {
            nom: "Point de vente"
          }
        }
      },
      dropDownSelect: "Boutique"
    };
  },
  computed: {
    getUserStore() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    logout() {
      firebase.auth
        .signOut()
        .then(() => {
          this.$store.commit("setCurrentUser", null);
          console.log("Dexonnexion reussis");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goToShop() {
      this.$store.commit("updateStockVendeur", 1);
      this.$store.commit("setIndexPagination", 0);
      this.$store.commit("setVendeurSelect", null);
      if (this.$router.currentRoute.path != "/boutique") {
        this.$router.push("/boutique");
      }
    },
    goToVendeur() {
      if (this.$router.currentRoute.path != "/vendeurs") {
        this.$router.push("/vendeurs");
      }
    },
    dropdownFunction(item) {
      if (item.id == 0) {
        this.goToShop();
        this.dropDownSelect = "Boutique en ligne";
      } else {
        this.goToVendeur();
        this.dropDownSelect = "Point de vente";
      }
    }
  }
};
</script>