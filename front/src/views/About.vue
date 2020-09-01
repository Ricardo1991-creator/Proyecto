<template>
  <div>
    <router-link tag="button" :to="{ name: 'Home' }">Go back</router-link>
    <div class="perfil">
      <img src="../assets/Perfil.jpg" alt="imagen perfil" />
    </div>
    <!-- SERVICES -->
    <section id="services" class="module">
      <div class="container">
        <div class="row multi-columns-row">
          <!-- CONTENT BOX -->
          <div class="col-sm-6 col-md-4 col-lg-4">
            <div class="content-box">
              <div class="content-box-icon">
                <i class="ion-ios-compose-outline"></i>
              </div>
              <h5 class="content-box-title font-alt">About me</h5>
              <div class="content-box-text">
                <p>
                  My name is Ricardo Puig Fraga. I was born in A Coruña, Spain,
                  where I have spent most of my life. I have a degree in
                  business administration and I have professional experience in
                  commerce, logistics and digital marketing.
                </p>
                <p>
                  During my professional experience in Dublin I had the
                  oportunity to work in a Startup called UsherU during months.
                  That was the reason why I decided to change my career and get
                  into the IT world.
                </p>
                <p>
                  My intention is to learn all that I can about developing and
                  get a job in which I can develop all this training, to become
                  a great developer the day of tomorrow.
                </p>
              </div>
            </div>
          </div>
          <!-- /CONTENT BOX -->

          <!-- CONTENT BOX -->
          <div class="col-sm-6 col-md-4 col-lg-4">
            <div class="content-box">
              <div class="content-box-icon">
                <i class="ion-ios-gear-outline"></i>
              </div>
              <h5 class="content-box-title font-alt">About the project</h5>
              <div class="content-box-text">
                <p>
                  This is the first of many projects that I want to develop in
                  the future, it is about one currrencies exchanges simulator.
                  In the app, you can do the several actions that you can do in
                  any website like login, new registration,change your personal
                  data...
                </p>
                <p>
                  And then, you can book and sell currencies playing with the
                  prices, of course you can edit your currencies in function on
                  the market price.
                </p>
              </div>
            </div>
          </div>
          <!-- /CONTENT BOX -->

          <!-- CONTENT BOX -->
          <div class="col-sm-6 col-md-4 col-lg-4">
            <div class="content-box">
              <div class="content-box-icon">
                <i class="ion-ios-monitor-outline"></i>
              </div>
              <h5 class="content-box-title font-alt">Technologies</h5>
              <div class="content-box-text">
                <p>
                  <i>FRONT:</i>
                  <br />Vue.js, Javascript, Axios, HTML, CSS .
                </p>
                <p>
                  <i>BACK:</i>
                  <br />Node.js, Javascript, MysQL, jswebtoken, Express .
                </p>
                <br />
                <p>
                  I have used some others technologies like:
                  <br />Sengrid,Vue-headful,sweetalert,hapi-joi...
                </p>
              </div>
            </div>
          </div>
          <!-- /CONTENT BOX -->
        </div>
      </div>
    </section>
    <!-- /SERVICES -->

    <!-- DIVIDER -->
    <hr class="divider" />
    <!-- /DIVIDER -->

    <section id="contact" class="module">
      <div class="container">
        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-12">
            <h2 class="module-title font-alt">Contact me</h2>
          </div>
        </div>
        <!-- /MODULE TITLE -->

        <div class="row">
          <!-- CONTENT BOX -->
          <div class="col-sm-4">
            <div>
              <div>
                <img
                  class="linkedin"
                  src="../assets/qr-code.png"
                  alt="imagen qr"
                />
                <br />
                <!-- <a href="mailto:ricardo.puigfraga@gmail.com? Subject= Contact" target="_blank>">
                  <img class="gmail" src="../assets/gmail.png" alt="imagen gmail" />
                </a>-->
                <a href="mailto:ricardo.puigfraga@gmail.com" target="_blank">
                  <img
                    class="gmail"
                    src="../assets/gmail.png"
                    alt="imagen gmail"
                  />
                </a>
                <div class="phone">Phone : +34 671-447-049</div>
              </div>
            </div>
          </div>
          <!-- /CONTENT BOX -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.8;
}
.module[data-v-039c5b43] {
  padding: 10px 0;
}

img.linkedin {
  max-width: 150px;
  padding: 10px;
}

img.gmail {
  max-width: 150px;
}

.perfil img {
  max-width: 200px;
  padding: 20px;
  border-radius: 50%;
}
.module {
  padding: 140px 0;
}

.module-title {
  font-size: 20px;
  letter-spacing: 10px;
  margin-bottom: 75px;
}

.font-alt {
  font-family: "Dosis", sans-serif;
  text-transform: uppercase;
  text-align: center;
}

.font-inc {
  font-family: "Inconsolata", serif;
  text-transform: uppercase;
  text-align: center;
}

.content-box {
  margin: 20px auto;
  max-width: 700px;
  border: 2px solid white;
  background-color: rgba(110, 101, 101, 0.35);
  padding: 10px;
}

.content-box-icon {
  font-size: 4rem;
  text-align: center;
}

.content-box-title {
  font-size: 1.5rem;
  letter-spacing: 5px;
  color: yellow;
}

.content-box-text {
  color: white;
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

@media (max-width: 400px) {
  .content-box {
    margin: 20px auto;
    max-width: 250px;
    font-size: 18px;
    border: 2px solid white;
    background-color: rgba(110, 101, 101, 0.35);
    padding: 10px;
  }
  .content-box-title {
    font-size: 0.5rem;
    letter-spacing: 5px;
    color: yellow;
  }
  img.linkedin {
    max-width: 900px;
    padding: 10px;
  }

  img.gmail {
    max-width: 90px;
  }
  .phone {
    font-size: 20px;
  }
}

@media (max-width: 500px) {
  .content-box {
    margin: 20px auto;
    max-width: 300px;
    font-size: 20px;
    border: 2px solid white;
    background-color: rgba(110, 101, 101, 0.35);
    padding: 10px;
  }
  .content-box-title {
    font-size: 1rem;
    letter-spacing: 5px;
    color: yellow;
  }
  img.linkedin {
    max-width: 100px;
    padding: 10px;
  }

  img.gmail {
    max-width: 100px;
  }
  .phone {
    font-size: 20px;
  }
}
</style>
