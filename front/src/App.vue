<template>
  <div id="app">
    <div class="nav">
      <router-link v-show="logged" :to="{ name: 'Home' }">Home</router-link>
      <router-link v-show="logged" :to="{ name: 'Articles' }"
        >Marketplace</router-link
      >
      <router-link v-show="logged" to="/newmoney">New currency</router-link>
      <router-link to="/about">About</router-link>

      <div class="logoutAndProfile">
        <router-link
          class="profile"
          tag="button"
          v-show="logged"
          :to="{ name: 'GetUser' }"
          >Profile</router-link
        >
        <button
          class="gg-log-off"
          v-show="logged"
          @click="logoutUser()"
        ></button>
      </div>
    </div>

    <div>
      <a href="/">
        <img src="./assets/logo2.png" />
      </a>
    </div>

    <div class="title">
      <p v-show="!logged">"Manage your money in an easy way"</p>
    </div>

    <!-- Vista del usuario cuando hace login -->

    <div id="miperfil">
      <p v-show="logged">
        Welcome
        <router-link :to="{ name: 'GetUser' }">
          <b>{{ name }}</b> </router-link
        >!
      </p>
    </div>

    <!-- Pagina principal -->

    <router-view @login="getLogin()" @logout="logoutUser" />
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
    footercom,
  },
  data() {
    return {
      username: "",
      name: "",
      logged: false,
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
    loginUser() {
      this.getLogin();
      this.$router.push("/");
    },
    getLogin() {
      this.logged = isLoggedIn();
      this.setUserName();
    },
  },
  created() {
    this.getLogin();
    this.setUserName();
  },
};
</script>
<style>
@import url("https://css.gg/log-off.css");
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Saira:wght@200&display=swap");

#app {
  font-family: "Saira", sans-serif;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-image: url("https://images.unsplash.com/photo-1500316124030-4cffa46f10f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

/* Style the navbar */
.nav {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgb(32, 29, 29);
}

/* Navbar links */
.nav a {
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 14px 18px;
  text-decoration: none;
  font-size: 17px;
}

.title p {
  font-family: "Saira", sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 30px;
  font-style: italic;
}

/* Navbar links on mouse-over */
.nav a:hover {
  background-color: none;
  color: white;
  text-decoration: underline;
}

/* Style the input container */
.nav .logoutAndProfile {
  display: flex;
  flex-direction: row;
  justify-content: right;
}

.nav .logoutAndProfile button.profile {
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 6px;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
  cursor: pointer;
}

.nav .logoutAndProfile button:hover {
  background: red;
}
/* Boton search */

button {
  font-family: "Saira", sans-serif;
  width: 65px;
  height: 30px;
  background: transparent;
  border-radius: 10px;
  border: 2px solid yellow;
  font-weight: bold;
  color: yellow;
}

/* Boton logout */

.logoutAndProfile .gg-log-off {
  box-sizing: border-box;
  border-radius: 16px;
  border: 2px solid;
  transform: scale(var(--ggs, 1));
  width: 20px;
  height: 20px;
  border-top: 2px solid transparent;
}
.logoutAndProfile .gg-log-off::before {
  content: "";
  border-radius: 6px;
  height: 10px;
  width: 2px;
  background: currentColor;
  bottom: 8px;
  margin-left: 2px;
}
button {
  font-family: "Saira", sans-serif;
  font-size: 12px;
  width: 50px;
  height: 25px;
  border-radius: 10px;
  color: rgb(243, 85, 85);
  background: none;
  margin-top: 18px;
}

/* Boton profile */
.logoutAndProfile button.profile {
  display: flex;
  flex-direction: row;
  font-family: "Saira", sans-serif;
  width: 70px;
  height: 40px;
  background: none;
  border-radius: 10px;
  border: 3px solid white;
  font-weight: bold;
  color: white;
}

#miperfil p a:visited {
  color: yellow;
}

@media (min-width: 500px) {
  html {
    font-size: 22px;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .nav {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: left;
    background-color: rgb(32, 29, 29);
  }
}

@media (min-width: 700px) {
  html {
    font-size: 22px;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .nav {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: left;
    background-color: rgb(32, 29, 29);
  }
}

@media (max-width: 1100px) {
  html {
    font-size: 27px;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .nav {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: left;
    background-color: rgb(32, 29, 29);
  }
}
</style>
