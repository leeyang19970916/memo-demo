<template>
    <div>
        <div class="title">{{selectTitle}}</div>
        <div class="d-flex justify-content-between array-filter ">

            <div>
                {{memoList.length}} <span class="pl-1">notes</span>
            </div>
            <div class="px-1 py-1" type="button" @click="showModal()">
                <dd>
                    <i class="fa-solid fa-arrow-down-short-wide"></i>
                </dd>
            </div>
        </div>

        <div>
            <dd class="gray-line"></dd>
        </div>
        <ul>

            <li v-for="(item, index) in memoList " :key="item.id">
                <div class="memo-card" @click="SelectParticularMemo(item)">
                    <div class=" memo-card-title ">
                        <dd>{{item.title}}</dd>

                    </div>
                    <div class="memo-card-content ">
                        <div v-html="item.content"></div>
                    </div>
                    <div class="memo-card-date">
                        <dd>
                            <p>{{item.date}}</p>
                        </dd>
                        <dt>
                            <p>{{item.category}}</p>
                        </dt>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 舊版 -->
        <div class="border selectModal px-3 py-3" :class="{'selectModal-show':showtheModal}">

            <dd>
            <dt>
                <p title="sort" @click="DateFilter()" type="button" class="text-right px-2 py-1 sort-color"><i
                        class="fa-solid fa-up-down"></i></p>
            </dt>
            <dt>
                <h6 class="text-center text-dark ">Search</h6>
            </dt>
            <dt>
                <p title="close" @click="showModal()" type="button" class="text-right px-2 py-1 close-color"><i
                        class="fa-solid fa-xmark"></i></p>
            </dt>

            </dd>
            <input class="form-control mb-2 " placeholder=" Title / Category / Date" v-model="selectID" type="text" />
        </div>
        <!-- 舊版 -->

    </div>
</template>
<script>
    import $ from "jquery";
    export default {
        data() {
            return {
                selectID: "",
                showtheModal: false,
                sortByDate: false,
                listArray: [],
                listObject: {
                    title: "", //標題
                    date: "", //創造日期
                    id: "", //日期轉ID
                    content: "", //內容
                    image: "", //圖片
                    category: "" //做分類
                },
            }
        },
        watch: {
            selectID() {
                this.fasterSearch();
            }
        },
        methods: {
            SelectParticularMemo(item) {
                // 指定特定MEMO
                // item是點選的單一物件內容
                const vm = this

                vm.$store.dispatch('SelectParticularMemo', item)

                this.$store.dispatch('RWDchangeToWriting',true)
            },
            DateFilter() {
                const vm = this
                vm.sortByDate = !vm.sortByDate
                vm.$store.dispatch('DateFilter', vm.sortByDate)
            },
            showModal() {
                const vm = this
                vm.showtheModal = !vm.showtheModal

            },
            fasterSearch() {
                const vm = this
                vm.$store.dispatch('fasterSearch', vm.selectID)
            }
        },
        created() {

        },
        computed: {
            memoList() {
                return this.$store.state.memoList
            },
            selectTitle() {
                return this.$store.state.nowSelectTile
            },
            RWDchange(){
                return this.$store.state.RWDchange
            }
        }
        
    }
</script>