import { eventBus } from './../../../services/eventBus-service.js'

export default {
  props: ['note', 'isEdit'],
  template: `
            <span v-if="isEdit" class="edit-mode">
              <textarea v-model="currNote.info.title" type="text" class="clean-input title"> </textarea> <br>
              <div class="img-container">
                <img :src="currNote.info.url" alt="">
              </div>
            </span>
            <span v-else>
              <h4>{{currNote.info.title}}</h4>
              <img :src="currNote.info.url" alt="">
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
      // console.log('unmounted', this.currNote.info.title);
      eventBus.emit('updateNote', this.currNote)
    }
  },
  // emits: [""],
}
