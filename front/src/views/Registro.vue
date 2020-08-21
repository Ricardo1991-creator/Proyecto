<template>
  <div>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddClients",
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: "",
      createClient: false,
      errorMsg: false
    };
  },
  methods: {
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
            password: self.password
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
    }
  }
};
</script>

<style scoped>
</style>