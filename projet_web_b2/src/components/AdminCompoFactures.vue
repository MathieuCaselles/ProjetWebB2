<template>
  <div>
    <div class="row">
      <div class="col s3 m3" v-for="(facture, index) in factures" v-bind:key="index">
        <div class="card green">
          <div class="card-content white-text">
            <span class="card-title center">{{facture.data().fullName}}</span>
            <label class="card-title white-text">Articles :</label>
            <p v-for="(product, index) in facture.data().produits" v-bind:key="index">{{ product.nom }} / Quantité : {{ product.quantite }} / Total : {{product.total}} euros</p>
            <label class="card-title white-text">Montant total :</label>
            <p>{{facture.data().montantTotal}} euros.</p>
          </div>
          <div class="card-action">
            <button class="btn waves-effect waves-light red" @click="deletefacture(facture.id)">
              delete
              <i class="material-icons right">delete</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { facturesRef } from "@/firebase";

export default {
  data() {
    return {
      factures: [],
      facture: {
        fullName: "",
        mail: "",
        content: "",
        fullDate: ""
      }
    };
  },
  methods: {
    readData() {
      this.factures = [];
      facturesRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.factures.push(doc);
        });
      });
    },
    deletefacture(doc) {
      facturesRef
        .doc(doc)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.readData();
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  },
  created() {
    this.readData();
  }
};
</script>
<style>
.card .card-content {
  height: 300px;
  overflow: auto;
}

.title {
  font-size: 20px;
}
</style>