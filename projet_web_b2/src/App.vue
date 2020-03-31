<template>
  <div id="app">
    <nav id="nav">
      <div class="nav-wrapper green app">
        <router-link to="/" class="brand-logo green">Shop Project</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down green darken-2">
          <li>
            <router-link class="waves-effect waves-light btn green" to="/">
              Accueil
              <i class="material-icons right">home</i>
            </router-link>
          </li>
          <li>
            <router-link class="waves-effect waves-light btn green" to="/boutique">
              Boutique
              <i class="material-icons right">shopping_cart</i>
            </router-link>
          </li>
          <li>
            <router-link class="waves-effect waves-light btn green" to="/register">
              Login
              <i class="material-icons right">account_circle</i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>