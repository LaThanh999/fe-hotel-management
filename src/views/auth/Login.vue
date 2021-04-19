<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="6" class="left"> </v-col>
      <v-col cols="6" class="right flex-align-center">
        <div>
          <h1>Welcome to hotel admin</h1>
          <h2 style="margin-top:10px">LOGIN</h2>
          <v-form
            ref="form"
                  v-model="valid"
                  lazy-validation>
            <v-text-field
              outlined
              label="Username"
              background-color="#E3F2FD"
              color="#424242"
              rounded
              :counter="20"
              :rules="usernameRules"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              outlined
              background-color="#E3F2FD"
              rounded
              color="#424242"
              :counter="20"
              :rules="passwordRules"
              required
            ></v-text-field>
            <div class="d-flex justify-content-center">
              <v-btn
                color="#E0E0E0"
                rounded
              >
                Login
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </section>
</template>
<script>


export default {
  components: {
  },
  data: () => ({
    valid: true,
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 20) || 'Username must be less than 20 characters',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 20) || 'Password must be less than 20 characters',
    ],
  }),
  computed: {

  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  }
};
</script>
<style lang="scss" scoped>
.section-container {
  background: #fff;
  height: 100%;
  position: relative;
  .signin {
    padding: 0;
    width: 55%;
    max-width: 1000px;
    margin: auto;
    min-height: 600px;
    box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .left {
      background-image: url("../../assets/backroundHotel.jpg");
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      color: #1976d2;
      background-color: #f9f9f9;
    }
    .right {
      padding: 30px;
      box-sizing: border-box;
      background: #1976d2;
      color: #fff;
      h2 {
        text-align: center;
        margin-bottom: 30px;
      }
    }
  }
}
.flex-align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-container .signin .right .signin-btn[data-v-ef68022e] {
  color: #fff;
}
.theme--dark.v-btn.v-btn--has-bg {
  background-color: #272727ab;
}</style
>>
