<template>
    <div>
        <div class=" d-flex ">
            <!-- 左邊 -->
            <div id="left" class="col-2 " :class="{'short-left':!MenuIsChange}">
                <div class="px-4 pt-3 textCenter ">
                    <div class="user-iconblock ">
                        <i class="fa-solid fa-circle-user user-icon "></i>    <span :class="{'d-none':!MenuIsChange,'dynamicUser':MenuIsChange}">User</span>
                    </div>
                </div>
                <div class="addbtn-block py-3" :class="{'addbtn-block-short':!MenuIsChange}">
                    <!-- 小BTN -->
                    <button :class="{'d-none':MenuIsChange}" @click.prevent="addNewMemo()" type="button"
                        class="btn btn-newnote px-3 short-btn-position "><i class="fa-solid fa-plus "></i></button>
                    <!-- 完整BTN -->
                    <button :class="{'dynamicBtn':MenuIsChange,'d-none':!MenuIsChange}" @click.prevent="addNewMemo()"
                        type="button" class="btn btn-newnote px-3 ">
                        <span>
                            <i class="fa-solid fa-plus "></i> <span class="pl-2"> New Note</span>
                        </span></button>
                    <!-- RWD BTN -->
                    <button @click.prevent="newModalRWD()" type="button"
                        class="btn btn-newnote px-3 btn-position-RWD"><i class="fa-solid fa-plus "></i></button>
                </div>
                <div class="list-set-block">
                    <div :class="{'list-active':isActive==1}" @click="changeList(1)" class="list-set list-set1 py-2"
                        type="button"><i class="fa-solid fa-star list-icon pr-2"></i> <span
                            :class="{'d-none':!MenuIsChange,'dynamicList':MenuIsChange}">Shortcuts </span> </div>
                    <div :class="{'list-active':isActive==2}" @click="changeList(2)" class="list-set list-set2 py-2"
                        type="button"><i class="fa-solid fa-file-lines list-icon1 pr-3"></i> <span
                            :class="{'d-none':!MenuIsChange,'dynamicList':MenuIsChange}"> All Notes</span></div>
                    <div :class="{'list-active':isActive==3}" @click="changeList(3)" class="list-set list-set3 py-2"
                        type="button"><i class="fa-solid fa-trash list-icon2 "></i> <span
                            :class="{'d-none':!MenuIsChange,'dynamicList':MenuIsChange}">Trash </span> </div>
                    <!-- 3 -->
                </div>
                <div v-if="!MenuIsChange" @click="listMenu()">
                    <span type="button" class="btn-position">
                        <i class="fa-solid fa-angles-right"></i>
                    </span>
                </div>
                <div v-if="MenuIsChange" @click="listMenu()">
                    <span type="button" class="btn-position">
                        <i class="fa-solid fa-angles-left"></i>
                    </span>
                </div>
                <div>
                </div>
            </div>
            <!-- 中間 -->
            <div id="middle" class="col-4" :class="{'dd-change':RWDchange}">

                <memoPageList></memoPageList>

                
            </div>
            <!-- 右邊 -->
            <div id="right" :class="{'RWD-width':!MenuIsChange,'col-6':MenuIsChange,'d-block':RWDchange}">
                <memoPageWriting></memoPageWriting>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from "jquery"
    import memoPageList from './memo-pageList'
    import memoPageWriting from './memo-pageWriting'
    export default {
        components: {
            memoPageList,
            memoPageWriting
        },
        data() {
            return {
                isActive: 2,
                MenuIsChange: true,
                selectTitle: "All Notes",
                RWDchangeToWriting:false,

            }
        },
        methods: {
            changeList(number) {
                const vm = this
                vm.isActive = number
                if (number == 1) {
                    vm.selectTitle = "Shortcuts"
                } else if (number == 2) {
                    vm.selectTitle = "All Notes"
                } else {
                    vm.selectTitle = "Trash"
                }
                this.$store.dispatch('nowTitle', vm.selectTitle)
                this.RWDchangeToWriting = false
                this.$store.dispatch('RWDchangeToWriting', this.RWDchangeToWriting)
                
            },
            listMenu() {
                const vm = this
                vm.MenuIsChange = !vm.MenuIsChange
            },
            addNewMemo() {
                this.$store.dispatch('AddNewMemo')
            },
            newModalRWD() {
                this.RWDchangeToWriting = ! this.RWDchangeToWriting
                this.$store.dispatch('RWDchangeToWritingNEW', this.RWDchangeToWriting)
            }

        },
        created() {
            this.changeList(2)
        },
        computed: {
            RWDchange(){
                return this.$store.state.RWDchange
            }
        }

    };
</script>