<template>
    <el-dialog :title="windowTitle" :before-close="handleClose" :width="windowWidth" :visible.sync="dialogVisible"
        @handleClose="handleClose" close-on-press-escape @updateList="updateList">
        <div class="userMesaage" v-if="isShow">
            <el-form label-width="80px">
                <el-form-item label="户主姓名">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="证件编号">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <el-button type="success" @click="cardDiscern" id="singleReadIDCard">身份证识别</el-button>
        </div>
        <div v-else>
            <el-form label-width="80px">
                <el-form-item label="姓名">
                    <el-input id="userName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input id="sex"></el-input>
                </el-form-item>
                <el-form-item label="民族">
                    <el-input id="nation"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-input id="birth"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input id="card"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址">
                    <el-input id="address"></el-input>
                </el-form-item>
                <el-form-item label="签发机关">
                    <el-input id="issuing"></el-input>
                </el-form-item>
                <el-form-item label="开始期限">
                    <el-input id="beginTime"></el-input>
                </el-form-item>
                <el-form-item label="结束期限">
                    <el-input id="endTime"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="success" @click="">确定</el-button>
            <el-button type="success" @click="cardDiscern">重新识别</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {
        card
    } from './Card.js'
    export default {
        name: 'LhltCard',
        props: {
            dialogVisible: {
                type: Boolean,
                default: true
            },
            windowWidth: {
                type: String,
                default: '500px'
            },
            windowTitle: {
                type: String,
                default: '身份证识别'
            },
        },
        data() {
            return {
                isShow: true
            }
        },
        methods: {
            handleClose(done) {
                this.$emit('update:dialogVisible', false);
            },
            updateList() {
                this.$emit('updateList')
            },
            cardDiscern(){
                this.isShow = false
                card.cardDiscern()
            }
        },
    }
</script>

<style>

</style>