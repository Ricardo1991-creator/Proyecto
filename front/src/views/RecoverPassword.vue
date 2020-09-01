<template>
  <div id="nav">
    <div class="newPassword">
      <h3>Forgot your password? No worries!</h3>

      <input
        type="email"
        placeholder="Insert here your email"
        v-model="email"
      />
      <br />
      <button @click="recoverPassword()">Go!</button>
      <br />

      <h6>
        Insert here the code that you recived on your mail and write your new
        password !
      </h6>
      <input type="text" placeholder="Insert your code" v-model="recoverCode" />
      <br />
      <input
        type="password"
        placeholder="cNew Password"
        v-model="newPassword"
      />
      <br />
      <button @click="resetPassword()">Validate</button>
    </div>
    <p class="pass">
      <router-link tag="button" :to="{ name: 'Home' }">Go back</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "RecoverPassword",
  data() {
    return {
      email: "",
      recoverCode: "",
      newPassword: "",
    };
  },
  methods: {
    sweetAlertGetCode() {
      Swal.fire({
        title: "We send a code to recover your password! Check your mail!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    },
    sweetAlertOKPassword() {
      Swal.fire({
        title: "Password Changed",
        text: "Successfully created password",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    //FUNCION PARA ENVIAR EL CODIGO DE RECUPERACION DE LA CONTRASEÑA
    async recoverPassword() {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/recover-password",
          {
            email: this.email,
          }
        );

        console.log(response);
      } catch (error) {
        console.log(error.response.data);
      }
      this.sweetAlertGetCode();
    },
    //FUNCION PARA INTRODUCIR UNA NUEVA PASSWORD
    async resetPassword() {
      try {
        const response = await axios.post("http://localhost:3000/users/reset", {
          recoverCode: this.recoverCode,
          newPassword: this.newPassword,
        });

        console.log(response);
      } catch (error) {
        console.log(error.response.data);
      }
      this.sweetAlertOKPassword();
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
button {
  font-family: "Saira", sans-serif;
  width: 70px;
  height: 45px;
  background: transparent;
  border-radius: 10px;
  border: 2px solid yellow;
  font-weight: bold;
  color: yellow;
}

.pass button {
  font-family: "Saira", sans-serif;
  width: 60px;
  height: 30px;
  border-radius: 10px;
  font-weight: bold;
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
</style>
