<template>
  <div id="nav">
    <p>Not registered? You can register in a moment!</p>

    <input type="text" v-model="name" placeholder="Name" />
    <br />
    <input type="text" v-model="lastname" placeholder="Lastname" />
    <br />
    <input type="email" v-model="email" placeholder="email" />
    <br />
    <input type="password" v-model="password" placeholder="password" />
    <br />

    <button @click="validatingData()">Join us!</button>
    <p class="pass">
      <router-link tag="button" :to="{ name: 'Home' }">Go back</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddClients",
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: "",
      createClient: false,
      errorMsg: false,
    };
  },
  methods: {
    sweetAlertRegister() {
      Swal.fire({
        title: "Check your email to verify your account",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    },
    validatingData() {
      if (
        this.name === "" ||
        this.lastname === "" ||
        this.email === "" ||
        this.password === ""
      ) {
        alert("no puedes dejar campos vacios");
        this.errorMsg = true;
        this.createClient = false;
      } else {
        this.errorMsg = false;
        this.createClient = true;
        this.newUser();
      }
    },
    newUser() {
      if (this.createClient === true) {
        var self = this;
        axios
          .post("http://localhost:3000/users", {
            name: self.name,
            lastname: self.lastname,
            email: self.email,
            password: self.password,
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log([error]);
          });

        this.createClient = false;
        this.name = "";
        this.lastname = "";
        this.email = "";
        this.password = "";
      } else {
        console.log("Yo no deberia estar aquí");
      }
      this.sweetAlertRegister();
    },
  },
};
</script>

<style scoped>
#nav {
  min-height: 100vh;
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

input[type="text"] {
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
