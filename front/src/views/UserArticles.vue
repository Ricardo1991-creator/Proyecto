<template>
  <div>
    <userarticles :moneys="moneys" v-on:delete="deleteMoney" />
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import userarticles from "@/components/UserArticlesCom.vue";
import { getIdToken } from "../api/utils";

export default {
  name: "UserArticles",
  components: {
    userarticles,
  },
  data() {
    return {
      moneys: [],
      id: null,
      money_type: "",
      price: "",
      money_country: "",
      comments: "",
      id_user: "",
    };
  },
  methods: {
    sweetAlertborrarMoneda() {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this coin?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Continue",
        closeOnConfirm: false,
      }).then((resultado) => {
        if (resultado.value) {
          console.log("Se elimina la moneda");
        } else {
          console.log("No se elimina la moneda");
        }
      });
    },

    //FUNCION PARA LISTAR LAS MONEDAS DE CADA USUARIO
    async listMoneys() {
      try {
        let token = localStorage.getItem("AUTH_TOKEN_KEY");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response = await axios.get(
          "http://localhost:3000/users/" +
            getIdToken(token) +
            "/listuserarticles"
        );
        console.log(response);
        this.moneys = response.data.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    //FUNCION PARA BORRAR UN ARTICULO

    async deleteMoney(deleteMoney) {
      try {
        let token = localStorage.getItem("AUTH_TOKEN_KEY");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response = await axios.delete(
          "http://localhost:3000/articles/" + deleteMoney.id_money
        );
        console.log(response);
        this.moneys = response.data.data;
      } catch (error) {
        console.log(error.response.data);
      }
      this.sweetAlertborrarMoneda();
    },
    async borrar() {
      let params = this.id_money;
      this.$emit("data", params);
    },
  },
  created() {
    this.listMoneys();
  },
};
</script>
