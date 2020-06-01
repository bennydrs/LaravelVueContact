<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <h3 class="mb-3">Create new contact</h3>
                <form @submit.prevent="addData()">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" v-model="name" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="number" class="form-control" v-model="phone" id="phone" required>
                    </div>
                    <vue-button-spinner
                        :is-loading="isLoading" 
                        :disabled="isLoading"
                        :status="status">
                        <span>Save</span>
                    </vue-button-spinner>
                    <!-- <button class="btn btn-primary">Save</button> -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import VueButtonSpinner from 'vue-button-spinner';
export default {
    data() {
        return{
            name : '',
            phone: '',
            isLoading: false,
			status: '',
        }
    },
    components: {	
		VueButtonSpinner
	},
    methods: {
        addData(){
            this.isLoading = true

            let headers = {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            }
            let postData = {
                name: this.name,
                phone: this.phone
            }
            // post data
            axios.post('http://localhost:8000/api/contact', postData, headers)
            .then(res => {
                // push router ke read data
                this.isLoading = false
				this.status = true // or success
					setTimeout(() => { 
                        this.status = '' 
                    }, 1000) // to clear the status :)
                this.$router.push('/');
            })
            .catch(error => {
					console.error(error)
					this.isLoading = false
					this.status = false //or error
				})
        }
    }
}
</script>