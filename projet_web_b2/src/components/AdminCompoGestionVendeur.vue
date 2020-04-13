<template>
  <div>
    <div class="row center-align">
      <div class="col s6 limiterProduits">
        <div class="card green darken-4">
          <div class="card-content white-text">
            <span class="card-title white-text">Info vendeur</span>
            <div class="row">
              <div class="row">
                <div class="col s6">
                  <label class="active white-text" for="name">Nom :</label>
                  <input class="white-text" type="text" ref="vendeurNom" :value="vendeur.data.nom" />
                </div>
                <div class="col s6">
                  <label class="active white-text" for="name">Adresse :</label>
                  <input
                    class="white-text"
                    type="text"
                    ref="vendeurAdresse"
                    :value="vendeur.data.adresse"
                  />
                </div>
                <div class="col s12">
                  <label class="active white-text" for="name">Horaires :</label>
                  <input
                    class="white-text"
                    type="text"
                    ref="vendeurHoraire"
                    :value="vendeur.data.horaire"
                  />
                </div>
                <br />
                <div class="col s12">
                  <label class="active white-text" for="message">description :</label>
                  <textarea
                    id="message"
                    class="materialize-textarea white-text"
                    ref="vendeurDescription"
                    :value="vendeur.data.description"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="card-action">
              <button class="btn waves-effect waves-light left" @click="updateVendeur(vendeur.id)">
                Mettre à jour
                <i class="material-icons right">loop</i>
              </button>

              <button
                class="btn waves-effect waves-light right red"
                @click="deleteVendeur(vendeur.id)"
              >
                Supprimer
                <i class="material-icons right">delete</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col s6 limiterProduits">
        <div class="card green darken-4">
          <div class="card-content white-text">
            <span class="card-title white-text">Ajouter un vendeur</span>
            <div class="row">
              <div class="row">
                <div class="col s6">
                  <label class="active white-text" for="name">Nom :</label>
                  <input class="white-text" type="text" ref="addVendeurNom" />
                </div>
                <div class="col s6">
                  <label class="active white-text" for="name">Adresse :</label>
                  <input class="white-text" type="text" ref="addVendeurAdresse" />
                </div>
                <div class="col s6">
                  <label class="active white-text" for="name">Mail Vendeur :</label>
                  <select v-model="vendeurInfo">
                    <option disabled selected>Choisissez le mail du vendeur</option>
                    <option v-for="(vendeur, index) in vendeurs" v-bind:key="index" v-bind:value="vendeur.id"> {{vendeur.data().mail}}</option>
                  </select>
                </div>
                <div class="col s6">
                  <label class="active white-text" for="name">Horaires :</label>
                  <input class="white-text" type="text" ref="addVendeurHoraire" />
                </div>
                <br />
                <div class="col s12">
                  <label class="active white-text" for="message">description :</label>
                  <textarea
                    id="message"
                    class="materialize-textarea white-text"
                    ref="addVendeurDescription"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="card-action">
              <button class="btn waves-effect waves-light right green" @click="ajouterVendeur">
                Ajouter
                <i class="material-icons right">add</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, vendeursRef } from "@/firebase";
export default {
  props: {
    vendeur: Object,
  },
  data(){
    return{
      vendeurs: [],
      vendeurInfo:{
        id: "",
      }
    }
  },
  methods: {
    ajouterVendeur() {
      db.collection("vendeur")
        .add({
          nom: this.$refs.addVendeurNom.value,
          adresse: this.$refs.addVendeurAdresse.value,
          horaire: this.$refs.addVendeurHoraire.value,
          description: this.$refs.addVendeurDescription.value
        })
        .then(() => {
          this.$router.go();
        });
    },
    updateVendeur(vendeurId) {
      db.collection("vendeur")
        .doc(vendeurId)
        .update({
          nom: this.$refs.vendeurNom.value,
          adresse: this.$refs.vendeurAdresse.value,
          horaire: this.$refs.vendeurHoraire.value,
          description: this.$refs.vendeurDescription.value
        })
        .then(() => {
          this.$router.go();
        });
    },
    deleteVendeur(vendeurId) {
      if (confirm("Voulez-vous vraiment supprimer ce vendeur ?")) {
        db.collection("vendeur")
          .doc(vendeurId)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
            this.$router.go();
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
    },
    readData() {
      this.vendeurs = [];
      vendeursRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.vendeurs.push(doc);
        });
      });
    },
  }, 
  created(){
    this.readData();
  }
};
</script>
<style>
textarea {
  height: 20rem !important;
}
select{
  display: inline;
}
</style>