<template>
  <div>
    <Dropdown :titleDropDown="vendeurSelect.data.nom" :items="listeVendeurs" />
    <AdminCompoGestionVendeur :vendeur="vendeurSelect" />
  </div>
</template>
<script>
import Dropdown from "@/components/Dropdown.vue";
import AdminCompoGestionVendeur from "@/components/AdminCompoGestionVendeur.vue";

export default {
  name: "AdminGestionVendeur",
  components: {
    Dropdown,
    AdminCompoGestionVendeur
  },
  data() {
    return {
      vendeurSelect: { data: { nom: "Choix du vendeur" } }
    };
  },
  created() {
    this.$store.commit("updateVendeurs");
  },
  computed: {
    listeVendeurs: function() {
      return this.$store.state.listeVendeurs;
    }
    /* vendeurSelect: function() {
      return this.$store.state.vendeurSelect;
    }*/
  },
  methods: {
    dropdownFunction(vendeur) {
      //this.$store.commit("setVendeur", vendeur);
      this.vendeurSelect = vendeur;
      console.log(vendeur);
    }
  }
};
</script>