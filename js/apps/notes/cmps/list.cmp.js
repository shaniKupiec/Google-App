import { eventBus } from '../../../services/eventBus-service.js'
import { notesService } from '../services/notes.service.js'
// import noteTodo from './note-todo.cmp.js'

export default {
  props: ["note", "isEdit"],
  template: `
            <span v-if="isEdit">
              <textarea v-model="title" type="text" class="clean-input title"> </textarea> <br>
              <ul>
                  <li v-for="(todo, idx) in list" :key="id+idx" class="clean-list flex">
                    <!-- <note-todo :todo="todo" :idx="idx" @toggleTodo="toggleTodo" @delete="delete"></note-todo> -->
                    <span @click="toggleTodo(idx)"> 
                      <img class="icon" src='./imgs/note/x-box.png' alt="">
                      <!-- <img :src="VorX" alt=""> -->
                    </span>
                    <!-- <input v-model="list[idx].txt" type="text" class="clean-input body"> -->
                    <input v-model="todo.txt" type="text" class="clean-input body" :class="todo.doneAt ? 'todo-done' : null"> 
                    <span @click="removeTodo(idx)" title="delete">X</span>
                    <!-- {{todo.txt}} -->
                  </li>
              </ul>
            </span>
            <span v-else>
            <h4>{{title}}</h4>
            <ul>
                <li v-for="(todo, idx) in list" :key="id+idx" :class="todo.doneAt ? 'todo-done' : null">
                    {{todo.txt}}
                </li>
            </ul>
            </span>
    `,
  components: {
    // noteTodo,
  },
  created(){},
  data() {
    return {
      title: this.note.info.title,
      list: this.note.info.todos,
      id: this.note.id,
    }
  },
  mounted() {},
  methods: {
      toggleTodo(idx){
        // if(!this.isEdit) return
        this.list[idx].doneAt = this.list[idx].doneAt ? null : Date.now()
        notesService.update(this.note)
        .then(() => eventBus.emit('reload'))
      },
      removeTodo(idx){
        this.note.info.todos.splice(idx, 1)
        notesService.update(this.note)
        .then(() => eventBus.emit('reload'))
      },
  },
  computed: {},
  unmounted() {},
  // emits: [""],
}