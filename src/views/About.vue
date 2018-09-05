<template>
  <div class="about">
    <h1>{{message}}</h1>
    <h2>Showtimes</h2>
    <div v-for="showtime in showtimes">
      <p>Movie: {{showtime.movie}}</p>
      <p>Showtime: {{showtime.time}}</p>
      <p>Theater: {{showtime.theater}}</p>
      <button type="button" v-on:click="buyTicket(showtime)">
        Buy Ticket
      </button>
      <div class="checkout" v-if="showtime.buyTicket">
        <h3>Buy Ticket for:</h3>
        <p>{{showtime.movie}}</p>
        <div>
          First Name:<input type="text" v-model="newUser.first_name">
          Last Name:<input type="text" v-model="newUser.last_name">
          E-mail:<input v-model="newUser.email">
          Credit Card Number:<input v-model.number="newUser.credit_card" type="number">
          CVV:<input v-model.number="newUser.cvv" type="number">
        </div>
        <p>**Seating is on a first-come, first-serve basis**</p>
        <button type="button" v-on:click="purchase(showtime)">Purchase Ticket</button>
      </div>
    </div>
  </div>
</template>

<style>

.checkout {
  border: solid black 4px;
}
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      message: "User",
      showtimes: [
        {
          "showtime_id": 2,
          "time": "2018-09-01T23:00:00.000Z",
          "movie": "James Bond",
          "theater": 2,
          "buyTicket": false,
          "soldOut": false

        },
        {
          "showtime_id": 3,
          "time": "2018-09-01T23:00:00.000Z",
          "movie": "The Avengers",
          "theater": 4,
          "buyTicket": false,
          "soldOut": false

        },
        {
          "showtime_id": 4,
          "time": "2018-09-01T23:00:00.000Z",
          "movie": "Star Wars",
          "theater": 3,
          "buyTicket": false,
          "soldOut": false

        },
        {
          "showtime_id": 5,
          "time": "2018-09-01T23:00:00.000Z",
          "movie": "Black Panther",
          "theater": 1,
          "buyTicket": false,
          "soldOut": false

        }
      ],
      newUser: {first_name: "", last_name: "", email: "", credit_card: "", cvv: "", expiration_date: "2020-09-04T20:49:33.050Z"}
    };
  },
  created: function() {
    // axios.get("http://localhost:3000/api/showtimes").then(
    //   function(response) {
    //     console.log("showtimes:");
    //     console.log(response);
    //     this.showtimes = response.data;
    //   }.bind(this)
    // );
  },
  methods: {
    buyTicket: function(showtime) {
      showtime.buyTicket = !showtime.buyTicket;
      console.log(showtime.movie);
      console.log("BUYING TICKET?");
      console.log(showtime.buyTicket);
    },
    purchase: function(showtime) {
      // create user
      var params = {
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        email: this.newUser.email,
        credit_card: this.newUser.credit_card,
        cvv: this.newUser.cvv,
        expiration_date: "2020-09-04T20:49:33.050Z"
      };
      axios.post("http://localhost:3000/api/users", params).then(
        console.log("USER CREATED!"));
      // create ticket
      console.log("LET'S GO TO THE MOVIES!");
    }
  },
  computed: {}
};
</script>
