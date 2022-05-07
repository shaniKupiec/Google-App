export default {
  // props: [""],
  template: `
        <section>
          <div class="add-note-container flex column space-between round box-shadow">
            <input v-show="!isFirstClick" type="text" v-model="newNote.title" class="round clean-input" placeholder="Title">
            <span @click="toggleFirstTime(false)" class="flex align-center round" :class="spanClass">
              <input type="text" ref="inputVal" id="new-note" v-model="newNote.value" :style="styleInput"
              @keyup.enter="saveNote" class="round clean-input" :placeholder="currPH">
              <div v-if="isFirstClick" class="icons-nav-first-click">
                <img class="icon grey-hover" src="./imgs/note/icon-a.png" title="new text note">
                <img class="icon grey-hover" src="./imgs/note/icon-image.png" title="new note with image">
                <img class="icon grey-hover" src="./imgs/note/icon-list.png" title="new list">
              </div>
            </span>
            <label v-show="!isFirstClick" for="new-note" class="icons-nav">
              <img class="icon grey-hover" @click="changePHIdx(0)" src="./imgs/note/icon-a.png" title="new text note">
              <img class="icon grey-hover" @click="changePHIdx(1)" src="./imgs/note/icon-image.png" title="new note with image">
              <img class="icon grey-hover" @click="changePHIdx(2)" src="./imgs/note/icon-video.png" title="new note with video">
              <img class="icon grey-hover" @click="changePHIdx(3)" src="./imgs/note/icon-sound.png" title="new note with sound">
              <img class="icon grey-hover" @click="changePHIdx(4)" src="./imgs/note/icon-list.png" title="new list">
            </label>
          </div>
        </section>
    `,
  components: {},
  created() {
    this.changePHIdx(0)
  },
  data() {
    return {
      newNote: {
        title: null,
        value: null,
        type: null,
      },
      placeHolders: [
        "What's on your mind...",
        'Enter Image URL...',
        'Enter Video URL...',
        'Enter Audio URL...',
        'Enter comma separated list...'
      ],
      noteTypes: [
        'textCmp',
        'imgCmp',
        'videoCmp',
        'soundCmp',
        'listCmp',
      ],
      idx: 0,
      isFirstClick: true,
    }
  },
  mounted() {
    this.$refs.inputVal.focus()
  },
  methods: {
    toggleFirstTime(isFirst){
      this.isFirstClick = isFirst
    },
    saveNote(){
      this.$emit('saved-note', {...this.newNote})
      this.newNote.title = null
      this.newNote.value = null
      this.changePHIdx(0)
      this.toggleFirstTime(true)
    },
    changePHIdx(newIdx){
      this.idx = newIdx
      this.newNote.type = this.noteTypes[newIdx]
    },
  },
  computed: {
    currPH(){
      return this.placeHolders[this.idx]
    },
    styleInput() {
      return {
        width: this.isFirstClick ? 'calc(100% - 140px)' : '100%'
      }
    },
    spanClass(){
      return this.isFirstClick ? 'first' : ''
    },
  },
  unmounted() {},
  // emits: [""],
}