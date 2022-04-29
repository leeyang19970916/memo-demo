<template>
    <div>
        <!-- 新增內容 -->
        <form v-if="!isEdit" action="">
            <div class="d-flex justify-content-start  writing-title ">

                <div class="writing-title-primary ">
                    <input v-model="EditObject.title" class="title font-weight-bold" maxlength="40" type="text"
                        placeholder="Title" />
                    <span>
                        /
                    </span>
                    <input v-model="EditObject.category" class="category" maxlength="11" type="text"
                        placeholder="category" />
                </div>

                <div class="writing-title-icon  text-right">
                    <div v-if="EditObject.star" type="button" @click="BeStar(EditObject)">
                        <span class="star icon-transition">
                            <i class="fa-solid fa-star"></i>
                        </span>
                    </div>
                    <div v-else type="button" @click="BeStar(EditObject)">
                        <span class="star icon-transition">
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </span>
                    </div>
                    <span @click="delEvent(EditObject)" class="eraser icon-transition" type="button">
                        <i class="fa-solid fa-eraser"></i>
                    </span>
                </div>
            </div>
            <!-- 投 -->
            <div class="writing-title-phone">
                <div class="title-phone">
                    <input v-model="EditObject.title" class="title font-weight-bold" maxlength="40" type="text"
                        placeholder="Title" />
                </div>
                <div class="d-flex justify-content-between align-self-center align-items-baseline title-two">
                    <div class="category-phone">
                        <input v-model="EditObject.category" class="category" maxlength="11" type="text"
                            placeholder="category" />
                    </div>
                    <div>
                        <div class="writing-title-icon  text-right">
                            <div v-if="EditObject.star" type="button" @click="BeStar(EditObject)">
                                <span class="star icon-transition">
                                    <i class="fa-solid fa-star"></i>
                                </span>
                            </div>
                            <div v-else type="button" @click="BeStar(EditObject)">
                                <span class="star icon-transition">
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                </span>
                            </div>
                            <span @click="delEvent(EditObject)" class="eraser icon-transition" type="button">
                                <i class="fa-solid fa-eraser"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="writing-title-primary ">
                </div>
            </div>
            <!-- 尾巴 -->
            <div class="content-style">
                <div class="Vue-Quill-Editor">
                    <quill-editor v-model:content="EditObject.content" contentType="html" ref="myQuillEditor"
                        :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
                    </quill-editor>
                    <button @click.prevent="SendTHeMemo(EditObject)" type="button"
                        class="btn btn-outline-secondary w-100 mt-3 send-btn"><i
                            class="fa-solid fa-arrow-left-long pr-2"></i>Send</button>
                </div>
            </div>
        </form>
        <form v-if="isEdit" action="">
            <div class="d-flex justify-content-start  writing-title ">

                <div class="writing-title-primary ">
                    <input v-model="EditSingleObject.title" class="title font-weight-bold" maxlength="40" type="text"
                        placeholder="Title" />
                    <span>
                        /
                    </span>
                    <input v-model="EditSingleObject.category" class="category" maxlength="11" type="text"
                        placeholder="category" />
                </div>
                <div class="writing-title-icon  text-right">
                    <!-- replay -->
                    <div v-if="EditSingleObject.trash">
                        <span type="button" @click="replayToList(EditSingleObject)" class="replay  icon-transition">
                            <i class="fa-solid fa-reply"></i>
                        </span>
                    </div>
                    <!-- star -->
                    <div v-else>
                        <div v-if="EditSingleObject.star" type="button" @click="BeStar(EditSingleObject)">
                            <span class="star  icon-transition">
                                <i class="fa-solid fa-star"></i>
                            </span>
                        </div>
                        <div v-else type="button" @click="BeStar(EditSingleObject)">
                            <span class="star  icon-transition">
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </span>
                        </div>
                    </div>
                    <div>
                        <span v-if="EditSingleObject.trash" @click="delCompletely(EditSingleObject)"
                            class="circle-xmark icon-transition" type="button">
                            <i class=" fa-solid fa-circle-xmark"></i>
                        </span>
                    </div>
                    <div>
                        <span v-if="!EditSingleObject.trash" @click="delEditObject(EditSingleObject)"
                            class="trash  icon-transition" type="button">
                            <i class="fa-solid fa-trash-can"></i>
                        </span>
                    </div>
                </div>


            </div>

            <!-- 投 -->
            <div class="writing-title-phone">
                <div class="title-phone">
                    <input v-model="EditSingleObject.title" class="title font-weight-bold" maxlength="40" type="text"
                        placeholder="Title" />
                </div>
                <div class="d-flex justify-content-between align-self-center align-items-baseline title-two">
                    <div class="category-phone">
                        <input v-model="EditSingleObject.category" class="category" maxlength="11" type="text"
                            placeholder="category" />
                    </div>
                    <div>
                        <div class="writing-title-icon  text-right">
                            <div v-if="EditSingleObject.trash">
                                <span type="button" @click="replayToList(EditSingleObject)"
                                    class="replay  icon-transition">
                                    <i class="fa-solid fa-reply"></i>
                                </span>
                            </div>
                            <!-- star -->
                            <div v-else>
                                <div v-if="EditSingleObject.star" type="button" @click="BeStar(EditSingleObject)">
                                    <span class="star  icon-transition">
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                </div>
                                <div v-else type="button" @click="BeStar(EditSingleObject)">
                                    <span class="star  icon-transition">
                                        <i class="fa-solid fa-star-half-stroke"></i>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span v-if="EditSingleObject.trash" @click="delCompletely(EditSingleObject)"
                                    class="circle-xmark icon-transition" type="button">
                                    <i class=" fa-solid fa-circle-xmark"></i>
                                </span>
                            </div>
                            <div>
                                <span v-if="!EditSingleObject.trash" @click="delEditObject(EditSingleObject)"
                                    class="trash  icon-transition" type="button">
                                    <i class="fa-solid fa-trash-can"></i>
                                </span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <!-- 尾巴 -->
            <div class="content-style">
                <div class="Vue-Quill-Editor-single">
                    <quill-editor v-model:content="EditSingleObject.content" contentType="html" ref="myQuillEditor"
                        :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">

                    </quill-editor>
                </div>


            </div>
        </form>
    </div>
