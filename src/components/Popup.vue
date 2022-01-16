<template>
  <div v-if="isOpen" class="backdrop">
    <div class="popup">
      <h2>More information at the BEER</h2>
      <hr />
      <slot>
        <!-- do you really want to remove this beer from the list? -->
      </slot>
      <hr />
      <div>
      <button @click="$emit('close')">Close</button></div>
    </div>
  </div>
</template>

<script>
export default {
   props: {
    isOpen: {
      type: Boolean,
      required: true,
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
