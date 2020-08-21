<template>
  <div class="clientes">
    <!-- MODAL PARA ACTUALIZAR EL CLIENTE -->

    <h3>My Profile</h3>

    <p>Personal data :</p>

    <input type="text" placeholder=" Nuevo nombre" v-model="name" />
    <br />
    <input type="text" placeholder="Nombre usuario" v-model="username" />
    <br />
    <input type="text" placeholder="epellido" v-model="lastname" />
    <br />
    <input type="text" placeholder="dni" v-model="dni" />
    <br />
    <input type="text" placeholder="direccion" v-model="address" />
    <br />
    <input type="text" placeholder="Código postal" v-model="zipcode" />
    <br />
    <input type="text" placeholder="Ciudad" v-model="city" />
    <br />
    <input type="text" placeholder="Telefono" v-model="telephone" />
    <br />
    <input type="text" placeholder="Nº Cuenta" v-model="bankaccount" />
    <br />
    <input type="text" placeholder="email" v-model="email" />
    <br />
    <button>
      <router-link :to="{ name:'EditPassword' }">Edit Password</router-link>
    </button>

    <button @click="updateUser()">Update User</button>
    <button>
      <router-link :to="{ name:'UserBookings' }">U.bookings</router-link>
    </button>
    <button>
      <router-link :to="{ name:'UserArticles' }">U.Articles</router-link>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { isLoggedInUser } from "../api/utils";
import { getIdToken } from "../api/utils";
import Swal from "sweetalert2";

export default {
  name: "GetUser",
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
      idUser: ""
    };
    console.log(data);
  },
  methods: {
    //FUNCION PARA OBTENER USUARIO
    getUser() {
      let token = localStorage.getItem("AUTH_TOKEN_KEY");
      axios.defaults.headers.common["Authorization"] = `${token}`;
      //LLAMADA AXIOS A LA API
      axios
        .get("http://localhost:3000/users/" + getIdToken(token))
        .then(response => {
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
        .catch(error => {
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
          email: this.email
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response.data);
        });
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style>
</style>