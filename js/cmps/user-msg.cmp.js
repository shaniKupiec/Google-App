import { eventBus } from '../services/eventBus-service.js'

export default {
  template: `
        <section v-if="msg" class="user-msg round" :class="msg.type">
            <div :class="{ shake: disabled }">
              <img class="icon" src="./animations/icons8-notification.gif" alt="">
              <span>{{msg.txt}}</span>
            </div>
        </section>
    `,
  data() {
    return {
      msg: null,
      disabled: false
    }
  },
  created() {
    this.unsubscribe = eventBus.on('show-msg', this.showMsg);
  },
  methods: {
    showMsg(msg) {
      this.msg = msg
      this.disabled = true
      setTimeout(() => {
        this.msg = null
        this.disabled = true
      }, 3000)
    },
  },
  unmounted() {
    this.unsubscribe()
  },
}
