<template>
  <div>
    <div>Name: {{ customer.name }}</div>
    <div>Email: {{ customer.email }}</div>
  </div>
</template>

<script>
export default {
  name: "vShowCustomer",
  props: {
    customer: Object,
  },
};
</script>

<style scoped></style>