</template>
<script>
    import $ from "jquery";
    export default {
        data() {
            return {
                EditArray: [],
                EditObject: {
                    title: "",
                    content: "",
                    date: "",
                    id: "",
                    category: "",
                    preview: null, //圖片樣子
                    image: null, //圖片名稱
                    star: false,
                    trash: false,
                },
                preview: null,
                image: null,
                star: false,
                trash: false,
                content: '<h2>I am Example</h2>',
                editorOption: {
                    // some quill options
                    placeholder: "Start writing...",
                    theme: 'snow',
                    modules: {
                        toolbar: [

                            ['bold', 'underline'], //加粗，斜體，下劃線，刪除線
                            [{
                                'size': ['small', false, 'large', 'huge']
                                // 'size': ['small','normal', false , 'huge']
                            }], // 字型大小
                            [{
                                'script': 'sub'
                            }], // 上下標
                            [{
                                'list': 'ordered'
                            }, {
                                'list': 'bullet'
                            }], //列表
                            [{
                                'color': []
                            }, {
                                'background': []
                            }], // 字型顏色，字型背景顏色
                            [{
                                'align': []
                            }], //對齊方式
                            ['image'] //上傳圖片、上傳視訊

                        ]
                    },

                }

            }
        },

        methods: {
            onEditorBlur(quill) {
                // console.log('editor blur!', quill)
            },
            onEditorFocus(quill) {
                // console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
                // console.log('editor ready!', quill)
            },
            onEditorChange({
                quill,
                html,
                text
            }) {
                // console.log('editor change!', quill, html, text)
                this.content = html
            },
            SendTHeMemo(EditObject) {
                const vm = this
                var Today = new Date();
                vm.EditObject.date = `${Today.getFullYear()}/${(Today.getMonth()+1)}/${Today.getDate()}` //OK
                vm.EditObject.id = Math.floor(Date.now()) //OK
                vm.EditObject.preview = vm.preview //ok

                const formalObject = vm.EditObject
                // 核心部分
                if (!formalObject.title) {
                    formalObject.title = "無標題"
                }
                if (!formalObject.category) {
                    formalObject.category = "一般"
                }
                if (!formalObject.content) {
                    formalObject.content = "輸入內容..."
                }
                vm.$store.dispatch('SendTHeMemo', vm.EditObject)
                vm.EditObject = {
                    title: "",
                    content: "",
                    date: "",
                    id: "",
                    category: "",
                    preview: null, //圖片樣子
                    image: null, //圖片名稱
                    star: false,
                    trash: false,
                }
            },
            previewImage(event) {
                var input = event.target;
                if (input.files) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.preview = e.target.result;
                        this.EditObject.preview = this.preview
                        this.$store.state.memoSingle.preview = this.preview
                    }
                    this.image = input.files[0].name;
                    this.EditObject.image = this.image
                    this.$store.state.memoSingle.image = this.image
                    reader.readAsDataURL(input.files[0]);
                }
            },
            delImage(e) {
                e.image = null
                e.preview = null
                this.preview = null
                this.image = null

                vm.EditObject = {
                    preview: null, //圖片樣子
                    image: null, //圖片名稱
                }
            },
            delEvent(eTrash) {
                const vm = this
                vm.EditObject = {
                    title: "",
                    content: "",
                    date: "",
                    id: "",
                    category: "",
                    preview: null, //圖片樣子
                    image: null, //圖片名稱
                    star: false,
                    trash: false,
                }
            },
            BeStar(eStar) {
                eStar.star = !eStar.star
                const vm = this

                vm.$store.dispatch('BeStar', eStar)
            },
            delEditObject(EditSingleObject) {
                const vm = this
                EditSingleObject.trash = true
                vm.$store.dispatch('delEditObject', EditSingleObject)
            },
            delCompletely(EditSingleObject) {
                const vm = this
                vm.$store.dispatch('delCompletely', EditSingleObject)
            },
            replayToList(EditSingleObject) {
                const vm = this
                EditSingleObject.trash = false
                vm.$store.dispatch('replayToList', EditSingleObject)
            }
        },
        created() {},
        computed: {
            EditSingleObject() {
                return this.$store.state.memoSingle
            },
            isEdit() {
                return this.$store.state.isEdit
            },
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {},

    }
</script>