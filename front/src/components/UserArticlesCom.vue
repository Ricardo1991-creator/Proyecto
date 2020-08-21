<template>
  <div>
    <h3>This are your uploaded articles</h3>
    <section>
      <div>
        <ul>
          <li v-for="(money,index) in moneys" :key="money.id">
            <p>Currency: {{money.money_type}}</p>
            <p>Price: {{money.price}}</p>
            <p>Country: {{money.money_country}}</p>
            <p>Coments : {{money.coments}}</p>
            <p>Num_ventas : {{money.num_ventas}}</p>
            <button @click="deleteMoney(index)">Delete</button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "UserArticlesCom",
  props: {
    moneys: Array
  },
  data() {
    return {
      id: "",
      money_type: "",
      price: "",
      money_country: "",
      coments: "",
      id_user: ""
    };
  },
  methods: {
    deleteMoney(index) {
      let deleteMoney = {
        id_money: this.moneys[index].id
      };
      this.$emit("delete", deleteMoney);
    }
  }
};
</script>

<style>
</style>