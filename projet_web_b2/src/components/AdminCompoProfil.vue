<template>
    <div>
  <div class="row">
    <div class="col s6 offset-s3">
      <div class="card green">
        <div class="card-content white-text">
          <table>
            <thead>
                <th>Mail</th>
                <th>Role</th>
                <th>Solde</th>
                <th>Modifier</th>
            </thead>
            <tbody>
                <tr v-for="(profile, index) in profiles" v-bind:key="index">
                    <td>{{ profile.data.mail }}</td>
                    <td v-if="!profile.data.edit">{{ profile.data.role }}</td>
                    <td v-else>
                        <select v-model="profile.role">
                            <option id="utilisateur">utilisateur</option>
                            <option id="vendeur">vendeur</option>
                            <option id="admin">admin</option>
                            <option id="banni">banni</option>
                        </select>
                    </td>
                    <td v-if="!profile.data.edit">{{ profile.data.balance }}</td>
                    <td v-else><input class="white" type="number" v-model="profile.balance"></td>
                    <td v-if="!profile.data.edit"><button class="btn waves-effect waves-light cyan" @click="editProfile(profile.id)">edit<i class="material-icons right">save</i></button></td>
                    <td v-else><button class="btn waves-effect waves-light cyan" @click="saveEdit(profile)">save<i class="material-icons right">save</i></button><button class="btn waves-effect waves-light red" @click="cancelEdit(profile.id)">cancel<i class="material-icons right">cancel</i></button></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { profilesRef } from "@/firebase"
export default {
    data(){
        return{
            profile: {
                fullName: "",
                mail: "",
                content: "",
                fullDate: "",
                edit: "",
                balance:""
            }
        }
    },
    computed: {
        profiles: function() {
            return this.$store.state.profiles;
        }
  },
    methods:{
        readData() {
            this.profiles = [];
            profilesRef.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                this.profiles.push(doc);
                });
            });
        },
        editProfile(doc) {
            profilesRef
            .doc(doc)
            .update({ edit: true })
            .then(() => {
            this.$store.commit("updateProfiles");
            });
        },
        cancelEdit(doc) {
        profilesRef
            .doc(doc)
            .update({ edit: false })
            .then(() => {
            this.$store.commit("updateProfiles");
            });
        },
        saveEdit(profile) {
            const key = profile.id;
            profilesRef
                .doc(key)
                .update({
                role: profile.role,
                balance: profile.balance,
                edit: false
                })
                .then(() => {
                this.$store.commit("updateProfiles");
                });
    }
    },
    created(){
        this.$store.commit("updateProfiles");
    }
}
</script>
<style>
td select {
    border: none;
}

select{
    display:inline;
}
</style>