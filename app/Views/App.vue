<template>
  <div id="app">
    <img class="logo" src="../../resources/images/logo.png">
    <hello></hello>
    <p>
      Welcome to your Quark app!
    </p>
  </div>
</template>

<script>
// import path from 'path'
import Hello from './Components/Hello'
import CommandManager from '../Console/CommandManager'
import OpenFinder from '../Console/Commands/OpenFinder'

export default {
  components: {
    Hello
  },

  ready() {
    CommandManager.make(new OpenFinder('~/')).background().execute()
  }
}
</script>

<style lang="scss">
@import '../../node_modules/bootstrap/scss/bootstrap.scss';

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;

  a {
    color: #47848f;
    text-decoration: none;
  }
}

.logo {
  width: 100px;
  height: 100px
}
</style>
