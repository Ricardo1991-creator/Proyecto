<template>
  <div class="articles">
    <listmoneyscom :moneys="moneys" v-on:data="newBooking" />
  </div>
</template>

<script>
import axios from "axios";
import listmoneyscom from "@/components/ListMoneysCom.vue";
import Swal from "sweetalert2";

export default {
  name: "ListMoneys",
  components: {
    listmoneyscom
  },
  data() {
    return {
      moneys: [],
      id_money: ""
    };
  },
  methods: {
    sweetAlertReserva() {
      Swal.fire("Good job!", "You have just booked this item!!", "success");
    },
    listMoneys() {
      var self = this;

      axios
        .get("http://localhost:3000/articles")
        .then(function(response) {
          self.moneys = response.data.data;
          console.log(self.moneys);
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //FUNCION PARA REALIZAR LA RESERVA
    async newBooking(bookingData) {
      console.log(bookingData);
      try {
        let token = localStorage.getItem("AUTH_TOKEN_KEY");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response = await axios.post(
          "http://localhost:3000/articles/" + bookingData.id_money + "/booking"
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      this.sweetAlertReserva();
    },
    async reservar() {
      let params = this.id_money;
      this.$emit("data", params);
    }
  },
  created() {
    this.listMoneys();
  }
};
</script>

<style>
</style>

