<template>
  <div>nice</div>
</template>

<script>
    export default {
      name: "cashFlowAnalysis",
      data() {
        return {

        }
      },
      computed: {
        navbarDoQuery() {
          return this.$store.state.app.navbarDoQuery
        }
      },
      watch: {
        navbarDoQuery: {
          handler(newValue, oldValue) {
            console.log('cashFlowAnalysis-watch')
            // this.clickedQuery()
          },
          immediate: true
        },
      },
      created() {
        console.log('cashFlowAnalysis-created')
      },
      mounted() {

      },
      methods: {

      },
    }
</script>

<style scoped>

</style>
