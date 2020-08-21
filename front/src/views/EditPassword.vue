<template>
  <div class="newPassword">
    <h1>Edit your password</h1>

    <input type="password" placeholder=" Old password" v-model="oldPassword" />
    <br />
    <input type="password" placeholder=" New password" v-model="newPassword" />
    <br />
    <button @click="updatePassword()">Update your password</button>
  </div>
</template>

<script>
import axios from "axios";
import { getIdToken } from "../api/utils";

export default {
  name: "EditPassword",
  data() {
    return {
      oldPassword: "",
      newPassword: ""
    };
  },
  methods: {
    //FUNCION PARA MONSTRAR LA ANTIGUA CONTRASEÑA DEL USUARIO
    showOldPassword(datosUsuario) {
      this.showOldPassword = datosUsuario.password;
    },
    //FUNCION PARA ACTUALIZAR LA CONTRASEÑA
    async updatePassword() {
      try {
        let token = localStorage.getItem("AUTH_TOKEN_KEY");
        axios.defaults.headers.common["Authorization"] = `${token}`;

        const response = await axios.put(
          "http://localhost:3000/users/" + getIdToken(token) + "/password",
          {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          }
        );

        console.log(response);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }
};
</script>

<style>
</style>