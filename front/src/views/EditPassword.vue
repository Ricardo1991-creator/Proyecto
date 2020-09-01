<template>
  <div id="newPassword">
    <h1>Edit your password</h1>

    <div class="pass">
      <label for="Old password">Insert here your current password</label>
      <br />
      <input type="password" placeholder=" Old password" v-model="oldPassword" />
      <br />
      <label for="New password">Insert here your new password</label>
      <br />
      <input type="password" placeholder=" New password" v-model="newPassword" />
      <br />
      <button @click="updatePassword()">Update your password</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getIdToken } from "../api/utils";
import Swal from "sweetalert2";

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
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are going to use this new password!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, use it!"
      });
      if (result.value) {
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
          Swal.fire(
            "Password changed!",
            "Your password has been changed.",
            "success"
          );
          console.log(response);
          this.$emit("logout", false);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }
  }
};
</script>

<style scoped>
#newPassword {
  height: 100vh;
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
}

button {
  font-family: "Saira", sans-serif;
  width: 90px;
  height: 50px;
  margin-top: 1rem;
  background: transparent;
  border-radius: 10px;
  border: 2px solid yellow;
  font-weight: bold;
  color: yellow;
}
@media (min-width: 300px) {
  html {
    font-size: 12px;
  }

  h1 {
    font-size: 30px;
  }
  label {
    font-size: 20px;
  }
}
@media (min-width: 600px) {
  html {
    font-size: 10px;
  }
  h1 {
    font-size: 40px;
  }
  label {
    font-size: 20px;
  }
}
@media (min-width: 1000px) {
  html {
    font-size: 22px;
  }
}
</style>
