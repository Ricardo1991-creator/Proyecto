
<template>
  <div>
    <h1>New Article</h1>

    <input type="file" ref="imagenArticulo1" @change="catchSeeArticle1" />
    <br />
    <input type="text" v-model="money_type" placeholder="Money type" />
    <br />
    <input type="text" v-model="price" placeholder="Price" />
    <br />
    <input type="text" v-model="locate" placeholder="Ships From:" />
    <br />
    <input type="text" v-model="money_country" placeholder="Country" />
    <br />
    <input type="text" v-model="coments" placeholder="Comments" />
    <br />

    <p v-show="errorMsg">Can't have empty fields</p>
    <br />

    <button @click="validatingData()">Upload article</button>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { getIdToken } from "../api/utils";

export default {
  name: "AddMoneys",
  data() {
    return {
      imagenArticulo1: "",
      price: "",
      locate: "",
      money_type: "",
      money_country: "",
      coments: "",
      errorMsg: false
    };
  },
  methods: {
    catchSeeArticle1() {
      this.imagenArticulo1 = this.$refs.imagenArticulo1.files[0];
      console.log(this.imagenArticulo1);
    },
    sweetAlertOKMoneda() {
      Swal.fire({
        title: "New money",
        text: "Successfully created money",
        icon: "success",
        confirmButtonText: "OK"
      });
    },
    sweetAlertFalloMoneda() {
      Swal.fire({
        icon: "error",
        title: "Wrong!",
        text: "You must cover all the fields"
      });
    },

    validatingData() {
      if (
        this.selectedFile === "" ||
        this.price === "" ||
        this.locate === "" ||
        this.money_type === "" ||
        this.money_country === "" ||
        this.coments === ""
      ) {
        this.errorMsg = true;
        this.createMoney = false;
        this.sweetAlertFalloMoneda();
      } else {
        this.errorMsg = false;
        this.createMoney = true;
        this.addNewMoney();
      }
    },
    async addNewMoney() {
      if (this.createMoney === true) {
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
          const response = await axios
            .post("http://localhost:3000/articles", formData, {
              money_type: this.money_type,
              price: this.price,
              locate: this.locate,
              money_country: this.money_country,
              coments: this.coments
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log([error]);
            });
        } catch (error) {
          console.error(error);
        }

        this.createMoney = false;
        this.sweetAlertOKMoneda();
        this.price = "";
        this.locate = "";
        this.money_type = "";
        this.money_country = "";
        this.coments = "";
      } else {
        console.log("yo no debería estar aquí");
      }
    }
  }
};
</script>