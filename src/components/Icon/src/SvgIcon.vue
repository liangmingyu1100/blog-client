<template>
    <svg :class="[svgClass, $attrs.class]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'SvgIcon',
        // inheritAttrs: false,
    })
</script>

<script setup lang="ts">
    import { computed } from 'vue'
    const props = defineProps({
        prefix: {
            type: String,
            default: 'icon',
        },
        iconClass: {
            type: String,
            required: true,
        },
        className: {
            type: String,
        },
    })
    const iconName = computed(_ => `#${props.prefix}-${props.iconClass}`)
    const svgClass = computed(() => {
        return props.className ? 'svg-icon ' + props.className : 'svg-icon'
    })
</script>

<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
