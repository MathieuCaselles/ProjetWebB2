<template>
  <div id="authentification">
    <div id="Se connecter">
      <form @submit.prevent id="form-login">
        <h1>Se connecter</h1>

        <label for="email-login">Email conexion</label>
        <input v-model.trim="email_login" type="text" placeholder="Votre email" id="email-login" />

        <label for="password-login">Mot de passe</label>
        <input
          v-model.trim="password_login"
          type="password"
          placeholder="Mot de passe"
          id="password-login"
        />

        <button @click="login" class="button">Connexion</button>
        <span v-if="incorrect" id="incorrect" style="color: red">Email ou Mot de passe incorrect.</span>
      </form>
    </div>
    <div id="register">
      <form @submit.prevent id="form-register">
        <h1>S'inscrire</h1>

        <label for="email-register">Email</label>
        <input
          v-model.trim="email_register"
          type="text"
          placeholder="Votre email"
          id="email-register"
        />

        <label for="password-register">Password</label>
        <input
          v-model.trim="password_register"
          type="password"
          placeholder="mot de pass"
          id="password-register"
        />

        <button @click="register" class="button">Inscription</button>
      </form>
    </div>
  </div>
</template>

<script>
const firebase = require("../firebase.js");
export default {
  data() {
    return {
      email_login: "",
      password_login: "",
      email_register: "",
      password_register: "",
      incorrect: false
    };
  },
  methods: {
    login() {
      firebase.auth
        .signInWithEmailAndPassword(this.email_login, this.password_login)
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$router.push("/boutique");
        })
        .catch(() => {
          this.incorrect = true;
        });
    },
    register() {
      firebase.auth
        .createUserWithEmailAndPassword(
          this.email_register,
          this.password_register
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$router.push("/boutique");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
