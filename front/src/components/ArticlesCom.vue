<template>
  <div id="nav">
    <p>Searcher:</p>
    <select name="Buscador" v-model="criterio" @change="clearField">
      <option value="money_type">Currency</option>
      <option value="locate" selected>Location</option>
      <option value="minMax">Price min or max</option>
    </select>
    <div class="minmax" v-if="criterio === 'minMax'">
      <input
        type="number"
        name="price1"
        v-model="price1"
        placeholder="Min price"
      />
      <input
        type="number"
        name="price2"
        v-model="price2"
        placeholder="Max price"
      />
    </div>
    <div v-else>
      <input
        type="search"
        v-model="searchMoney"
        placeholder="Name or location"
      />
    </div>

    <button @click="searchBy()">Search</button>

    <div id="cuadro">
      <ul class="list">
        <li v-for="money in moneys" :key="money.id">
          <img :src="setImage(money.image)" />
          <p>Currency: {{ money.money_type }}</p>
          <p>Location: {{ money.locate }}</p>
          <p :class="{ red: money.price < 1.07, green: money.price > 1.08 }">
            {{ money.price }} €
          </p>
          <p>Seller: {{ money.name }}</p>
          <p>About: {{ money.coments }}</p>
          <p>Medium rate: {{ money.average }}</p>
          <p>Date: {{ getFormat(money.createDate) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "ArticlesCom",
  props: {
    moneys: Array,
  },
  data() {
    return {
      criterio: "locate",
      searchMoney: "",
      price1: null,
      price2: null,
      format,
    };
  },
  methods: {
    getFormat(date) {
      return this.format(new Date(date), "dd/MM/yyyy");
    },
    setImage(img) {
      return process.env.VUE_APP_STATIC + img;
    },
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
        price2: this.price2,
      };
      this.$emit("moneysList", search);
    },
  },
};
</script>

<style scoped>
@import url("https://css.gg/search.css");
.red {
  color: rgb(236, 39, 39);
}
.green {
  color: rgb(74, 218, 18);
}

#nav > div {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#nav select {
  width: 170px;
  margin: 10px;
  margin-top: 10px;
  padding: 10px 16px;
  border-radius: 32px;
  outline: none;
  border: 2px solid #ccd1d1;
  background-color: transparent;
  color: white;
  transition: all 0.5s;
}
#nav select:focus {
  background: rgb(50, 50, 50);
  width: 300px;
}
ul img {
  width: 100%;
}

#nav .minmax {
  width: 270px;
  margin: 10px;
  padding: 10px 20px;
  border-radius: 32px;
  outline: none;
  border: 2px solid #ccd1d1;
  background-color: transparent;
  color: white;
  transition: all 0.5s;
}

#nav input[type="number"] {
  width: 170px;
  margin: 10px;
  padding: 10px 5px;
  border-radius: 32px;
  outline: none;
  border: 2px solid #ccd1d1;
  background-color: transparent;
  color: white;
  transition: all 0.5s;
}

#nav input[type="number"] {
  background: transparent;
  width: 150px;
}

input[type="search"] {
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
input[type="search"]:focus {
  background: transparent;
  width: 300px;
}

#nav p.tip {
  font-size: 14px;
}

#nav ul {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  align-items: stretch;
}

#nav ul li {
  justify-content: center;
  font-size: 15px;
  font-weight: bolder;
  list-style: none;
  padding: 0.5rem;
  border: solid 1px white;
  margin: 0.5rem;
  width: 30rem;
  background-color: rgba(110, 101, 101, 0.3);
}

button {
  font-family: "Saira", sans-serif;
  width: 65px;
  height: 30px;
  background: transparent;
  border-radius: 10px;
  border: 2px solid yellow;
  font-weight: bold;
  color: yellow;
}

@media (min-width: 100px) {
  #app {
    width: 100vh;
  }
  html {
    font-size: 22px;
  }

  #cuadro ul.list li {
    font-size: 15px;
    max-width: 250px;
    max-height: 250;
  }
  #cuadro ul.list li img {
    width: 60%;
  }
  #nav div.minmax {
    width: 200px;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 32px;
    outline: none;
    border: 2px solid #ccd1d1;
    background-color: transparent;
    color: white;
    transition: all 0.5s;
  }
}

@media (min-width: 700px) {
  #app {
    width: 100vh;
  }
  html {
    font-size: 22px;
  }

  #cuadro ul.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  #cuadro ul.list li {
    font-size: 15px;
    max-width: 250px;
    max-height: 300px;
  }
  #cuadro ul.list li img {
    width: 30%;
  }
  #nav div.minmax input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 150px;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 32px;
    outline: none;
    border: 2px solid #ccd1d1;
    background-color: transparent;
    color: white;
    transition: all 0.5s;
  }
}

@media (min-width: 960px) {
  #app {
    width: 100vh;
  }

  html {
    font-size: 22px;
  }
  #cuadro ul.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  #cuadro ul.list li {
    font-size: 25px;
    max-width: 450px;
    max-height: 300px;
  }
  #cuadro ul.list li img {
    width: 30%;
  }
  #nav div.minmax {
    display: flex;
    width: 200px;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 32px;
    outline: none;
    border: 2px solid #ccd1d1;
    background-color: transparent;
    color: white;
    transition: all 0.5s;
  }
}
@media (min-width: 1024px) {
  #app {
    width: 100vh;
  }

  html {
    font-size: 22px;
  }
  #cuadro ul.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  #cuadro ul.list li {
    font-size: 25px;
    max-width: 450px;
    max-height: 6000px;
  }
  #cuadro ul.list li img {
    width: 30%;
  }
  #nav div.minmax {
    display: flex;
    width: 200px;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 32px;
    outline: none;
    border: 2px solid #ccd1d1;
    background-color: transparent;
    color: white;
    transition: all 0.5s;
  }
}
</style>
