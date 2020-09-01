<template>
  <div>
    <userbookings :bookings="bookings" v-on:rate="newRate" />
  </div>
</template>

<script>
import axios from "axios";
import userbookings from "@/components/UserBookingsCom.vue";
import { getIdToken } from "../api/utils";

export default {
  name: "UserBookings",
  components: {
    userbookings
  },
  data() {
    return {
      bookings: [],
      id: null,
      address: "",
      zip_code: "",
      city: "",
      money_type: "",
      id_user: "",
      createDate: "",
      name: ""
    };
  },
  methods: {
    //FUNCION PARA LISTAR LAS RESERVAS DE CADA USUARIO
    async listBookings() {
      try {
        let token = localStorage.getItem("AUTH_TOKEN_KEY");
        axios.defaults.headers.common["Authorization"] = `${token}`;

        const response = await axios.get(
          "http://localhost:3000/entries/" + getIdToken(token)
        );

        console.log(response);
        this.bookings = response.data.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },

    //FUNCION PARA REALIZAR EL VOTO
    async newRate(data) {
      try {
        let token = localStorage.getItem("AUTH_TOKEN_KEY");
        axios.defaults.headers.common["Authorization"] = `${token}`;

        const response = await axios.put(
          "http://localhost:3000/entries/" + data.id + "/newrate",
          {
            rating: data.rate
          },
          getIdToken(token)
        );
        console.log(response);
        await this.listBookings();
      } catch (error) {
        console.log(error.response.data);
      }
    }
  },
  created() {
    this.listBookings();
  }
};
</script>

<style></style>
