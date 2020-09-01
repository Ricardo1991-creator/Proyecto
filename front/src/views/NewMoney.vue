<template>
  <div>
    <h1>New currency</h1>

    <input type="file" ref="image" @change="catchSeeArticle1" />
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
  name: "addMoneys",
  data() {
    return {
      image: "",
      price: "",
      locate: "",
      money_type: "",
      money_country: "",
      coments: "",
      errorMsg: false,
    };
  },
  methods: {
    catchSeeArticle1() {
      /* this.image = this.$refs.image.files[0]; */
      this.image = event.target.files[0];
      console.log(this.image);
    },
    sweetAlertOKMoneda() {
      Swal.fire({
        position: "center",
        title: "New money",
        text: "Successfully created money",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    sweetAlertFalloMoneda() {
      Swal.fire({
        icon: "error",
        title: "Wrong!",
        text: "You must cover all the fields",
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

          let formData = new FormData();
          formData.append("money_type", this.money_type);
          formData.append("price", this.price);
          formData.append("locate", this.locate);
          formData.append("money_country", this.money_country);
          formData.append("coments", this.coments);
          formData.append("image", this.image);
          console.log(formData);
          const response = await axios
            .post("http://localhost:3000/articles", formData)
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
    },
  },
};
</script>

<style scoped>
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
input[type="file"] {
  width: 170px;
  font-size: 12px;
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
  background: transparent;
  border-radius: 10px;
  border: 2px solid yellow;
  font-weight: bold;
  color: yellow;
}
@media (min-width: 400px) {
  html {
    font-size: 22px;
  }

  h1 {
    font-size: 30px;
  }
}
@media (min-width: 300px) {
  html {
    font-size: 22px;
  }
  h1 {
    font-size: 30px;
  }
}
@media (min-width: 1000px) {
  html {
    font-size: 22px;
  }
}
</style>
