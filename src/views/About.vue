<template>
  <div class="about">
    <h1>{{message}}</h1>
    <h2>Showtimes</h2>
    <div v-for="showtime in showtimes">
      <p>Movie: {{showtime.movie}}</p>
      <p>Showtime: {{showtime.time}}</p>
      <p>Theater: {{showtime.theater}}</p>
      <p>Capacity: {{showtime.capacity}}</p>
      <p>Open Seats: {{showtime.open_seats}}</p>
      <div class="soldOut" v-if="showtime.open_seats === 0">
        SOLD OUT
      </div>
      <button type="button" v-else v-on:click="buyTicket(showtime)">
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

.soldOut {
  color: red;
}
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      message: "User",
      showtimes: [],
      tickets: [],
      newUser: {first_name: "", last_name: "", email: "", credit_card: "", cvv: "", expiration_date: ""},
      newTicket: {user_id: "", showtime_id: "", seat: ""}
    };
  },

  created: function() {
    axios.get("/api/showtimes").then(
      function(response) {
        console.log("showtimes:");
        console.log(response);
        this.showtimes = response.data;
      }.bind(this)
    );

    axios.get("/api/tickets").then(
      function(response) {
        console.log("TICKETS:");
        console.log(response);
        this.tickets = response.data;
      }.bind(this)
    );
  },
  methods: {
    soldOut: function(showtime) {
      if (showtime.ticketSold >= showtime.capacity) {
        console.log("SOLD OUT");
      }
    },
    buyTicket: function(showtime) {
      showtime.buyTicket = !showtime.buyTicket;
      console.log(showtime.movie);
      console.log("BUYING TICKET?");
      console.log(showtime.buyTicket);
    },
    // there's probably a way to do this without params1 & params2
    purchase: function(showtime) {
      // create user
      var params1 = {
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        email: this.newUser.email,
        credit_card: this.newUser.credit_card,
        cvv: this.newUser.cvv,
        expiration_date: "2020-09-04T20:49:33.050Z"
      };
      axios.post("/api/users", params1).then(
        console.log("USER CREATED!"));

      // create ticket
      // going to hard code the user_id for now will come up with better way later
      var params2 = {
        showtime_id: showtime.showtime_id,
      };
      axios.post("/api/tickets", params2).then(
        console.log("TICKET CREATED!"));
    
      console.log("LET'S GO TO THE MOVIES!");
    },
  },
  computed: {}
};
</script>
