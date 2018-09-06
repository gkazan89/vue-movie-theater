<template>
  <div class="about">
    <h1>{{message}}</h1>
    <h2>All Tickets:</h2>
    <div v-for="ticket in tickets">
      <p>Movie: {{ticket.movie}}</p>
      <p>Time: {{ticket.time}}</p>
      <p>Theater: {{ticket.theater}}</p>
    </div>
    <h2>Tickets sorted by film:</h2>
    <div v-for="ticket in orderBy(tickets, 'movie')">
      <p><strong>Movie: {{ticket.movie}}</strong></p>
      <p>Time: {{ticket.time}}</p>
      <p>Theater: {{ticket.theater}}</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      tickets: [],
      message: "View Orders",
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/tickets").then(
      function(response) {
        console.log(response);
        this.tickets = response.data;
      }.bind(this)
    );
  },
  methods: {
  },
  computed: {}
};
</script>
