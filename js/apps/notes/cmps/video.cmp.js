import { eventBus } from './../../../services/eventBus-service.js'

export default {
  props: ['note', 'isEdit'],
  template: `
          <span v-if="isEdit" class="edit-mode">
          <textarea v-model="currNote.info.title" type="text" class="clean-input title"> </textarea> <br>
          <div class="img-container">
          <iframe
            title="Inline Frame Example"
            width="100%"
            height="100%"
            :src="currNote.info.url"
            frameborder="0"
            allowfullscreen
          >
        </iframe>
          </div>
        </span>
        <span v-else>
          <h4>{{currNote.info.title}}</h4>
          <iframe
            title="Inline Frame Example"
            width="100%"
            height="100%"
            :src="currNote.info.url"
            frameborder="0"
            allowfullscreen
          >
        </iframe>
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
  unmounted() {},
  unmounted() {
    if(this.isEdit){
      // console.log('unmounted', this.currNote.info.title);
      eventBus.emit('updateNote', this.currNote)
    }
  },
}
