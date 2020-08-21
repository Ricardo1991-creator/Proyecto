<template>
  <div id="app">
    <!-- Pagina principal -->
    <div id="nav">
      <div class="but">
        <router-link tag="button" v-show="logged" :to="{ name: 'GetUser' }">Profile</router-link>
        <button v-show="logged" @click="logoutUser()">Logout</button>
      </div>

      <h1>HACK A MON€Y</h1>
      <router-link :to="{ name: 'Home' }">Home</router-link>-
      <router-link to="/register">Join us</router-link>
      <router-link v-show="logged" :to="{ name: 'Articles' }">- Articles</router-link>
      <router-link v-show="logged" to="/newmoney">- New article</router-link>
    </div>

    <!-- Vista del usuario cuando hace login -->
    <div id="miperfil">
      <p v-show="logged">
        Wellcome
        <router-link :to="{ name: 'GetUser' }">
          <b>{{ name }}</b>
        </router-link>!
      </p>
    </div>
    <router-view />

    <footercom />
  </div>
</template>

<script>
import footercom from "@/components/FooterCom.vue";
import { Logout, logout } from "./api/utils";
import { getName } from "./api/utils";
import { isLoggedIn } from "./api/utils";
export default {
  name: "App",
  components: {
    footercom
  },
  data() {
    return {
      username: "",
      name: "",
      logged: false
    };
  },
  methods: {
    setUserName() {
      this.name = getName();
    },
    logoutUser() {
      logout();
      this.$router.push("/");
      location.reload();
    },
    getLogin() {
      this.logged = isLoggedIn();
    }
  },
  created() {
    this.getLogin();
    this.setUserName();
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Saira:wght@200&display=swap");

* {
  max-width: 100%;
}

#app {
  font-family: "Saira", sans-serif;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav h1 {
  font-family: "Comfortaa", cursive;
  font-size: 40px;
}

#nav a {
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: yellow;
}

#nav div.but {
  display: flex;
  text-align: center;
  justify-content: space-between;
}

#miperfil p a:visited {
  color: yellow;
}

@media (min-width: 700px) {
  html {
    font-size: 22px;
  }
}

@media (min-width: 1000px) {
  html {
    font-size: 27px;
  }
}
</style>
