import { eventBus } from '../../../services/eventBus-service.js'

export default {
  props: ['note'],
  template: `
    <img class="icon grey-hover" @click.stop="togglePin" :src="getPinIcon" :title="getPinTitle">

    <router-link @click.stop :to="'/mail/inbox/' + sendAsMail">
      <img class="icon grey-hover" src="./imgs/note/export.svg" title="Send note as mail">
    </router-link>

    <img class="icon grey-hover" @click.stop="showClrP" src="./imgs/note/color.svg" title="Change note color">
    <img class="icon grey-hover" @click.stop="openEditMode" src="./imgs/note/edit.svg" title="Edit note">
    <img class="icon grey-hover" @click.stop="duplicate" src="./imgs/note/duplicate.svg" title="Duplicate note">
    <img class="icon grey-hover" @click.stop="remove" src="./imgs/note/delete.svg" title="Delete note">
    `,
  components: {},
  created() {},
  data() {
    return {
      isPinned: this.note.isPinned,
    }
  },
  mounted() {},
  methods: {
    duplicate(){
      eventBus.emit('duplicate', this.note.id)
    },
    remove(){
      eventBus.emit('remove', this.note.id)
    },
    showClrP(){
      this.$emit('showClrP')
    },
    togglePin(){
      eventBus.emit('togglePin', this.note.id)
    },
    openEditMode(){
      this.$emit('openEditMode')
    },
  },
  computed: {
    getPinIcon() {
      return this.isPinned ? './imgs/note/pinnedOn.svg' : './imgs/note/pinned.svg'
    },

    getPinTitle() {
      return this.isPinned ? 'Unpin note' : 'Pin note'
    },
    
    sendAsMail(){
      return JSON.stringify({...this.note})
    },
  },
  unmounted() {},
  // emits: [""],
}
