<template>
  <div class="row center-align">
    <div class="col s6 offset-s3">
      <div class="card green">
        <div class="card-content white-text">
          <span class="card-title">Votre profil :</span>
          <div class="row">
            <form class="col s12" v-for="(profile, index) in profileList" v-bind:key="index">
              <div class="row">
                <div class="input-field col s6 white-text">
                  <input
                    class="white-text"
                    id="name"
                    type="text"
                    ref="profilNom"
                    :value="profile.lastName"
                    required
                  />
                  <label class="white-text active" for="name">Nom :</label>
                </div>
                <div class="input-field col s6">
                  <input
                    class="white-text"
                    id="name"
                    type="text"
                    ref="profilPrenom"
                    :value="profile.firstName"
                    required
                  />
                  <label class="white-text active" for="name">Prénom :</label>
                </div>
              </div>
              <div class="row">
                <p class="card-title">Adresse complète:</p>
                <div class="input-field col s6 white-text">
                  <input
                    class="white-text"
                    id="name"
                    type="text"
                    ref="profilAdresse"
                    :value="profile.fullAddress.address"
                    required
                  />
                  <label class="white-text active" for="name">Adresse :</label>
                </div>
                <div class="input-field col s6">
                  <input
                    class="white-text"
                    id="name"
                    type="text"
                    ref="profilCodePostal"
                    :value="profile.fullAddress.postalCode"
                    required
                  />
                  <label class="white-text active" for="name">Code postal :</label>
                </div>
                <div class="input-field col s6">
                  <input
                    class="white-text"
                    id="email"
                    type="email"
                    ref="profilVille"
                    :value="profile.fullAddress.city"
                  />
                  <label class="white-text active" for="email">Ville :</label>
                </div>
                <div class="input-field col s6">
                  <input
                    class="white-text"
                    id="email"
                    type="email"
                    ref="profilPays"
                    :value="profile.fullAddress.country"
                  />
                  <label class="white-text active" for="email">Pays :</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card-action">
          <button class="btn waves-effect waves-light" @click="updateProfile">
            Save changes
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebase";

export default {
  data() {
    return {
      errors: [],
      profileList: []
    };
  },
  methods: {
    updateProfile() {
      const profile = {
        lastName: this.$refs.profilNom[0].value,
        firstName: this.$refs.profilPrenom[0].value,
        fullAddress: {
          address: this.$refs.profilAdresse[0].value,
          postalCode: this.$refs.profilCodePostal[0].value,
          city: this.$refs.profilVille[0].value,
          country: this.$refs.profilPays[0].value
        },
        balance: this.profileList[0].balance
      };
      db.collection("profiles")
        .doc(auth.currentUser.uid)
        .update(profile);
      this.readData();
      alert("Profil bien mis à jour !");
    },
    readData() {
      this.profileList = [];
      db.collection("profiles")
        .doc(auth.currentUser.uid)
        .get()
        .then(doc => this.profileList.push(doc.data()))
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },
  created() {
    this.readData();
  }
};
</script>

<style>
.row .input-field input:focus {
  border-bottom: 1px solid white !important;
  box-shadow: 0 1px 0 0 white !important;
}

.row .input-field input:defined {
  border-bottom: 1px solid white !important;
  box-shadow: 0 1px 0 0 white !important;
}

.btn-block {
  width: 100%;
}

.input-field input:focus + label {
  color: white !important;
}
/* label underline focus color */
.row .input-field input:focus {
  border-bottom: 1px solid white !important;
  box-shadow: 0 1px 0 0 white !important;
}
</style>