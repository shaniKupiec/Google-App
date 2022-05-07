import { mailService } from '../apps/mail/services/mail.service.js';
import { eventBus } from '../services/eventBus-service.js';

// import emailList from '../apps/mail/cmps/email-list.cmp.js'
import emailFolderList from '../apps/mail/cmps/email-folder-list.cmp.js'
import emailFilter from '../apps/mail/cmps/email-filter.cmp.js'
import emailCompose from '../apps/mail/cmps/email-compose.cmp.js'

export default {
  template: `
        <section :class="menuOpen">
          <div class="main-screen" @click="toggleMenu"></div>
          <div class="flex filter-menu">
            <button class="btn-menu" @click="toggleMenu">☰</button>
            <email-filter v-if="emails" @filtered="setFilter"/>
          </div>
          <div class="flex main-content">
            <email-folder-list @StatusFiltered="setStatusFilter" @isCompose="isComposed" @StrredFiltered="setStarredFilter" :emails='emails'/>
            <router-view v-if='!isCompose' @onMoveToTrash="onMoveToTrash"></router-view>
            <email-compose v-else @sentEmail="onSentEmail" @closeEmail="isComposed" :noteInfo="mailVal"/>
          </div>
        </section>
    `,
  components: {

    emailFilter,
    emailFolderList,
    emailCompose
  },
  created() {

  },
  data() {
    return {
      emails: null,
      filterBy: null,
      status: 'inbox',
      isCompose: false,
      isChangeToggle: false,
      isMenuOpen: false,
      // isStarred: false,
      mailVal: null,
    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
      eventBus.emit('setEmails', this.emailsForDisplay)
    },

    setStatusFilter(status) {
      this.status = status;
      this.isCompose = false;
      this.isChangeToggle = !this.isChangeToggle;
      if (window.innerWidth < 740) this.isMenuOpen =! this.isMenuOpen
    },

    setStarredFilter() {
      mailService.query()
        .then(emails => this.emails = emails)
        .then((emails) => emails.filter((email) => email.isStarred))
        .then((emails) => eventBus.emit('setEmails', emails))
    },

    isComposed(bool) {
      this.isCompose = bool;
      this.mailVal =null
    },

    onSentEmail(newSentEmail) {
      this.isCompose = false
      mailService.sentEmail(newSentEmail.to, newSentEmail.subject, newSentEmail.body)
        .then(email => this.emails.push(email))
    },

    onMoveToTrash(email, emailId) {
      mailService.moveToTrash(emailId)
        .then(currEmail => email = currEmail)
        .then(() => this.isChangeToggle = !this.isChangeToggle)
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  },
  computed: {
    emailsForDisplay() {
      const isfilterRead = this.filterBy.isRead === 'read';
      const regex = new RegExp(this.filterBy.txt, 'i')

      if (this.filterBy.isRead === 'all') return this.emails.filter((email) => regex.test(email.from + email.subject))
      return this.emails.filter(email => regex.test(email.from + email.subject)
        && ((email.isRead && isfilterRead)
          || (!email.isRead && !isfilterRead)));
    },

    state() {
      return this.$route.params
    },

    menuOpen() {
      return this.isMenuOpen ? 'menu-open' : '';
    },

    noteVal() {
      return this.$route.params.noteMsg
    },
  },
  unmounted() { },
  watch: {
    noteVal: {
      handler() {
        if (this.$route.params.noteMsg) {
          console.log(this.$route.params.noteMsg);
          var x = JSON.parse(this.$route.params.noteMsg)
          this.isCompose = true
          this.mailVal = x
          // adding the mail
          // mailService.query()
          // .then(emails => this.emails = emails)
        }
      },
      immediate: true,
    },

    isChangeToggle: {
      handler() {
        mailService.query()
          .then(emails => this.emails = emails)
          .then((emails) => emails.filter((email) => email.status === this.status))
          .then((emails) => eventBus.emit('setEmails', emails))
      },
      immediate: true,
    },

    state: {
      handler() {
        mailService.query()
          .then(emails => this.emails = emails)
          .then((emails) => emails.filter((email) => email.status === this.status))
          .then((emails) => eventBus.emit('setEmails', emails))
      },
      immediate: true,
      deep: false
    },

    
    isCompose: {
      handler() {
        mailService.query()
        .then(emails => this.emails = emails)
        .then((emails) => emails.filter((email) => email.status === 'inbox'))
        .then((emails) => eventBus.emit('setEmails', emails))
      },
      immediate: true,
    },


    // status: {
    //   handler() {
    //     mailService.query()
    //       .then(emails => this.emails = emails)
    //       .then((emails) => emails.filter((email) => email.status === this.status))
    //       .then((emails) => eventBus.emit('setEmails', emails))
    //   },
    //   immediate: true,
    // },

    // isStarred: {
    //   handler() {
    //     mailService.query()
    //       .then(emails => this.emails = emails)
    //       .then((emails) => emails.filter((email) => email.status === this.status))
    //       .then((emails) => eventBus.emit('setEmails', emails))
    //   },
    //   immediate: true,
    // }
  }

}