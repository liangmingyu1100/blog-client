<template>
    <div class="dp-about-container">
        <div class="dp-about-container-content">
            <el-descriptions title="关于我" direction="horizontal" :column="2" border>
                <el-descriptions-item :label="item.label" v-for="(item, i) in bloggerInfo" :key="i">
                    {{ item.value }}
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="站点" direction="horizontal" :column="1" border :style="{ marginTop: '20px' }">
                <el-descriptions-item :label="item.label" v-for="(item, i) in bbsInfo" :key="i" >
                    <a :href="item.value" target="_blank" class="link">{{ item.value }}</a>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>
<script setup lang="ts">
    const bloggerInfo = [
        { label: '姓名', value: '梁铭煜' },
        { label: '民族', value: '汉族' },
        { label: '地区', value: '福建' },
        { label: '籍贯', value: '福建 厦门' },
        { label: '职业', value: '高级CV工程狮' },
        { label: 'QQ', value: '1103207898' },
        { label: 'Email', value: '1103207898@qq.com' },
        { label: '爱好', value: '喜欢篮球、户外运动、LOL' },
    ]

    const bbsInfo = [
        { label: 'github', value: 'https://github.com/liangmingyu1100' },
        { label: 'juejin', value: 'https://juejin.cn/user/1073566933588365' },
    ]
</script>
<style lang="scss">
    .dp-about-container {
        position: relative;
        display: flex;
        padding: 56px 40px 0;
        min-height: 100vh;
        &-content {
            width: 100%;
            margin: 20px;
            border-radius: 20px;
            background-color: #fff;
            padding: 25px;
        }
        .link {
            color: #8492a6;
        }
    }
</style>
