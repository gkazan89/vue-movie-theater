<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Admin</router-link> |
      <router-link to="/about">User</router-link> | 
      <router-link to="/orders">View Orders</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

</style>
