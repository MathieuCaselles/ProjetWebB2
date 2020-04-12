<template>
  <div>
    <br />
    <Dropdown :titleDropDown="vendeurSelect.data.nom" :items="listeVendeurs" />
    <h2>Stock du vendeur</h2>
    <AdminCompoGestionStock :vendeur="vendeurSelect" />
  </div>
</template>
<script>
import Dropdown from "@/components/Dropdown.vue";
import AdminCompoGestionStock from "@/components/AdminCompoGestionStock.vue";

export default {
  name: "AdminGestionVendeur",
  components: {
    Dropdown,
    AdminCompoGestionStock
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
  },
  methods: {
    dropdownFunction(vendeur) {
      this.vendeurSelect = vendeur;
      this.$store.commit("updateStockVendeur", vendeur.id);
    }
  }
};
</script>