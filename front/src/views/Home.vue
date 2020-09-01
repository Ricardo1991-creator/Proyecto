<template>
  <div id="nav">
    <div v-show="!logged" class="log">
      <input type="email" v-model="email" placeholder="email" />
      <br />
      <input type="password" v-model="password" placeholder="password" />
      <br />
      <button @click="loginUser()">Login</button>

      <p class="pass">
        <router-link to="/register">Not registered?</router-link>
        <br />
        <router-link to="/recover-password">Forgot your password?</router-link>
      </p>
    </div>
    <articlescom v-on:moneysList="getArticles" :moneys="moneys" />
    <div class="market">
      <img src="../assets/market.png" alt="imagen market" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import articlescom from "@/components/ArticlesCom.vue";
import { isLoggedIn, getName } from "../api/utils";

export default {
  name: "Home",
  components: {
    articlescom,
  },
  data() {
    return {
      logged: false,
      moneys: [],
      email: "",
      password: "",
      criterio: "",
    };
  },
  methods: {
    setUserName() {
      this.name = getName();
    },
    getLogin() {
      this.logged = isLoggedIn();
      this.setUserName();
    },
    //FUNCION  QUE ME MUESTRE LAS MONEDAS
    getArticles(search) {
      let self = this;
      let money_type = "";
      let locate = "";

      let params;

      //LLAMADA DE AXIOS A SERVER
      if (search.option === "money_type") {
        params = {
          money_type: search.value,
        };
      } else if (search.option === "locate") {
        params = {
          locate: search.value,
        };
      } else if (search.option === "minMax") {
        params = {
          price1: search.price1,
          price2: search.price2,
        };
      }
      axios
        .get("http://localhost:3000/articles", {
          params,
        })
        .then(function(response) {
          console.log(response);
          self.moneys = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //FUNCION PARA LOGEAR
    loginUser() {
      if (this.email === "" || this.password === "") {
        alert("Te faltan datos");
      } else {
        let self = this;
        // LLAMADA DE AXIOS A LA API
        axios
          .post("http://localhost:3000/users/login", {
            email: self.email,
            password: self.password,
          })
          .then((response) => {
            let token = response.data.data.token;
            let role = response.data.data.dbUser[0].role;
            let name = response.data.data.dbUser[0].name;
            localStorage.setItem("AUTH_TOKEN_KEY", token);
            localStorage.setItem("ROLE", role);
            localStorage.setItem("NAME", name);

            this.$router.push("/");

            this.$emit("login");

            // PARA QUE NO SALGA UN ERROR HACIENDO LOGIN
          })
          .catch(() => {
            console.log(error);
          });
      }
      setTimeout(() => {
        location.reload();
      }, 100);
    },
  },
  created() {
    this.getLogin();
  },
};
</script>

<style scoped>
#nav {
  min-height: 200px;
}
#nav p.pass {
  color: white;
  margin-bottom: -10px;
}
#nav p.pass :visited {
  color: white;
}
#nav p.pass :hover {
  color: yellow;
}

.market img {
  width: 50%;
}

input[type="email"] {
  width: 170px;
  margin: 10px;
  padding: 10px 16px;
  border-radius: 32px;
  outline: none;
  border: 2px solid #ccd1d1;
  background-color: transparent;
  color: white;
  transition: all 0.5s;
}
input[type="email"]:focus {
  background: transparent;
  width: 200px;
}

input[type="password"] {
  width: 170px;
  margin: 10px;
  padding: 10px 16px;
  border-radius: 32px;
  outline: none;
  border: 2px solid #ccd1d1;
  background-color: transparent;
  color: white;
  transition: all 0.5s;
}
input[type="password"]:focus {
  background: transparent;
  width: 200px;
}

@media (min-width: 700px) {
  html {
    font-size: 22px;
  }

  .cuadro {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    list-style: none;
    font-weight: bold;
  }
}

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
</style>
