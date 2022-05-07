export default {
  template: `
        <section class="search-container flex justify-center">
            <div class="search-nav round box-shadow">
                <img class="icon" src="./imgs/other/icon-search.svg" alt="">
                <input type="search" @input="setFilter" v-model="filterBy.txt" placeholder="Search Notes" class="clean-input">
                <select v-model="filterBy.type" @change="setFilter" class="round"> 
                  <option value="all">All</option>
                  <option value="textCmp">Text</option>
                  <option value="imgCmp">Image</option>
                  <option value="videoCmp">Video</option>
                  <option value="soundCmp">Sound</option>
                  <option value="listCmp">List</option>
                </select>
            </div>
        </section>
    `,
  data() {
    return {
      filterBy: {
        txt: '',
        type: 'all'
      },
    }
  },
  methods: {
    setFilter() {
      this.$emit('filtered', {...this.filterBy})
    },
  },
}
