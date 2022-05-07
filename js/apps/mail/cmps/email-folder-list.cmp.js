export default {
  props: ["emails"],
  template: `
        <section v-if="emails" :class="menuOpen">
          <!-- <button class="btn-menu" @click="toggleMenu">☰</button> -->
          <div class="email-folder-list">
          <button class="btn" @click="compose">               
          <div class="btn-container"><img  src="./imgs/mail/compose.png"/></div>
          <span>Compose</span>
          </button>
          <ul class="clean-list">
            <li @click="setStatus('inbox')">
              <img class="icon" src="./imgs/mail/inbox.png" alt="">
              <span> Inbox</span>
              <span class="unread-count">{{unread}}</span>
            </li>
            <li @click="setStarredFilter">
              <img class="icon" src="./imgs/mail/star-side.png" alt="">
              <span> Starred</span>
            </li>
            <li @click="setStatus('sent')">
              <img class="icon" src="./imgs/mail/sent.png" alt="">
              <span> Sent</span>
            </li>
            <li @click="setStatus('draft')">
              <img class="icon" src="./imgs/mail/draft.png" alt="">
              <span> Draft</span>
            </li>
            <li @click="setStatus('trash')">
              <img class="icon" src="./imgs/mail/trash.png" alt="">
              <span> Trash</span>
            </li>
          </ul>
          </div>
        </section>
    `,
  components: {},
  created() {

  },
  data() {
    return {
      status: 'inbox',
      isMenuOpen: false,

    }
  },
  methods: {
    // showInbox() {
    //   this.setStatus('inbox');
    // },
    setStatus(status) {
      this.$router.push({ path: '/mail/inbox' })
      this.status = status;
      this.$emit('StatusFiltered', this.status)
    },
    
    setStarredFilter(){
      // this.$router.push({ path: '/mail/inbox' })
      this.$emit('StrredFiltered')
    },

    compose() {
      this.$emit('isCompose', true)
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },

  },
  computed: {
    
    unread() {
      const unreads = this.emails.filter(email => !email.isRead && email.status === 'inbox')
      if (!unreads.length) return ''
      else return unreads.length
    },

    menuOpen() {
      return this.isMenuOpen ? 'menu-open' : '';
    },

  },

    // emits: [""],
  
}