<template>
    <nav class="nav-bar-wrapper">
        <div class="nav-bar-wrapper-logo">
            <slot name="left">logo</slot>
        </div>
        <div class="nav-bar-wrapper-controls">
            <slot name="right">controls</slot>
        </div>
    </nav>
</template>

<script setup lang="ts"></script>
<style lang="scss">
    .nav-bar-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        right: 0;
        padding: 0 40px;
        height: 56px;
        line-height: 56px;
        // background-color: red;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
    }
</style>
