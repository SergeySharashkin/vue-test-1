<template>
  <div v-if="isOpen" class="backdrop">
    <div class="modal-win">
      <h2 class="pop-title">More information at the BEER</h2>
      <hr />
      <slot name="intrestedBeer">
        <!-- do you really want to remove this beer from the list? -->
      </slot>
      <hr />
      <div>
      <button class="btn __close" @click="$emit('close')">Close</button></div>
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
  emits: {
    close: null,
  }
};
</script>


