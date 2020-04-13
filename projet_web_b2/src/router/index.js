import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authentification',
    name: 'Authentification',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Authentification.vue')
  },
  {
    path: '/boutique',
    name: 'Boutique',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Boutique.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/vendeurs',
    name: 'ListeVendeur',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ListeVendeur.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/produit',
    name: 'Products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Product.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/panier',
    name: 'Panier',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Panier.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/admin-produits',
    name: 'AdminProducts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AdminProduits.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin-stock',
    name: 'AdminGestionStock',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AdminGestionStock.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin-vendeur',
    name: 'AdminGestionVendeur',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AdminGestionVendeur.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/profil',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin-messages',
    name: 'AdminMessages',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AdminMessages.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin-profil',
    name: 'AdminProfil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AdminProfile.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/',
    name: 'Accueil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/admin-factures',
    name: 'AdminFacture',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AdminFacture.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser
  let profile = []
  const requiresAdmin = to.matched.some(x => x.meta.requiresAdmin)
  firebase.firestore().collection("profiles").doc(firebase.auth().currentUser.uid).get()
  .then(doc => profile.push(doc.data()))
  .then(() => {
    let currentRole = profile[0].role
    if (requiresAuth && !currentUser) {
      next('/authentification')
    } else if (requiresAdmin && currentRole != "admin") {
      next('/')
    } else {
      next()
  }
  })
  .catch(function(error) {
      console.log("Error getting document:", error);
  });
  
})

export default router
