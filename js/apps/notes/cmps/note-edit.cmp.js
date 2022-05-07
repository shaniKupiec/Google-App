import { eventBus } from '../../../services/eventBus-service.js'
import noteIconNav from './note-icon-nav.cmp.js'
import colorPalette from './color-palette.cmp.js'
import textCmp from './text.cmp.js'
import listCmp from './list.cmp.js'
import imgCmp from './img.cmp.js'
import videoCmp from './video.cmp.js'
import soundCmp from './sound.cmp.js'

export default {
  props: ['note'],
  template: `
        <section class="edit-modal round" :class="currNote.style.bgc" @click.stop>
          <component :is="this.currNote.type" :note="this.currNote" :isEdit="true"></component>
          <div class="flex space-between edit-bottom">
            <note-icon-nav @showClrP="toggleClrP" :note="this.currNote" @toggleEditMode="toggleEditMode"></note-icon-nav>
            <button @click="closeEdit" class="close-btn">Close</button>
          </div>
          <color-palette v-if="isPaletteOpen" @setBgClr="setBgClr"></color-palette>
        </section>
    `,
  components: {
    textCmp,
    listCmp,
    imgCmp,
    videoCmp,
    soundCmp,
    colorPalette,
    noteIconNav,
  },
  created() {},
  data() {
    return {
      currNote: this.note,
      isPaletteOpen: false,
    }
  },
  mounted() {},
  methods: {
    setBgClr(className){
      this.currNote.style.bgc = className
      this.isPaletteOpen = !this.isPaletteOpen
      // eventBus.emit('setBgClr', {className, id: this.currNote.id})
      // eventBus.emit('updateNote', note)
      console.log('changing1');
    },
    closeEdit() {
      // console.log('clicked on close btn');
      // this.$emit('closeEdit')
      // eventBus.emit('updateNote', this.currNote)
      eventBus.emit('closeScreen')
    },
    toggleClrP() {
      this.isPaletteOpen = !this.isPaletteOpen
    },
  },
  computed: {},
  unmounted() {},
}
