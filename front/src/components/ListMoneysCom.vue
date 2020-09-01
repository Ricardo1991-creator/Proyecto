<template>
  <div>
    <!-- <h1>Our Moneys</h1> -->
    <h1>Marketplace</h1>
    <section>
      <input type="search" v-model="search" placeholder="Search by money" />

      <div id="cuadro">
        <ul class="list">
          <li v-for="(money, index) in showedMoney" :key="money.id">
            <img :src="setImage(money.image)" />
            <p>Currency: {{ money.money_type }}</p>
            <p>Location: {{ money.locate }}</p>
            <p :class="{ red: money.price < 1.07, green: money.price > 1.08 }">
              {{ money.price }} €
            </p>
            <p>Seller:{{ money.name }}</p>
            <p>About:{{ money.coments }}</p>
            <p>Medium rate: {{ money.average }}</p>
            <p>Date: {{ getFormat(money.createDate) }}</p>
            <button @click="reservar(index)">Booking</button>
          </li>
        </ul>
      </div>
    </section>

    <!--PAGINATION -->

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 0 }">
          <button class="page-link" @click="previousPage">Previous</button>
        </li>
        <li
          v-for="page in pages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">
            {{ page + 1 }}
          </button>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === pages.length - 1 }"
        >
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </nav>

    <!-- BOTON BACK TO TOP -->
  </div>
</template>

<script>
import { orderBy } from "lodash";
import Swal from "sweetalert2";
import { format } from "date-fns";

export default {
  name: "ListMoneysCom",
  props: {
    moneys: Array,
  },
  data() {
    return {
      search: "",
      currentIndex: 0,
      elementsPerPage: 6,
      currentPage: 0,
      format,
    };
  },
  computed: {
    filtered() {
      if (!this.search) {
        return this.moneys;
      }
      return this.moneys.filter((money) =>
        money.money_type.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    showedMoney() {
      return this.filtered.slice(
        this.currentIndex,
        this.currentIndex + this.elementsPerPage
      );
    },
    pages() {
      let numberOfPages = Math.ceil(this.moneys.length / this.elementsPerPage);
      let pageArray = [];
      for (let i = 0; i < numberOfPages; i++) {
        pageArray.push(i);
      }
      return pageArray;
    },
  },
  methods: {
    getFormat(date) {
      return this.format(new Date(date), "dd/MM/yyyy");
    },
    setImage(img) {
      return process.env.VUE_APP_STATIC + img;
    },
    reservar(index) {
      let bookingData = {
        id_money: this.moneys[index].id,
      };
      this.$emit("data", bookingData);
    },
    previousPage() {
      this.currentPage = this.currentPage - 1;
      this.currentIndex = this.currentIndex - this.elementsPerPage;
    },
    nextPage() {
      this.currentPage = this.currentPage + 1;
      this.currentIndex = this.currentIndex + this.elementsPerPage;
    },
    goToPage(page) {
      this.currentPage = page;
      this.currentIndex = page * this.elementsPerPage;
    },
  },
};
</script>

<style scoped>
.red {
  color: rgb(236, 39, 39);
}
.green {
  color: rgb(74, 218, 18);
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
ul {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  align-items: stretch;
}

ul li {
  justify-content: center;
  max-height: 400px;
  max-width: 500px;
  font-size: 12px;
  font-weight: bolder;
  list-style: none;
  padding: 0.5rem;
  border: solid 2px white;
  margin: 0.5rem;
  background-color: rgba(110, 101, 101, 0.35);
}

ul img {
  width: 70%;
}

nav button.page-link {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  font-size: 20px;
  padding: 10px;
  border: none;
  margin: 0;
}
nav ul.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: transparent;
}

nav li.page-item {
  border: none;
  background: transparent;

  margin: 0;
  padding: 0;
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

@media (min-width: 400px) {
  html {
    font-size: 22px;
  }

  h1 {
    font-size: 30px;
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
    max-height: 300;
  }
  #cuadro ul.list li img {
    width: 30%;
  }
}
@media (min-width: 300px) {
  html {
    font-size: 22px;
  }
  h1 {
    font-size: 30px;
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
    max-height: 300;
  }
  #cuadro ul.list li img {
    width: 30%;
  }
}
@media (min-width: 1000px) {
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
    font-size: 20px;
    max-width: auto;
    max-height: 600px;
  }
  #cuadro ul.list li img {
    width: 40%;
  }
}
</style>
