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
    <button>Add Showtime</button>
    <h3>Auditoriums</h3>
    <div v-for="theater in theaters">
      <p>Theater_ID: {{theater.theater_id}}
      <p>Capacity: {{theater.capacity}}</p>
    </div>
    <button>Add Theater</button>
    <h3>Movies</h3>
    <div v-for="movie in movies">
      <p>Movie: {{movie.name}}</p>
      <p>Runtime: {{movie.runtime}}</p>
    </div>
    <button type="button" v-on:click="addMovie()">Add Movie</button>
    <div class="newMovie" v-if="newMovie">
      <h3>Add Movie:</h3>
      <div>
        Name:<input type="text" v-model="movieCreate.name">
        Runtime:<input v-model.number="movieCreate.runtime" type="number">
      </div>
      <button type="button" v-on:click="saveMovie(movieCreate)">Submit Movie</button>
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
      showtimes: [],
      theaters: [],
      movies: [],
      newMovie: false,
      movieCreate: { name: "", runtime: "" },
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
    axios.get("http://localhost:3000/api/movies").then(
      function(response) {
        console.log("movies:");
        console.log(response);
        this.movies = response.data;
      }.bind(this)
    );
  },
  methods: {
    addMovie: function() {
      this.newMovie = !this.newMovie;
      console.log(this.newMovie);
      console.log("ADD MOVIE");
    },
    saveMovie: function(movieCreate) {
      console.log("READY TO SHOW!");
      console.log(this.movieCreate);
      var params = {
        name: this.movieCreate.name,
        runtime: this.movieCreate.runtime
      };
      axios.post("http://localhost:3000/api/movies", params);
      console.log("SUCCESS!");
    }
  },
  computed: {}
};
</script>
