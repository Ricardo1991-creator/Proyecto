<template>
  <div class="clientes">
    <!-- MODAL PARA ACTUALIZAR EL CLIENTE -->

    <h3>My Profile</h3>
    <div class="avatar">
      <img src="../assets/avatar.png" alt="Avatar" />
    </div>
    <router-link tag="button" :to="{ name: 'EditPassword' }"
      >Edit Password</router-link
    >

    <router-link tag="button" :to="{ name: 'UserBookings' }"
      >My bookings</router-link
    >

    <router-link tag="button" :to="{ name: 'UserArticles' }"
      >My articles</router-link
    >
    <div class="datos">
      <label for="Name">Name</label>
      <input type="text" placeholder=" Name" v-model="name" />
      <br />
      <label for="lastname">Lastname</label>
      <input type="text" placeholder="lastname" v-model="lastname" />
      <br />
      <label for="Username">Username</label>
      <input type="text" placeholder="Username" v-model="username" />
      <br />
      <label for="dni">DNI</label>
      <input type="text" placeholder="dni" v-model="dni" />
      <br />
      <label for="adress">Adress</label>
      <input type="text" placeholder="adress" v-model="address" />
      <br />
      <label for="Code Post">Zip code</label>
      <input type="text" placeholder="Code Post" v-model="zipcode" />
      <br />
      <label for="City">City</label>
      <input type="text" placeholder="City" v-model="city" />
      <br />
      <label for="Phone">Phone</label>
      <input type="text" placeholder="Phone" v-model="telephone" />
      <br />
      <label for="Account Number">Account Number</label>
      <input type="text" placeholder="Account Number" v-model="bankaccount" />
      <br />
      <label for="Email">Email</label>
      <input type="email" placeholder="email" v-model="email" />

      <button @click="updateUser()">Update User</button>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { isLoggedInUser } from "../api/utils";
import { getIdToken } from "../api/utils";
import Swal from "sweetalert2";

export default {
  name: "getUser",
  data() {
    return {
      user: [],
      name: "",
      lastname: "",
      dni: "",
      address: "",
      zipcode: "",
      city: "",
      telephone: "",
      bankaccount: "",
      username: "",
      email: "",
      idUser: "",
    };
    console.log(data);
  },
  methods: {
    sweetAlertUpdate() {
      Swal.fire({
        title: "Update Data",
        text: "Successfully updated",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    //FUNCION PARA OBTENER USUARIO
    getUser() {
      let token = localStorage.getItem("AUTH_TOKEN_KEY");
      axios.defaults.headers.common["Authorization"] = `${token}`;
      //LLAMADA AXIOS A LA API
      axios
        .get("http://localhost:3000/users/" + getIdToken(token))
        .then((response) => {
          this.idUser = response.data.data.id;
          this.user = response.data.data;
          this.name = response.data.data[0].name;
          this.lastname = response.data.data[0].lastname;
          this.dni = response.data.data[0].dni;
          this.address = response.data.data[0].address;
          this.zipcode = response.data.data[0].zip_code;
          this.city = response.data.data[0].city;
          this.telephone = response.data.data[0].telephone;
          this.bankaccount = response.data.data[0].bank_account;
          this.username = response.data.data[0].user_name;
          this.email = response.data.data[0].email;
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          this.msg = error.response.data.message;
        });
    },
    //MOSTRAR infomracion de los clientes
    mostrarInfoCliente(datosCliente) {
      this.nameUpdated = datosCliente.nombre;
      this.lastnameUpdated = datosCliente.lastname;
      this.dniUpdated = datosCliente.dni;
      this.addressUpdated = datosCliente.address;
      this.zipcodeUpdated = datosCliente.zipcode;
      this.cityUpdated = datosCliente.city;
      this.telephoneUpdated = datosCliente.telephone;
      this.bankaccountUpdated = datosCliente.bankaccount;
      this.usernameUpdated = datosCliente.username;
      this.emailUpdated = datosCliente.email;
      this.idCliente = datosCliente.id;

      this.seeModal = true;
    },
    //ACTUALIZAMOS CLIENTE
    updateUser() {
      let token = localStorage.getItem("AUTH_TOKEN_KEY");
      axios.defaults.headers.common["Authorization"] = `${token}`;
      axios
        .put("http://localhost:3000/users/update/" + getIdToken(token), {
          name: this.name,
          lastname: this.lastname,
          dni: this.dni,
          address: this.address,
          zipcode: this.zipcode,
          city: this.city,
          telephone: this.telephone,
          bankaccount: this.bankaccount,
          username: this.username,
          email: this.email,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response.data);
        });
      this.sweetAlertUpdate();
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style scoped>
div.datos {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin: auto;
  border: solid 2px white;
  background-color: rgba(110, 101, 101, 0.35);
}

.datos input[type="email"] {
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
.datos input[type="text"] {
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
  width: 70px;
  height: 45px;
  margin: 20px;
  background: transparent;
  border-radius: 10px;
  border: 2px solid yellow;
  font-weight: bold;
  color: yellow;
}

@media (min-width: 300px) {
  .avatar img {
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid white;
  }
  div.datos label {
    font-size: 20px;
  }
  div.datos {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 250px;
    margin: auto;
    border: solid 2px white;
    background-color: rgba(110, 101, 101, 0.35);
  }
}
@media (min-width: 500px) {
  .avatar img {
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    order: 2px solid white;
  }
  div.datos label {
    font-size: 20px;
  }
  div.datos {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
    border: solid 2px white;
    background-color: rgba(110, 101, 101, 0.35);
  }
}

@media (min-width: 1000px) {
  .avatar img {
    margin-bottom: 15px;
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    order: 2px solid white;
  }
  .clientes p {
    margin-top: 180px;
  }
  div.datos label {
    margin: -5px;
    font-size: 20px;
  }
  div.datos {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
    border: solid 2px white;
    background-color: rgba(110, 101, 101, 0.35);
  }
  button {
    font-family: "Saira", sans-serif;
    font-size: 12px;
    width: 100px;
    height: 60px;
    margin: 20px;
    background: transparent;
    border-radius: 10px;
    border: 2.5px solid yellow;
    font-weight: bold;
    color: yellow;
  }
}
</style>
