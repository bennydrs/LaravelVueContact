<template>
</template>
<script>
export default {
    created(){
        this.$store.dispatch('logout')
        .then(res => {
            this.$router.push('/login');
        })
    }
}
</script>