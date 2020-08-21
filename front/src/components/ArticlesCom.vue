<template>
  <div id="nav">
    <p>Searcher:</p>
    <select name="Buscador" v-model="criterio" @change="clearField" id>
      <option value="money_type">Currency</option>
      <option value="locate" selected>Location</option>
      <option value="minMax">Price min or Max</option>
    </select>
    <div v-if="criterio === 'minMax'">
      <input type="number" name="price1" v-model="price1" placeholder="Precio mínimo" />
      <input type="number" name="price2" v-model="price2" placeholder="Precio máximo" />
    </div>
    <div v-else>
      <input type="search" v-model="searchMoney" placeholder="Name or location" />
    </div>

    <button @click="searchBy()">Search</button>

    <ul>
      <li v-for="money in moneys" :key="money.id">
        <p>Currency: {{ money.money_type }}</p>
        <p>Location: {{ money.locate }}</p>
        <p>Price: {{ money.price }}</p>
        <p>Seller: {{ money.name }}</p>
        <p>About: {{ money.coments }}</p>
        <p>Medium rate:{{ money.average }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArticlesCom",
  props: {
    moneys: Array
  },
  data() {
    return {
      criterio: "locate",
      searchMoney: "",
      price1: null,
      price2: null
    };
  },
  methods: {
    clearField() {
      this.searchMoney = "";
      this.price1 = null;
      this.price2 = null;
    },
    searchBy() {
      let search = {
        value: this.searchMoney,
        option: this.criterio,
        price1: this.price1,
        price2: this.price2
      };
      this.$emit("moneysList", search);
    }
  },
  computed: {
    // searchAMoney() {
    //   if (!this.searchMoney) {
    //     return this.moneys;
    //   }
    //   return this.moneys.filter(moneys =>
    //     moneys.moneytype.toLowerCase().includes(this.searchMoney.toLowerCase())
    //   );
    // }
  }
};
</script>

<style scoped>
#nav ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60rem;
}

#nav ul li {
  justify-content: center;
  list-style: none;
  padding: 1rem;
  border: solid 1px white;
  margin: 1rem;
  width: 20rem;
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
