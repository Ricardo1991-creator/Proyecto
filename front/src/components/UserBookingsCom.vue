<template>
  <div>
    <h3>Here you can see your purchase history</h3>

    <section>
      <div>
        <ul>
          <li v-for="booking in bookings" :key="booking.id">
            <p>Order Number: {{booking.order_number}}</p>
            <p>Addres: {{booking.address}}</p>
            <p>Zip Code : {{booking.zip_code}}</p>
            <p>Type: {{booking.money_type}}</p>
            <p>City: {{booking.city}}</p>
            <p>Seller: {{booking.name}}</p>
            <div v-if="booking.rating == null">
              <p>¡Valora aqui tu experiencia con "Hack A Money" !</p>
              <input type="text" placeholder="introduce aquí tu voto" v-model="newRate" />
              <button @click="createRate(booking.id)">Rate</button>
            </div>
            <div v-else-if="booking.rating !== null">
              <p>Rate: {{booking.rating}}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "UserBookingsCom",
  props: {
    bookings: Array
  },
  data() {
    return {
      id: "",
      order_number: "",
      address: "",
      zip_code: "",
      city: "",
      money_type: "",
      id_user: "",
      rating: "",
      newRate: ""
    };
  },
  methods: {
    createRate(id) {
      let data = { id, rate: this.newRate };
      this.$emit("rate", data);
    }
  }
};
</script>

<style>
ul {
  list-style: none;
}
</style>