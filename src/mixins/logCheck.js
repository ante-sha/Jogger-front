export default {
  methods: {
    Check () {
      if (!this.$root.token) {
        alert('You must be logged in for this action!')
        this.$router.push('/login')
        return false
      } else {
        return true
      }
    }
  }
}
