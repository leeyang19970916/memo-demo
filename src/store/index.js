import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    memoList: [],
    memoSingle: {},
    isEdit: false,
    nowSelectTile: "",
    temArray: [],
    searchID: "",
    RWDchange:false
  },
  mutations: {
    //   ['UPDATE_JWT_TOKEN'](state, token) {
    //     state.jwtToken = token;
    //     Cookies.set('auth-token', token);
    // },
    // 最重要 把物件加入陣列裡面 新增為主要目的
    SENDMEMO(state, payload) {
      state.memoSingle = payload

      state.memoList.unshift(state.memoSingle)
      state.temArray.unshift(state.memoSingle)
      // state.memoSingle.star=false
      state.isEdit = false

    },
    // 選擇要編輯想閱讀的物件
    SELECTPARTICULARMEMO(state, payload) {
      // if (payload.title="無標題") {
      //   payload.title=""
      // }
      // if (payload.content="輸入內容...") {
      //       payload.content=""
      // }
      // if (payload.category="一般") {
      //       payload.category=""
      // }
      state.isEdit = true
      state.memoSingle = payload

    },
    //新增一個全新
    ADDNEWMEMO(state, payload) {
      state.memoSingle = {
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
        state.isEdit = false
    },
    // 選擇你的分類 最左邊的三大分類
    NOWTITLE(state, payload) {
      // 中間最上方標題
      state.nowSelectTile = payload
    },
    // 篩選開始 嘗試
    FILTERARRAY(state, payload) {
      if (state.nowSelectTile == "Trash") {
        var trash = state.temArray.filter(function (item, index, array) {
          return item.trash == true
        });
        state.memoList = [...trash]
      }

      if (state.nowSelectTile == "Shortcuts") {
        var Shortcuts = state.temArray.filter(function (item, index, array) {
          return item.star == true && item.trash == false
        });
        // console.log(Shortcuts)
        state.memoList = [...Shortcuts]
        // console.log("Shortcuts",state.memoList)
      }

      if (state.nowSelectTile == "All Notes") {
        var AllNotes = state.temArray.filter(function (item, index, array) {
          return item.trash == false
        });
        // console.log(1,state.temArray,2,AllNotes,3,state.memoList)
        state.memoList = [...AllNotes]

      }
    },
    // 刪除現有的陣列內容到刪除欄位去 payload是這個物件
    DELEDITOBJECT(state, payload) {
      // console.log(payload.trash)
      state.isEdit = false
      state.memoSingle = payload
    },
    // 標記星星
    BESTAR(state, payload) {
      state.memoSingle = payload
      // context.commit('NOWTITLE')
    },
    // 完全刪除
    DELCOMPLETELY(state, payload) {
      state.memoSingle = payload
      // state.memoList.splice( state.memoSingle,1)
      // console.log(state.memoList,state.memoSingle.id,state.memoSingle)
      state.temArray = state.temArray.filter(function (item, index, array) {
        return item.id != state.memoSingle.id
      });
      state.memoList = [...state.temArray]
      state.isEdit = false
      // for (let i = 0; i < state.temArray.length; i++) {
      //   const element = state.temArray[i];
      //   if (element.id==payload.id) {
      //     console.log("ewfwfwfw")
      //     state.temArray.splice(i,1)
      //   }

      // }
      // state.memoList=[...state.temArray]
      // console.log(state.memoList)
      // var AllNotes= state.temArray.filter(function(item, index, array){
      //   // return item.id ==! 
      //   return item.id !=  state.memoSingle.id
      // });
      // // console.log(1,state.temArray,2,AllNotes,3,state.memoList)
      // state.memoList=[...AllNotes]
      // console.log(state.memoList)
    },
    // 復原
    REPLAYTOLIST(state, payload) {
      state.memoSingle = payload
    },
    // 搜尋引擎
    FASTERSEARCH(state, payload) {
      state.searchID = payload
      // if (state.searchID=="") {
      //   state.memoList = [...state.temArray]
      // }else{
      //   let sele = state.temArray.filter(function (item) {
      //     console.log(item.title)
          
      //     return item.title.toLowerCase().includes(state.searchID.toLowerCase()) || item.category.toLowerCase().includes(state.searchID.toLowerCase()) || item.date.toLowerCase().includes(state.searchID.toLowerCase())
      //   })
      //   state.memoList = [...sele]
      // }
      
      let sele = state.temArray.filter(function (item) {
        console.log(item.title)
        
        return item.title.toLowerCase().includes(state.searchID.toLowerCase()) || item.category.toLowerCase().includes(state.searchID.toLowerCase()) || item.date.toLowerCase().includes(state.searchID.toLowerCase())
      })
      state.memoList = [...sele]

      if (state.nowSelectTile == "Trash") {
        var trash = state.temArray.filter(function (item, index, array) {
          return item.trash == true && (item.title.toLowerCase().includes(state.searchID.toLowerCase()) || item.category.toLowerCase().includes(state.searchID.toLowerCase()) || item.date.toLowerCase().includes(state.searchID.toLowerCase()))

        });
        state.memoList = [...trash]
      }

      if (state.nowSelectTile == "Shortcuts") {
        var Shortcuts = state.temArray.filter(function (item, index, array) {
          return item.star == true && item.trash == false && (item.title.toLowerCase().includes(state.searchID.toLowerCase()) || item.category.toLowerCase().includes(state.searchID.toLowerCase()) || item.date.toLowerCase().includes(state.searchID.toLowerCase()))
        });
        // console.log(Shortcuts)
        state.memoList = [...Shortcuts]
        // console.log("Shortcuts",state.memoList)
      }

      if (state.nowSelectTile == "All Notes") {
        var AllNotes = state.temArray.filter(function (item, index, array) {
          return item.trash == false && (item.title.toLowerCase().includes(state.searchID.toLowerCase()) || item.category.toLowerCase().includes(state.searchID.toLowerCase()) || item.date.toLowerCase().includes(state.searchID.toLowerCase()))
        });
        // console.log(1,state.temArray,2,AllNotes,3,state.memoList)
        state.memoList = [...AllNotes]

      }




    },
    DATEFILTER(state, payload){
      if (payload) {
        state.memoList.reverse()
      }else{
        state.memoList.reverse()
      }
    },
    // <RWD></RWD>
    RWDCHANGETOWRITING(state, payload){
      state.RWDchange=payload

    }
  },
  actions: {
    // 新增
    SendTHeMemo(context, EditObject) {
      const vm = this

      // vm.memoSingle=
      // console.log(EditObject)
      context.commit('SENDMEMO', EditObject)
      context.commit("FILTERARRAY")
    },
    // 選擇
    SelectParticularMemo(context, item) {
      context.commit('SELECTPARTICULARMEMO', item)
    },
    // 重置
    AddNewMemo(context) {
      context.commit("ADDNEWMEMO")
    },
    // 篩選
    nowTitle(context, selectTitle) {
      context.commit("NOWTITLE", selectTitle)
      context.commit("FILTERARRAY")
    },
    // 刪除現有內容
    delEditObject(context, EditSingleObject) {
      context.commit("DELEDITOBJECT", EditSingleObject)
      context.commit("FILTERARRAY")
    },
    // 星星
    BeStar(context, EditObject) {
      context.commit("BESTAR", EditObject);
      context.commit("FILTERARRAY")
      // context.commit("NOWTITLE")
    },
    // 完全刪除
    delCompletely(context, EditObject) {
      context.commit("DELCOMPLETELY", EditObject);
      context.commit("FILTERARRAY")
    },
    // 復原
    replayToList(context, EditObject) {
      context.commit("REPLAYTOLIST", EditObject);
      context.commit("FILTERARRAY")
    },
    // 搜尋引擎
    fasterSearch(context, selectID) {
      // context.commit("FILTERARRAY");
      context.commit("FASTERSEARCH", selectID);
      
    },
    // 日期排序
    DateFilter(context,sortByDate){
      context.commit("DATEFILTER", sortByDate);
    },
    // <RWD></RWD>
    RWDchangeToWriting(context,RWDchangeToWriting){
      context.commit("RWDCHANGETOWRITING", RWDchangeToWriting);
    },
    RWDchangeToWritingNEW(context,RWDchangeToWriting){
      context.commit("RWDCHANGETOWRITING", RWDchangeToWriting);
      context.commit("ADDNEWMEMO")
    },
  },
  modules: {},
  getters: {
    isEdit: state => state.isEdit
  },
})