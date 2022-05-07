import { eventBus } from './../../../services/eventBus-service.js'

export default {
  props: ['note', 'isEdit'],
  template: `
            <span v-if="isEdit">
              <textarea v-model="currNote.info.title" type="text" class="clean-input title"> </textarea> <br>
              <textarea v-model="currNote.info.txt" rows="4" cols="50" class="clean-input body"> </textarea> <br>
            </span>
            <span v-else>
              <h4>{{currNote.info.title}}</h4>
              <p>{{currNote.info.txt}}</p>
            </span>
    `,
  components: {},
  created() {},
  data() {
    return {
      currNote: this.note,
    }
  },
  mounted() {},
  methods: {},
  computed: {},
  unmounted() {
    if(this.isEdit){
      console.log('unmounted', this.currNote.info.title);
      eventBus.emit('updateNote', this.currNote)
    }
  },
}
