export default {
    props: ["email"],
    template: `
        <section class="email-preview flex">
                  <img class="icon starred" v-if="isStarred" @click.stop="changeStarMode" src="./imgs/mail/starred.png" alt="">
                  <img class="icon unstarred" v-else @click.stop="changeStarMode" src="./imgs/mail/unstarred.png" alt="">
                  <div class="from-subject">
                      <span class="from">{{fromToPreview}}</span>
                      <span class="subject">{{subject}}</span>
                  </div>
                  <span class="date">{{date}}</span>
                  <div class="icons-container">
                        <router-link @click.stop :to="'/note/' + sendAsNote">
                        <!-- <router-link @click.stop :to="'/note/msg/' + email.subject + '/from/' + email.from.name"> -->
                            <img class="icon" src="./imgs/mail/note.svg" alt="">
                        </router-link>
                      <img class="icon" @click.stop="moveToTrash" src="./imgs/mail/trash.png" alt="">
                      <img class="icon" v-if="isRead" @click.stop="changeReadMode" src="./imgs/mail/unread.png" alt="">
                      <img class="icon" @click.stop="changeReadMode" v-else src="./imgs/mail/read.png" alt="">
                  </div>
        </section>
    `,
    created() {     

    },
    computed: {
        date() {
            const time = new Date(this.email.sentAt);
            const date = `${time.toLocaleString('en', { month: 'short' } )} ${time.getDate()}`;
            return date;
        },

        subject(){
            if (this.email.subject.length > 25) return `${this.email.subject.substring(0,25)}...`
            else return this.email.subject
        },

        isRead(){
            return this.email.isRead ? true : false;
        },

        isStarred(){
            return this.email.isStarred ? true : false;
        },

        sendAsNote(){
            return JSON.stringify({...this.email})
        },

        fromToPreview(){
            if (this.email.status === 'sent') return this.email.to.email
            else return this.email.from.name
        }
    },
    methods: {
        changeReadMode() {
            this.$emit('changeReadMode', this.email, this.email.id)
            this.email.isRead = !this.email.isRead
        },
        moveToTrash() {
            this.email.status = 'trash'
            this.$emit('moveToTrash', this.email, this.email.id)
        },
        changeStarMode() {
            this.$emit('changeStarMode', this.email, this.email.id)
            this.email.isStarred = !this.email.isStarred
        }

    },

    // computed: {
    //     date() {
    //         const time = new Date(this.email.sentAt);
    //         const date = `${time.toLocaleString('en', { month: 'short' })} ${time.getDate()}`;
    //         return date;
    //     },

    //     subject() {
    //         if (this.email.subject.length > 25) return `${this.email.subject.substring(0, 25)}...`
    //         else return this.email.subject
    //     },

    //     isRead() {
    //         return this.email.isRead ? true : false;
    //     },

    //     fromToPreview(){
    //         if (this.email.status === 'sent') return this.email.to.email
    //         else return this.email.from.name
    //     }

    // },
}