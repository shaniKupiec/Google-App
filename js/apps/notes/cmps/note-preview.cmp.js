import { eventBus } from '../../../services/eventBus-service.js'
import colorPalette from './color-palette.cmp.js'
import noteEdit from './note-edit.cmp.js'
import noteIconNav from './note-icon-nav.cmp.js'
import textCmp from './text.cmp.js'
import listCmp from './list.cmp.js'
import imgCmp from './img.cmp.js'
import videoCmp from './video.cmp.js'
import soundCmp from './sound.cmp.js'


export default {
  props: ["note"],
  template: `
          <div class="note-container round box-shadow-hover flex column" :class="bgClr" @click="openEditMode">
          <component :is="note.type" :note="note" :isEdit="false"></component>

          <span class="icons-nav flex justify-center">
            <note-icon-nav @showClrP="showClrP" :note="note" @openEditMode="openEditMode"></note-icon-nav>
          </span>
          <color-palette v-if="isPaletteOpen" @setBgClr="setBgClr"></color-palette>
          <note-edit v-if="isEditOpen" :note="note" @closeEdit="closeEditMode"></note-edit>
          </div>
    `,
  components: {
    textCmp,
    listCmp,
    imgCmp,
    videoCmp,
    soundCmp,
    colorPalette,
    noteEdit,
    noteIconNav,
  },
  created() {
    this.unsubscribe = eventBus.on('closeEdit', this.closeEditMode)
  },
  data() {
    return {
      isPaletteOpen: false,
      bgClr: this.note.style.bgc,
      isPinned: this.note.isPinned,
      isEditOpen: false,
    }
  },
  mounted() {},
  methods: {
    showClrP(){
      this.isPaletteOpen = !this.isPaletteOpen
    },
    setBgClr(className){
      this.bgClr = className //problem1
      this.isPaletteOpen = !this.isPaletteOpen
      eventBus.emit('setBgClr', {className, id: this.note.id})
    },
    sendMail(){
      eventBus.showSuccessMsg('email transform to note succesfully added')
    },
    openEditMode(){
      console.log('open modal');
      this.isEditOpen = true
      eventBus.emit('openScreen')
    },
    closeEditMode(){
      console.log('close modal');
      this.isEditOpen = false
    },
  },
  computed: {},
  unmounted() {
    this.unsubscribe()
  },
  // emits: [""],
}