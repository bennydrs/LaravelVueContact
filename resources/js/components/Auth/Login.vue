<template>
    <div>
        <div class="container min-vh-100">
            <div class="row min-vh-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="card card-body">
                        <h2 class="text-center">Login</h2>
                        <div v-if="successMessage" class="alert alert-success">
                            {{ successMessage }}
                        </div>

                        <div v-if="serverError" class="alert alert-danger">
                            {{ serverError }}
                        </div>
                        <form action="" @submit.prevent="login">
                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="text" class="form-control" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="">Password</label>
                                <input type="password" class="form-control" v-model="password">
                            </div>
                            <button class="btn btn-primary btn-block">Login</button>
                        </form>
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
            email: '',
            password: '',
            serverError: '',
            successMessage: this.dataSuccessMessage
        }
    },
    props: {
        dataSuccessMessage: {
            type : String
        }
    },
    methods:{
        login(){
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                this.$router.push({name: 'read'})
            })
            .catch(error => {
                this.serverError = error.response.data
                this.password = '',
                this.successMessage = ''
            })
        }
    }
}
</script>