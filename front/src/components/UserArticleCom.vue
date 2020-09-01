<template>
  <div>
    <img :src="setImage(money.image)" />
    <p>Currency: {{ money.money_type }}</p>
    <p>Value: {{ money.price }} €</p>
    <p>Location: {{ money.locate }}</p>
    <p>Country: {{ money.money_country }}</p>
    <p>About : {{ money.coments }}</p>
    <p>Sales : {{ money.num_ventas }}</p>
    <p>Upload day: {{ getFormat(money.createDate) }}</p>
    <div class="botones">
      <button class="editar" @click="isEdit = !isEdit">Edit</button>
      <button @click="deleteMoney(index)">Delete</button>
    </div>

    <form v-show="isEdit" class="modal">
      <div class="modalBox">
        <p>Edit your money quickly!</p>
      </div>
      <input type="text" placeholder="Currency" v-model="money_type" />
      <input type="text" placeholder="price" v-model="price" />
      <input type="text" placeholder="Location" v-model="locate" />
      <input type="text" placeholder="Country" v-model="money_country" />
      <input type="text" placeholder="Coments" v-model="coments" />
      <br />
      <button class="edit" @click="editMoney(index)">Confirm</button>
      <button class="cancel" @click="changeIsEdit()">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { format } from "date-fns";

export default {
  name: "userArticleCom",
  props: {
    money: Object,
    index: Number,
  },

  data() {
    return {
      money_type: this.money.money_type,
      price: this.money.price,
      locate: this.money.locate,
      money_country: this.money.money_country,
      coments: this.money.coments,
      createDate: this.money.createDate,
      id_user: this.money.id_user,
      isEdit: false,
      format,
    };
  },
  methods: {
    getFormat(date) {
      return this.format(new Date(date), "dd/MM/yyyy");
    },
    changeIsEdit() {
      this.isEdit = !this.isEdit;
    },

    setImage(img) {
      if (img !== null) {
        return process.env.VUE_APP_STATIC + img;
      }
    },
    deleteMoney(index) {
      let deleteMoney = {
        id_money: this.money.id,
      };
      this.$emit("delete", deleteMoney);
    },
    async editMoney() {
      try {
        let token = localStorage.getItem("AUTH_TOKEN_KEY");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response = await axios.put(
          "http://localhost:3000/articles/" + this.money.id,
          {
            money_type: this.money_type,
            price: this.price,
            locate: this.locate,
            money_country: this.money_country,
            coments: this.coments,
          }
        );
        this.$emit("edit");
        this.changeIsEdit();
      } catch (error) {
        console.log(error.response.data);
      }
    },
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
button {
  font-family: "Saira", sans-serif;
  width: 65px;
  height: 30px;
  background: #2c3e50;
  border-radius: 10px;
  border: 2px solid red;
  background: transparent;
  font-weight: 900;
  color: red;
}

.botones {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
button.editar {
  font-family: "Saira", sans-serif;
  width: 65px;
  height: 30px;
  background: transparent;
  border-radius: 10px;
  border: 2px solid rgb(27, 190, 255);
  font-weight: bold;
  color: rgb(27, 190, 255);
}
button.edit {
  font-family: "Saira", sans-serif;
  width: 65px;
  height: 30px;
  background: #2c3e50;
  border-radius: 10px;
  border: 2px solid rgb(21, 255, 0);
  font-weight: bold;
  color: rgb(21, 255, 0);
}

/* Formulario para editar */

div.modal button {
  border-radius: 20px;
  margin: 0.5rem;
}
.modal {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  border: 3px solid white;
  background: rgba(44, 62, 80, 0.9);
}
.modalBox {
  margin: 2% auto;
  padding: 1rem;
  width: 50%;
  color: yellow;

  background: rgba(44, 62, 80, 0.9);
}
</style>
