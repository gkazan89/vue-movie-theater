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
        <ul>
          <li v-for="error in errors" class="error">
            {{error}}
          </li>  
        </ul>
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

.soldOut,
.error {
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
      errors: [],
      newUser: {
        first_name: "",
        last_name: "",
        email: "",
        credit_card: "",
        cvv: "",
        expiration_date: ""
      },
      newTicket: { user_id: "", showtime_id: "", seat: "" }
    };
  },

  created: function() {
    axios.get("http://localhost:3000/api/showtimes").then(
      function(response) {
        console.log("showtimes:");
        console.log(response);
        this.showtimes = response.data;
      }.bind(this)
    );

    axios.get("http://localhost:3000/api/tickets").then(
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
      this.showtime_id = showtime.showtime_id;
      console.log("HELLO???");
      console.log(showtime, this.showtime_id);
      console.log(showtime.movie);
      console.log("BUYING TICKET?");
      console.log(showtime.buyTicket);
    },
    purchase: function(showtime) {
      this.errors = [];
      var params = {
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        email: this.newUser.email,
        credit_card: this.newUser.credit_card,
        cvv: this.newUser.cvv,
        showtime_id: this.showtime_id
      };
      axios
        .post("http://localhost:3000/api/tickets", params)
        .then(
          function(response) {
            console.log("TICKET CREATED!", response);
            this.tickets.push(response.data);
            showtime.buyTicket = !showtime.buyTicket;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },
  computed: {}
};
</script>
