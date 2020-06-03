  <template>
    <div>
      <div class="container min-vh-100">
        <div class="row min-vh-100 justify-content-center align-items-center">
            <div class="col-md-6">
                <div class="card card-body">
                  <h3 class="text-center">Register</h3>

                  

                  <ValidationObserver ref="form" v-slot="{ passes }">
                    <form @submit.prevent="passes(register)">
                        <div class="form-group">
                            <label for="">Name</label>
                            <ValidationProvider vid="name" name="name" v-slot="{ errors }">
                              <input type="text" class="form-control" :class="{'is-invalid' : errors[0]}" name="name" v-model="name">
                              <span class="text-danger" v-show="errors[0]">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <label for="">Email</label>
                          <ValidationProvider vid="email" name="email" v-slot="{ errors }">
                            <input type="text" class="form-control" :class="{'is-invalid' : errors[0]}" name="email" v-model="email">
                            <span class="text-danger">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <ValidationProvider vid="password" name="password" v-slot="{ errors }">
                            <label for="">Password</label>
                            <input type="password" class="form-control" :class="{'is-invalid' : errors[0]}" name="password" v-model="password">
                            <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                        <button class="btn btn-primary btn-block">Register</button>
                    </form>
                  </ValidationObserver>

                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            name: '',
            email: '',
            password: '',
            successMessage: ''
        }
    },
    methods:{
      register(){
        this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(res => {
          this.successMessage = 'Registered Successfully'
          this.$router.push({name: 'login', params:{dataSuccessMessage : this.successMessage}})
        })
        .catch(error => {
          this.$refs.form.setErrors(
            error.response.data.errors
          );
          
        })
      }
    }
}
</script>