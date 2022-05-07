export default {
  // props: [""],
  template: `
        <section class="modal-colors round">
            <span class="color-palette-container">
                <span v-for="idx in colors" :class="'bgc' + idx" class="color-palette" @click.stop="setBgClr(idx)"></span>
            </span>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {
        colors:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  },
  mounted() {},
  methods: {
    setBgClr(idx){
      console.log('changing');
      this.$emit('setBgClr', 'bgc' + idx)
    }
  },
  computed: {},
  unmounted() {},
  // emits: [""],
}