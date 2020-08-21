<template>
  <div>
    <h1>Our Moneys</h1>
    <section>
      <input type="search" v-model="search" placeholder="Search by money" />
      <div class="cuadro">
        <ul v-for="(money,index) in filtered" :key="money.id">
          <li>
            <img :src="getImageName(money.image)" />
            <p>Currency: {{money.money_type}}</p>
            <p>Location: {{money.locate}}</p>
            <p>Price: {{money.price}}</p>
            <p>Seller:{{money.name}}</p>
            <p>About:{{money.coments}}</p>
            <p>Medium rate:{{money.average}}</p>

            <button @click="reservar(index)">Booking</button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "ListMoneysCom",
  props: {
    moneys: Array
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    filtered() {
      if (!this.search) {
        return this.moneys;
      }
      return this.moneys.filter(money =>
        money.money_type.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    getImageName(name) {
      return process.env.VUE_APP_STATIC + name;
    },
    reservar(index) {
      let bookingData = {
        id_money: this.moneys[index].id
      };
      this.$emit("data", bookingData);
    }
  }
};
</script>

<style scoped>
.cuadro {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  list-style: none;
  font-weight: bold;
  border: solid 1px white;
}

@media (min-width: 700px) {
  html {
    font-size: 22px;
  }

  .cuadro {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    list-style: none;
    font-weight: bold;
  }
}

button {
  font-family: "Saira", sans-serif;
  width: 65px;
  height: 30px;
  background: yellow;
  border-radius: 10px;
  font-weight: bold;
  color: #2c3e50;
}
</style>