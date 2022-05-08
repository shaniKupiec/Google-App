export default {
  template: `
        <header>
            <div class="app-head flex space-between align-center main-layout">
                <router-link class="logo" to="/">
                    <img src="./imgs/other/logo2.png" alt="">
                </router-link>
                <span class="nav-bar">
                    <img class="menu-icon" @click="toggleMenu" src="./imgs/other/menu.png" alt="">
                    <div class="routers-container" :class="open" @click="toggleMenu">
                        <router-link to="/" title="home">
                            <img src="./imgs/header/home.png" alt=""> 
                        </router-link> 
                        <img class="disable" src="./imgs/header/books.png" alt="">
                        <router-link to="/mail/inbox" title="mails">
                            <img src="./imgs/header/mail.png" alt="">
                        </router-link>
                        <router-link to="/note" title="notes">
                            <img src="./imgs/header/notes.png" alt="">
                        </router-link> 
                        <img class="disable" src="./imgs/header/contact.png" alt="">
                        <img class="disable" src="./imgs/header/youtube.png" alt="">
                    </div>
                </span>
            </div>
        </header>
    `,
  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
  },
  computed: {
    open() {
      console.log(this.isOpen)
      return this.isOpen ? 'open' : ''
    },
  },
}
