<template>
    <div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="row mb-3">
                    <div class="col-md-10">
                        <h3>Contact</h3>
                    </div>
                    <div class="col-md-2">
                        <router-link class="btn btn-primary" to="/create">Tambah</router-link>
                    </div>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contact in contacts" :key="contact.id">
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.phone }}</td>
                        <td>
                            <router-link class="btn btn-warning btn-sm" :to="'/detail/'+ contact.id">Edit</router-link>
                            <button class="btn btn-danger btn-sm" @click="deleteData(contact.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            contacts: [],
            token: {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            }
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        loadData(){
            axios.get('/api/contacts', this.token)
            .then(res => {
                this.contacts = res.data.data;
            });
        },
        deleteData(id){
            if(confirm('Are you sure?')){
                axios.delete('http://localhost:8000/api/contact/'+ id, this.token)
                .then(res => {
                    this.loadData();
                });
                
            }
        }
    }
}
</script>