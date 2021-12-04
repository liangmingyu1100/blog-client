<script setup lang="ts">
    import { defineProps, ref, reactive, computed, watch } from 'vue'
    const props = defineProps({
        time: {
            type: Number,
            default: 10,
        },
        color: {
            type: String,
            default: '#FFF',
        },
        backgroundColor: {
            type: String,
            default: 'pink',
        },
        fontSize: {
            type: Number,
            default: 14,
        },
    })

    const btnDisabled = ref(false)

    const cursorStyle = computed(() => {
        return btnDisabled.value ? 'default' : 'pointer'
    })

    watch(cursorStyle, val => {
        getStyle.cursor = val
    })

    const getStyle = reactive({
        color: props.color,
        backgroundColor: props.backgroundColor,
        fontSize: props.fontSize,
        cursor: cursorStyle.value,
    })

    const count = ref(props.time)
    const formatTime = (time: number): number => {
        return Math.round(time / 1000)
    }
    const timer = ref({} as any)
    const onClick = () => {
        window.localStorage.setItem('time', JSON.stringify(Date.now()))
        useInterval()
    }

    const useInterval = () => {
        btnDisabled.value = true
        timer.value = setInterval(() => {
            let time = window.localStorage.getItem('time') as string
            count.value = props.time - formatTime(Date.now() - parseInt(time))
            !count.value && switchBtnState()
        }, 1000)
    }

    const switchBtnState = () => {
        btnDisabled.value = false
        count.value = props.time
        console.log(getStyle)
        timer.value && clearInterval(timer.value)
    }

    const refresh = () => {
        let time = window.localStorage.getItem('time') as string
        let elapsedTime = formatTime(Date.now() - parseInt(time))
        if (elapsedTime < props.time) {
            count.value = props.time - elapsedTime
            useInterval()
        }
    }
    window.localStorage.getItem('time') && refresh()
</script>
<template>
    <slot>
        <button class="verification-code-btn" :style="getStyle" @click="onClick" :disabled="btnDisabled">
            {{ btnDisabled ? `${count}s后再试` : '获取验证码' }}
        </button>
    </slot>
</template>
<style lang="scss">
    .verification-code-btn {
        width: 110px;
        height: 44px;
        line-height: 44px;
        background-color: pink;
        text-align: center;
        cursor: pointer;
        border: 0;
        &::focus {
            outline: none;
        }
    }
    .disabled {
        cursor: default;
    }
</style>
