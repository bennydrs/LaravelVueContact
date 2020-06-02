<template>
    <div>
        <div class="container min-vh-100">
            <div class="row min-vh-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="card card-body">
                        <h3 class="text-center">Register</h3>
                        <form @submit.prevent="register">
                            <div class="form-group">
                                <label for="">Name</label>
                                <input type="text" class="form-control" name="name" v-model="name">
                            </div>
                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="text" class="form-control" name="email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="">Password</label>
                                <input type="password" class="form-control" name="password" v-model="password">
                            </div>
                            <button class="btn btn-primary btn-block">Register</button>
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
            name: '',
            email: '',
            password: ''
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
                this.$router.push({name: 'login'})
            })
        }
    }
}
</script>