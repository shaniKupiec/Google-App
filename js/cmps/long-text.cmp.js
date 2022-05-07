export default {
  props: ['text', 'length'],
  template: `
        <section>
            <p>{{textForDisplay()}}
              <span v-if="isTextLong" class="long-text-link" @click="toggleTextLength">{{textLink}}</span>
            </p>
        </section>
    `,
  components: {},
  created() {
    this.isOpen = false
  },
  data() {
    return {
      isTextLong: this.text.length > this.length,
      isOpen: false,
    }
  },
  methods: {
    textForDisplay() {
      if (!this.isTextLong || this.isOpen) return this.text
      return this.text.slice(0, this.length)
    },

    toggleTextLength() {
      this.isOpen = !this.isOpen
    },
  },
  computed: {
    textLink() {
      if (this.isOpen) return 'see less'
      return '... see more'
    },
  },
  unmounted() {},
}
