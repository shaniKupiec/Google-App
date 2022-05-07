import notePreview from './note-preview.cmp.js'

export default {
  props: ['notes'],
  template: `
        <span v-if="notesPin.length" class="grid-division-msg">pinned</span>
        <section class="notes-area">
          <note-preview v-for="note in notesPin" :key="note.id" :note="note"></note-preview>
        </section>
        <span v-if="notesPin.length" class="grid-division-msg">others</span>
        <section class="notes-area">
          <note-preview v-for="note in notesNotPin" :key="note.id" :note="note"></note-preview>
        </section>
    `,
  components: {
    notePreview,
  },
  created() {},
  data() {
    return {}
  },
  mounted() {},
  methods: {
    togglePin(noteId) {
      this.$emit('togglePin', noteId)
    },
  },
  computed: {
    notesPin() {
      return this.notes.filter((note) => note.isPinned)
    },
    notesNotPin() {
      return this.notes.filter((note) => !note.isPinned)
    },
  },
  unmounted() {},
  // emits: [""],
}
