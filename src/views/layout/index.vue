<template>
    <div class="layout-content">
        <dp-Header />
        <router-view />
    </div>
</template>
<script setup lang="ts">
    import DpHeader from './src/dp-header.vue'
</script>
<style lang="scss">
    .layout-content {
        color: #8492a6;
        background-color: #f0f2f7;
        // height: 100vh;
    }
</style>
