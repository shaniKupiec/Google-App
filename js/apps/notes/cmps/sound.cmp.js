import { eventBus } from './../../../services/eventBus-service.js'

export default {
  props: ['note', 'isEdit'],
  template: `

            <span v-if="isEdit">
              <textarea v-model="currNote.info.title" type="text" class="clean-input title"> </textarea> <br>
              <label class="flex">
                <img class="icon" src="./imgs/note/icon-sound.png" @click.prevent="playSound()">
                Play sound
              </label>
            </span>
            <span v-else>
              <h4>{{currNote.info.title}}</h4>
              <label class="flex">
                <img class="icon" src="./imgs/note/icon-sound.png" @click.prevent="playSound()">
                Play sound
              </label>
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
  methods: {
    playSound() {
      console.log(this.currNote.info.url);
      var audio = new Audio(this.currNote.info.url)
      audio.play()
    },
  },
  computed: {},
  unmounted() {
    if(this.isEdit){
      // console.log('unmounted', this.currNote.info.title);
      eventBus.emit('updateNote', this.currNote)
    }
  },
  // emits: [""],
}
