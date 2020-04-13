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
                <th>Modifier</th>
            </thead>
            <tbody>
                <tr v-for="(profile, index) in profiles" v-bind:key="index">
                    <td>{{ profile.data.mail }}</td>
                    <td>{{ profile.data.role }}</td>
                    <td><button class="btn waves-effect waves-light cyan" @click="editProfile(profile.id)">save<i class="material-icons right">save</i></button><button class="btn waves-effect waves-light red">cancel<i class="material-icons right">cancel</i></button></td>
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
</style>