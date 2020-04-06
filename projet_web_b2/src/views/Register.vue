<template>
  <div>
    <form @submit.prevent>
      <h1>Register</h1>

      <label for="email">Email</label>
      <input v-model.trim="email" type="text" placeholder="Votre email" id="email" />

      <label for="password">Password</label>
      <input v-model.trim="password" type="password" placeholder="mot de pass" id="password" />

      <button @click="register" class="button">Register</button>
    </form>
  </div>
</template>

<script>
const firebase = require("../firebase.js");
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      firebase.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$router.push("/about");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
