<template>
  <div>
    <div>
      <h3>This are your uploaded articles</h3>
    </div>
    <section>
      <div>
        <ul>
          <li v-for="(money, index) in moneys" :key="money.id">
            <user-article
              :index="index"
              :money="money"
              v-on:edit="listMoneys()"
              v-on:delete="deleteMoney"
            />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import UserArticle from "@/components/UserArticleCom.vue";
import { getIdToken } from "../api/utils";

export default {
  name: "UserArticles",
  components: {
    UserArticle,
  },
  data() {
    return {
      moneys: [],
      id: null,
      money_type: "",
      price: "",
      locate: "",
      money_country: "",
      comments: "",
      createDate: "",
      id_user: "",
    };
  },
  methods: {
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
        console.log(this.moneys);
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
      this.listMoneys();
    },
    async borrar() {
      let params = this.id_money;
      this.$emit("data", params);
    },

    /*  ///FUNCION PARA EDITAR MONEDAS
    async editMoney(editMoney) {
      try {
        let token = localStorage.getItem("AUTH_TOKEN_KEY");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response = await axios.put(
          "http://localhost:3000/articles/" + editMoney.id_money,
          {
            money_type: editMoney.money_type,
            price: editMoney.price,
            locate: editMoney.locate,
            money_country: editMoney.money_country,
            coments: editMoney.coments
          }
        );
        console.log(response);
        this.listMoneys();
      } catch (error) {
        console.log(error.response.data);
      }
    }, */
    async editar() {
      let params = this.id_money;
      this.$emit("data", params);
    },
  },
  created() {
    this.listMoneys();
  },
};
</script>
<style scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
ul li {
  justify-content: center;
  font-size: 15px;
  font-weight: bolder;
  list-style: none;
  padding: 0.5rem;
  border: solid 1px white;
  margin: 0.5rem;
  max-width: 300px;
}
ul li img {
  max-width: 200px;
  max-height: 200px;
}
</style>
