
 






----------------------------------------




<template>
  <div>
    <h1>New Article</h1>

    <p v-show="errorMsg">***Tienes campos vacíos***</p>
    <p>
      <input type="text" v-model="money_type" placeholder="type" />
    </p>

    <p>
      <input type="text" v-model="price" placeholder="price" />
    </p>

    <p>
      <input type="text" v-model="locate" placeholder="ships from" />
    </p>

    <p>
      <input type="text" v-model="money_country" placeholder="country" />
    </p>

    <p>
      <input type="text" v-model="coments" placeholder="coments" />
    </p>

    <input type="file" ref="imagenArticulo1" @change="catchSeeArticle1" />

    <p>
      <button @click="validateData()">Añadir artículo</button>
    </p>
    <p>
      <router-link to="/editArticle" tag="button">Actualizar articulo</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { getIdToken } from "../api/utils";

export default {
  name: "NewArticle",
  data() {
    return {
      money_type: "",
      price: "",
      locate: "",
      money_country: "",
      coments: "",
      imagenArticulo1: "",
      createClient: false,
      errorMsg: false
    };
  },
  methods: {
    validateData() {
      if (
        this.selectedFile === "" ||
        this.price === "" ||
        this.locate === "" ||
        this.money_type === "" ||
        this.money_country === "" ||
        this.coments === ""
      ) {
        this.errorMsg = true;
        this.createArticle = false;
      } else {
        this.errorMsg = false;
        this.createArticle = true;
        this.addNewArticle();
      }
    },
    catchSeeArticle1() {
      this.imagenArticulo1 = this.$refs.imagenArticulo1.files[0];
      console.log(this.imagenArticulo1);
    },

    async addNewArticle() {
      if (this.createArticle === true) {
        try {
          let token = localStorage.getItem("AUTH_TOKEN_KEY");
          axios.defaults.headers.common["Authorization"] = `${token}`;
          console.log(formData);
          let formData = new FormData();
          formData.append("money_type", this.money_type);
          formData.append("price", this.price);
          formData.append("locate", this.locate);
          formData.append("money_country", this.money_country);
          formData.append("coments", this.coments);
          formData.append("processImage1", this.imagenArticulo1);
          const response = await axios.post(
            "http://localhost:3000/articles",
            formData,
            { header: { "Content-Type": "multipart/form-data" } }
          );
        } catch (error) {
          console.error(error);
        }
        this.createarticle = false;
        this.money_type = "";
        this.price = "";
        this.locate = "";
        this.money_country = "";
        this.coments = "";
        this.imagenArticulo1 = "";
      } else {
        console.log("Algo va mal");
      }
    }
  }
};
</script>
<style scoped>
</style>

