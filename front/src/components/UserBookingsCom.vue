<template>
  <div>
    <h3>Here you can see your purchase history</h3>
    <section>
      <div>
        <ul>
          <li v-for="booking in bookings" :key="booking.id">
            <p>Addres: {{ booking.address }}</p>
            <p>Zip Code : {{ booking.zip_code }}</p>
            <p>Type: {{ booking.money_type }}</p>
            <p>City: {{ booking.city }}</p>
            <p>Seller: {{ booking.name }}</p>
            <p>Buyed by: {{ booking.price }}</p>
            <p>Booking date: {{ getFormat(booking.createDate) }}</p>
            <div v-if="booking.rating == null">
              <p class="newrate">
                This booking has not yet been rated.Rate now!
              </p>

              <select name="rate" v-model="newRate">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <!--<input
                type="text"
                placeholder="introduce aquí tu voto"
                v-model="newRate"
              />-->
              <button @click="createRate(booking.id)">Rate</button>
            </div>
            <div v-else-if="booking.rating !== null">
              <p class="rated">Rate: {{ booking.rating }} / 5</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "userBookingsCom",
  props: {
    bookings: Array,
  },
  data() {
    return {
      id: "",
      address: "",
      zip_code: "",
      city: "",
      money_type: "",
      id_user: "",
      createDate: "",
      rating: "",
      newRate: "",
      format,
    };
  },
  methods: {
    getFormat(date) {
      return this.format(new Date(date), "dd/MM/yyyy");
    },
    createRate(id) {
      let data = { id, rate: this.newRate };
      this.$emit("rate", data);
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
p.newrate {
  color: yellow;
}

p.rated {
  color: yellow;
  font-size: 30px;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  align-items: center;
}
ul li {
  justify-content: center;
  font-size: 15px;
  list-style: none;
  padding: 1rem;
  border: solid 1px white;
  margin: 0.5rem;
  width: 30rem;
  background-color: rgba(110, 101, 101, 0.35);
}
input[type="text"] {
  width: 170px;
  margin: 10px;
  padding: 10px 16px;
  border-radius: 32px;
  outline: none;
  border: 2px solid #ccd1d1;
  background-color: #2c3e50;
  color: white;
}
button {
  font-family: "Saira", sans-serif;
  width: 65px;
  height: 30px;
  background: #2c3e50;
  border-radius: 10px;
  border: 2px solid yellow;
  font-weight: bold;
  color: yellow;
}

@media (min-width: 320px) {
  html {
    font-size: 22px;
  }

  h1 {
    font-size: 30px;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  ul li {
    font-size: 15px;
    max-width: 300px;
    max-height: 600px;
  }
}
@media (min-width: 1000px) {
  html {
    font-size: 22px;
  }
  h1 {
    font-size: 30px;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  ul li {
    font-size: 15px;
    max-width: 250px;
    max-height: 300;
  }
}
@media (min-width: 1024px) {
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
