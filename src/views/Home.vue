<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Owner Portal</h2>
    <h3>Current Showtimes</h3>
    <div v-for="showtime in showtimes">
      <p>Movie: {{showtime.movie}}</p>
      <p>Showtime: {{showtime.time}}</p>
      <p>Theater: {{showtime.theater}}</p>
    </div>
    <h3>Auditoriums</h3>
    <div v-for="theater in theaters">
      <p>Theater_ID: {{theater.theater_id}}
      <p>Capacity: {{theater.capacity}}</p>
    </div>
    <button>Add Theater</button>
    <h3>Movies</h3>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      showtimes: [],
      theaters: [],
      movies: [],
      message: "Movie Theater App"
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
    axios.get("http://localhost:3000/api/theaters").then(
      function(response) {
        console.log("theaters");
        console.log(response);
        this.theaters = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};
</script>