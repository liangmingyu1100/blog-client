<template>
    <div class="login">login</div>
</template>
<script setup lang="ts">
    import { fetchOutsideUrl, getInviteActivityInfo, getUserInfo } from '/@/api/test'
    fetchOutsideUrl()
        .then(res => console.log(res))
        .catch(e => console.log(e))
    getInviteActivityInfo()
        .then(res => console.log(res))
        .catch(e => console.log(e))
    getUserInfo()
        .then(res => console.log(res))
        .catch(e => console.log(e))
    // fetch('/api/getUser')
    //     .then(res => console.log(res))
    //     .catch(e => console.log(e))
</script>
<style lang="scss">
    .login {
        width: 100vw;
        height: 100vh;
    }
</style>
