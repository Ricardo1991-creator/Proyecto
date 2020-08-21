<template>
  <div>
    <p>User login</p>
    <div class="log">
      <input type="email" v-model="email" placeholder="email" />
      <br />
      <input type="password" v-model="password" placeholder="password" />
      <br />
      <button @click="loginUser()">Login</button>
    </div>

    <p class="pass">
      <router-link to="/recover-password">Forgot your password?</router-link>
    </p>
    <div>
      <articlescom v-on:moneysList="getArticles" :moneys="moneys" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import articlescom from "@/components/ArticlesCom.vue";

export default {
  name: "Home",
  components: {
    articlescom,
  },
  data() {
    return {
      moneys: [],
      email: "",
      password: "",
      criterio: "",
    };
  },
  methods: {
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
          .then(function(response) {
            let token = response.data.data.token;
            let role = response.data.data.dbUser[0].role;
            let name = response.data.data.dbUser[0].name;
            localStorage.setItem("AUTH_TOKEN_KEY", token);
            localStorage.setItem("ROLE", role);
            localStorage.setItem("NAME", name);

            // PARA QUE NO SALGA UN ERROR HACIENDO LOGIN
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      setTimeout(() => {
        location.reload();
      }, 100);
    },
  },
};
</script>

<style scoped>
div.log {
  margin-bottom: 5px;
}
p.pass {
  color: white;
  margin-bottom: -10px;
}

p.pass :visited {
  color: white;
}
p.pass :hover {
  color: yellow;
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
  background: yellow;
  border-radius: 10px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
