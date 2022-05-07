import { notesService } from '../apps/notes/services/notes.service.js'
import { eventBus } from '../services/eventBus-service.js'
import noteFilter from '../apps/notes/cmps/note-filter.cmp.js'
import noteAdd from '../apps/notes/cmps/note-add.cmp.js'
import notesGrid from '../apps/notes/cmps/notes-grid.cmp.js'

export default {
  template: `
        <section class="note-app" :class="editOpen">
          <div class="main-screen-note" @click="closeScreen"></div>
          <note-filter @filtered="filter" />
          <note-add @saved-note="addNote" />
          <notes-grid v-if="notes" :notes="NotesToShow" />
        </section>
    `,
  components: {
    noteFilter,
    noteAdd,
    notesGrid,
  },
  created() {
    this.reload()
    this.unsubscribe = eventBus.on('duplicate', this.duplicate)
    this.unsubscribe = eventBus.on('remove', this.remove)
    this.unsubscribe = eventBus.on('setBgClr', this.setBgClr)
    this.unsubscribe = eventBus.on('togglePin', this.togglePin)
    this.unsubscribe = eventBus.on('updateNote', this.updateNote)
    this.unsubscribe = eventBus.on('reload', this.reload)
    this.unsubscribe = eventBus.on('openScreen', this.openScreen)
    this.unsubscribe = eventBus.on('closeScreen', this.closeScreen)
  },
  data() {
    return {
      notes: null,
      filterBy: null,
      selectedNote: null,
      isEditOpen: false,
    }
  },
  mounted() {},
  methods: {
    updateNote(newNote) {
      console.log(newNote);
      notesService.update(newNote)
        .then(() => {
          console.log('updates')
          this.reload()
        })
        // .then(() => this.reload())
        // .then(() => this.notes)
    },
    filter(filterBy) {
      this.filterBy = filterBy
    },
    reload(x = null) {
      console.log('reloading');
      notesService.query().then((notes) => {
        this.notes = notes
        console.log(notes);
        console.log(this.notes);
      })
    },
    addNote(newNote) {
      notesService
        .addNewNote(newNote)
        .then(() => this.reload())
        .then(() => eventBus.showSuccessMsg('Note added succesfully'))
        .catch((err) => {
          console.error(err)
          eventBus.showErrorMsg('Error - please try again later')
        })
    },
    duplicate(noteId) {
      notesService
        .get(noteId)
        .then((note) => notesService.addNew({ ...note }))
        .then(() => this.reload())
    },
    remove(noteId) {
      notesService
        .remove(noteId)
        .then(() => {
          this.reload()
          eventBus.showSuccessMsg('Note deleted succesfully')
          if(this.isEditOpen) this.closeScreen()
        })
        .catch((err) => {
          console.error(err)
          eventBus.showErrorMsg('Error - please try again later')
        })
    },
    setBgClr({ className, id }) {
      notesService
        .get(id)
        .then((currNote) => {
          console.log('changing2', className, id);
          currNote.style.bgc = className
          // this.updateNote(currNote)
          notesService.update({...currNote})
          if(this.isEditOpen) this.closeScreen()
        })
        .then(() => this.reload()) //problem1
    },
    togglePin(noteId) {
      notesService.get(noteId)
        .then((note) => {
          note.isPinned = !note.isPinned
          notesService.update({...note})
          if(this.isEditOpen) this.closeScreen()
        })
        .then(() => this.reload())
    },
    mailToNote(mail){
      notesService.mailToNote(mail)
      .then(() => this.reload())
    },
    openScreen(){
      this.isEditOpen = !this.isEditOpen
    },
    closeScreen(){
      this.isEditOpen = !this.isEditOpen
      eventBus.emit('closeEdit')
    }
  },
  computed: {
    NotesToShow() {
      console.log('hh');
      if (!this.filterBy) return this.notes
      const regex = new RegExp(this.filterBy.txt, 'i')
      if (this.filterBy.type === 'all') return this.notes.filter((note) => regex.test(note.value + note.title))
      return this.notes.filter((note) => regex.test(note.value + note.title) && note.type === this.filterBy.type)
    },
    mailVal() {
      return this.$route.params.mail
    },
    editOpen() {
      return this.isEditOpen ? 'edit-open' : ''
    },
  },
  unmounted() {
    this.unsubscribe()
  },
    watch : {
      mailVal : {
          handler(){
            if(this.$route.params.mail){
              // console.log(this.$route.params.mail);
              var mail = JSON.parse(this.$route.params.mail)
              console.log(mail);
              this.mailToNote(mail)
              // this.reload()
            }
          },
          immediate : true,
      },
      // notes : {
      //     handler(){
      //       this.reload()
      //     },
      // }
  }

  // emits: [""],
}
