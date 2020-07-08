<template>
    <div>
        <top></top>
        <b-container fluid>
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
import top from '../layout/top'

export default {
    name: 'index',
    components: {
        top
    }
}
</script>

<style scoped>
</style>