<template>
    <div class="row center-align">
        <div class="col s6">
            <div class="card green">
                <div class="card-content white-text">
                    <span class="card-title">Votre profil :</span>
                    <div class="row">
                        <form class="col s12">
                        <div class="row">
                            <div class="input-field col s6 white-text">
                                <input class="white-text" id="name" type="text" v-model="profile.lastName" required>
                                <label class="white-text active" for="name">Nom :</label>
                            </div>
                            <div class="input-field col s6">
                                <input class="white-text" id="name" type="text" v-model="profile.firstName" required>
                                <label class="white-text active" for="name">Prénom :</label>
                            </div>
                        </div>
                        <div class="row">
                            <p class="card-title">Adresse complète:</p>
                            <div class="input-field col s6 white-text">
                                <input class="white-text" id="name" type="text" v-model="profile.fullAddress.address" required>
                                <label class="white-text active" for="name">Adresse :</label>
                            </div>
                            <div class="input-field col s6">
                                <input class="white-text" id="name" type="text" v-model="profile.fullAddress.postalCode" required>
                                <label class="white-text active" for="name">Code postal :</label>
                            </div>
                            <div class="input-field col s6">
                                <input class="white-text" id="email" type="email" v-model="profile.fullAddress.city"/> 
                                <label class="white-text active" for="email">Ville :</label>
                            </div>
                            <div class="input-field col s6">
                                <input class="white-text" id="email" type="email" v-model="profile.fullAddress.country"/> 
                                <label class="white-text active" for="email">Pays :</label>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <div class="card-action">
                    <button class="btn waves-effect waves-light" @click="updateProfile">Save changes
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
        <div class="col s6">
            <div class="card green">
                <div class="card-content white-text">
                    <span class="card-title">Votre profil :</span>
                    <div class="row">
                        <form class="col s12" v-for="(profile, index) in profileList" v-bind:key="index">
                        <div class="row">
                            <div class="col s6 white-text">
                                <p class="white-text" for="name">Nom :</p>
                                <p v-if="profile.lastName">{{ profile.lastName }}</p>
                                <p v-else>N/A</p>
                            </div>
                            <div class="col s6">
                                <p class="white-text" for="name">Prénom :</p>
                                <p v-if="profile.firstName">{{ profile.firstName }}</p>
                                <p v-else>N/A</p>
                            </div>
                        </div>
                        <div class="row">
                            <p class="card-title">Adresse complète:</p>
                            <div class="col s6 white-text">
                                <p class="white-text" for="name">Adresse :</p>
                                <p v-if="profile.fullAddress.address">{{ profile.fullAddress.address }}</p>
                                <p v-else>N/A</p>
                            </div>
                            <div class="col s6">
                                <p class="white-text" for="name">Code Postal :</p>
                                <p v-if="profile.fullAddress.postalCode">{{ profile.fullAddress.postalCode }}</p>
                                <p v-else>N/A</p>
                            </div>
                            <div class="col s6">
                                <p class="white-text" for="name">Ville :</p>
                                <p v-if="profile.fullAddress.city">{{ profile.fullAddress.city }}</p>
                                <p v-else>N/A</p>
                            </div>
                            <div class="col s6">
                                <p class="white-text" for="name">Pays :</p>
                                <p v-if="profile.fullAddress.country">{{ profile.fullAddress.country }}</p>
                                <p v-else>N/A</p>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db, auth } from "@/firebase";

export default {
    data(){
         return{
            profile:{
                lastName:"",
                firstName: "",
                fullAddress:{
                    address:"",
                    postalCode: "",
                    city: "",
                    country: "",
                },
                balance: "",
            },
            errors: [],
            profileList: []
        }
    },
    methods:{
        updateProfile(){
            db.collection("profiles").doc(auth.currentUser.uid).update(this.profile);
            this.readData()
            alert('Profil bien mis à jour !')
        },
        readData() {
            this.profileList = [];
            db.collection("profiles").doc(auth.currentUser.uid).get()
            .then(doc => this.profileList.push(doc.data()))
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
    },
    created(){
        this.readData()
    }
}
</script>

<style>
.row .input-field input:focus {
border-bottom: 1px solid white !important;
box-shadow: 0 1px 0 0 white !important
}

.row .input-field input:defined {
    border-bottom: 1px solid white !important;
    box-shadow: 0 1px 0 0 white !important
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
   box-shadow: 0 1px 0 0 white !important
 }
</style>