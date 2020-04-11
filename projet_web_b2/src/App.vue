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
            <Dropdown titleDropDown="Boutique" :items="services" />
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
      services: [
        {
          title: "Boutique en ligne"
        },
        {
          title: "Point de vente"
        }
      ]
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
      this.$store.commit("setIndexPagination", 0);
      this.$router.push("/boutique");
    },
    goToLocalShop() {
      this.$store.commit("setIndexPagination", 0);
      this.$router.push("/boutique");
    },
    dropdownFunction(itemName, index) {
      if ((itemName = "Boutique en ligne" && index == 0)) {
        this.goToShop();
      } else {
        this.goToLocalShop();
      }
    }
  }
};
</script>