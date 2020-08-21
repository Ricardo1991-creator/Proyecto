<template>
  <div class="newPassword">
    <h1>Forgot your password? No worries!</h1>

    <input type="email" placeholder="email" v-model="email" />
    <br />
    <button @click="recoverPassword()">Recover it</button>
    <br />

    <h3>Insert here the code that you recived on your mail and write your new password !</h3>
    <input type="text" placeholder="Code" v-model="recoverCode" />
    <br />
    <input type="password" placeholder="New Password" v-model="newPassword" />
    <br />
    <button @click="resetPassword()">Validate it</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecoverPassword",
  data() {
    return {
      email: "",
      recoverCode: "",
      newPassword: ""
    };
  },
  methods: {
    //FUNCION PARA ENVIAR EL CODIGO DE RECUPERACION DE LA CONTRASEÑA
    async recoverPassword() {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/recover-password",
          {
            email: this.email
          }
        );

        console.log(response);
      } catch (error) {
        console.log(error.response.data);
      }
    },
    //FUNCION PARA INTRODUCIR UNA NUEVA PASSWORD
    async resetPassword() {
      try {
        const response = await axios.post("http://localhost:3000/users/reset", {
          recoverCode: this.recoverCode,
          newPassword: this.newPassword
        });

        console.log(response);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }
};
</script>

