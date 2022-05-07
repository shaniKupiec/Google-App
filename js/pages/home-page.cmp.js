export default {
  // props: [""],
  template: `
        <section class="home-page">
          <div class="mail-container">
            <router-link to="/mail/inbox">
              <img class="mail-card" src="./imgs/home-page/email-bg.jpg" alt="">
            </router-link>
          </div>
          <div class="notes-card flex column space-between space-between">
            <h1> Save your thoughts, wherever you are </h1>
            <h3> Capture what's on your mind
              Add notes, lists, photos, and audio to Keep. </h3>
            <router-link to="/note">
              <img src="./imgs/home-page/sticky-note.png" alt="">
            </router-link>
          </div>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}