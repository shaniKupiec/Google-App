import { eventBus } from '../../../services/eventBus-service.js'
import { mailService } from '../services/mail.service.js';
import emailPreview from './email-preview.cmp.js'

export default {
  // props: ["emails"],
  template: `
        <section v-if="emails" class="email-list" >
          <button class="sort-date" @click=sortByDate>Date {{sortDateArrow}}</button>
          <button class="sort-title" @click=sortByTitle>Title {{sortTitleArrow}}</button>
          <ul class="clean-list">
            <li v-for="email in emails" :key="email.id" :class="email.isRead ? 'read' : 'unread'" @click="onOpenEmail(email, email.id)">
                  <email-preview :email='email' @changeReadMode="onChangeReadMode" @moveToTrash="onMoveToTrash" @changeStarMode="onChangeStarMode"/>
            </li>
          </ul>
        </section>
    `,
  components: {
    emailPreview
  },
  created() {
    // this.unsubscribe = eventBus.on('setEmails', this.setEmails);
  },
  data() {
    return {
      emails: null,
      isDateSorted: false,
      isTitleSorted: false,
    }
  },
  mounted() { },
  methods: {
    setEmails(emails) {
      this.emails = emails
    },

    onOpenEmail(currEmail, id) {
      this.$router.push(`/mail/details/${id}`)
      mailService.openEmail(id)
        .then((email) => currEmail = email)

    },

    onChangeReadMode(email, emailId) {
      mailService.changeReadMode(emailId)
        .then(newEmail => email = newEmail)
    },

    onChangeStarMode(email, emailId){
      mailService.changeStarMode(emailId)
        .then(newEmail => email = newEmail)
    },

    onMoveToTrash(email, emailId) {
      this.$emit('onMoveToTrash', email, emailId)
    },

    sortByDate() {
      this.isDateSorted = !this.isDateSorted
      this.emails.sort((a, b) => {
        if (this.isDateSorted) return new Date(a.sentAt) - new Date(b.sentAt);
        else return new Date(b.sentAt) - new Date(a.sentAt);
      });
    },

    sortByTitle() {
      this.isTitleSorted = !this.isTitleSorted
      this.emails.sort((a, b) => {
        var nameA = a.from.name.toUpperCase();
        var nameB = b.from.name.toUpperCase();
        if (this.isTitleSorted){
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        }
        else {
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        }
        return 0;
      });

    }


  },
  computed: {
    inbox() {
      return this.$route.params.inbox
    },

    sortDateArrow(){
      return this.isDateSorted? '↑' : '↓'
    },

    sortTitleArrow(){
      return this.isTitleSorted? '↑' : '↓'
    }
  },
  unmounted() {
    this.unsubscribe();
  },
  watch: {
    inbox: {
      handler() {
        this.unsubscribe = eventBus.on('setEmails', this.setEmails);
      },
      immediate: true,
    },
  }

  // emits: [""],
}