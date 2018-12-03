<template>
  <div>
    <p>Search Image</p>
    <input type="text" v-model="keyword">{{keyword}}
  </div>
</template>

<script>
export default {
  data() {
    return {
        keyword:''
    };
  }
};
</script>
