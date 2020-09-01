<template>
  <div id="nav">
    <h1>
      So sorry mate...
      <br />this page does not exist
    </h1>
    <img src="../assets/lost.png" alt="lostimage" />
    <p class="pass">
      <router-link :to="{ name: 'Home' }">Go back</router-link>
    </p>
    <vue-headful title="Error" />
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style scoped>
#nav {
  min-height: 100vh;
}
h1 {
  font-size: 30px;
}
#nav img {
  height: 100%;
  width: 100%;
}
p.pass {
  color: white;
  margin-bottom: -10px;
}
p.pass :visited {
  color: white;
}
p.pass :hover {
  color: yellow;
}

@media (min-width: 500px) {
  html {
    font-size: 22px;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  h1 {
    font-size: 20px;
  }
  #nav img {
    height: 50%;
    width: 50%;
  }
}

@media (min-width: 700px) {
  html {
    font-size: 22px;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  h1 {
    font-size: 30px;
  }
}

@media (max-width: 1100px) {
  html {
    font-size: 27px;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  h1 {
    font-size: 40px;
  }
}
</style>