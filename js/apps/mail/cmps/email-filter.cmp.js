export default {
  // props: [""],
  template: `
        <section class="email-filter">
            <div class="filter-nav round">
              <img class="icon" src="./imgs/mail/search.png" alt="">
              <input type="search" @input="setFilter" v-model="filterBy.txt" placeholder="Search emails">
              <label>
                <select v-model="filterBy.isRead" @change="setFilter">
                  <option value="all">All</option>
                  <option value="read">Read</option>
                  <option  value="unread">Unread</option>
                </select>
              </label>
            </div>
            <hr>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {
      filterBy: {
        isRead: 'all',
        txt: ''             
    }
    }
  },
  mounted() {},
  methods: {
    setFilter(){
      this.$emit('filtered', {...this.filterBy})
    }
  },
  computed: {},
  unmounted() {},
  // emits: [""],
}