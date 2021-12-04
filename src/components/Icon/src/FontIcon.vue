<template>
    <i
        :class="['iconfont', prefix + name]"
        :style="{ color: color, fontSize: fontSize }"
        @click="$emit('click', $event)"
    ></i>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'FontIcon',
    })
</script>

<script setup lang="ts">
    defineProps({
        prefix: {
            type: String,
            default: 'icon-',
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: '#000',
        },
        fontSize: {
            type: String,
            default: '20px',
        },
    })
</script>

<style scoped>
    @import '//at.alicdn.com/t/font_2952749_jvvu6wjgwp.css';

    i {
        display: inline-block;
        margin: 0 auto;
    }
</style>
