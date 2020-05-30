<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <h3 class="mb-3">Edit Contact</h3>
                <form @submit.prevent="updateData()">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" v-model="name" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="number" class="form-control" v-model="phone" id="phone" required>
                    </div>
                    <button class="btn btn-primary">Save</button>
                    <!-- <button class="btn btn-primary">Save</button> -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: '',
            phone: ''
        }
    },
    created(){
        // load data ketika pertama kali halaman dibuka
        this.loadData();
    },
    methods:{
        loadData(){
            // load bedasarkan id
            axios.get('http://localhost:8000/api/contact/' + this.$route.params.id)
            .then(res => {
                this.name = res.data.name;
                this.phone = res.data.phone;
            });
        },
        updateData(){
            axios.put('http://localhost:8000/api/contact/' + this.$route.params.id, {
                name: this.name,
                phone: this.phone
            }).then(res => {
                // push
                this.$router.push("/")
            })
        }
    }
}
</script>