export default {
  props: ["todo", "idx"],
  template: `
            <span @click="toggleTodo"> 
                <img :src="VorX" alt="">
            </span>
            <!-- <input v-model="list[idx].txt" type="text" class="clean-input body"> -->
            <input v-model="currTodo.txt" type="text" class="clean-input body" :class="currTodo.doneAt ? 'todo-done' : null"> 
            <span @click="delete" title="delete">X</span>
            <!-- {{todo.txt}} -->
    `,
  components: {},
  created() {},
  data() {
    return {
        currTodo: this.todo,
        currIdx: this.idx,
    }
  },
  mounted() {},
  methods: {
    toggleTodo(){
        this.$emit(toggleTodo, currIdx)
    },
    delete(){
        this.$emit('delete', currIdx)
    }
  },
  computed: {
    VorX(){
        return currTodo.doneAt ? './imgs/note/v-box.png' : './imgs/note/x-box.png'
    }
  },
  unmounted() {},
  // emits: [""],
}