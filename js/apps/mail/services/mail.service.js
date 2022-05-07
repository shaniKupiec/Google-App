import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const STORAGE_KEY = 'mailsDB';
_createMails();


export const mailService = {
  query,
  getUser,
  get,
  openEmail,
  moveToTrash,
  sentEmail,
  changeReadMode,
  changeStarMode
  // save,
  // getEmptyMail,
};

const loggedinUser = {
  email: 'chen@gmail.com',
  fullname: 'Chen Bezalel'
}

function query() {
  return storageService.query(STORAGE_KEY)
  .then(emails => emails.sort((a, b) => {
    return new Date(b.sentAt) - new Date(a.sentAt);
  }))
}

function get(mailId) {
  return storageService.get(STORAGE_KEY, mailId)
}

function getUser() {
  return loggedinUser;
}

function openEmail(mailId) {
  return get(mailId)
    .then((email) => {
      email.isRead = true;
      return storageService.put(STORAGE_KEY, email)
    })
}

function changeReadMode(mailId) {
  return get(mailId)
    .then((email) => {
      email.isRead = !email.isRead;
      return storageService.put(STORAGE_KEY, email)
    })
}

function changeStarMode(mailId){
  return get(mailId)
  .then((email) => {
    email.isStarred = !email.isStarred;
    return storageService.put(STORAGE_KEY, email)
  })
}

function moveToTrash(emailId) {
  return get(emailId)
    .then((email) => {
      if (email.status === 'trash'){
        return storageService.remove(STORAGE_KEY, emailId)
      } else {
      email.status = 'trash'
      return storageService.put(STORAGE_KEY, email)
      }
    })
}

function sentEmail(to, subject, body) {
  const newSentEmail = {
    id: utilService.makeId(),
    status: 'sent',
    subject,
    body,
    isRead: false,
    sentAt: Date.now(),
    from: { name: loggedinUser.fullname, email: loggedinUser.email },
    to: { name: to, email: to }
  }
  return storageService.post(STORAGE_KEY, newSentEmail);
}

function _createMails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Chen, you are getting noticed',
        body: 'visit us to see who is looking at your profile!',
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
        from: { name: 'LinKedIn', email: 'linkedin@gmail.com' },
        to: { name: 'Chen', email: 'chen@gmail.com' }
      },
      {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Your order is on the way!',
        body: 'Hi chen, your parcel is on its way and it should be with you soon!',
        isRead: false,
        isStarred: true,
        sentAt: Date.now()-(1000*60*60*24),
        from: { name: 'Asos', email: 'Asos@gmail.com' },
        to: { name: 'Chen', email: 'chen@gmail.com' }
      },
      {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Final sale!!!',
        body: 'Come and be updated on the new benefits for our club members, only for the next three days! you dont want to miss this..',
        isRead: true,
        isStarred: false,
        sentAt: Date.now()-(1000*60*60*24),
        from: { name: 'Dream Card', email: 'DreamCard.com' },
        to: { name: 'Chen', email: 'chen@gmail.com' }
      },
      {
        id: utilService.makeId(),
        status: 'sent',
        subject: 'Meeting',
        body: 'Hi chen, I want to know when you are free to meet, I missed you..',
        isRead: true,
        isStarred: false,
        sentAt: Date.now()-(1000*60*60*24*2),
        from: { name: 'Chen', email: 'chen@gmail.com' },
        to: { name: 'Amit', email: 'Amit@gmail.com' },
      },
      {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Chen, Manifest season 3 is now on Netflix',
        body: 'Thiss message was mailed to [chen@gmail.com] by Netflix as part of youre Netflixs membership.',
        isRead: false,
        isStarred: false,
        sentAt: Date.now()-(1000*60*60*24*4),
        from: { name: 'Netflix', email: 'Netflix@gmail.com' },
        to: { name: 'Chen', email: 'chen@gmail.com' }
      },
      {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Payment approve',
        body: 'You have sent payment to Apple Services, this confirmed and you will see this in the next charge',
        isRead: true,
        isStarred: false,
        sentAt: Date.now()-(1000*60*60*24*10),
        from: { name: 'Paypal', email: 'Paypal@gmail.com' },
        to: { name: 'Chen', email: 'chen@gmail.com' }
      },
      {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Chen, new discount',
        body: 'You have sent request to us, the request confirmed and you will see this in the next charge',
        isRead: false,
        isStarred: false,
        sentAt: Date.now()-(1000*60*60*24*20),
        from: { name: 'eBay', email: 'ebay@gmail.com' },
        to: { name: 'Chen', email: 'chen@gmail.com' }
      },
      {
        id: utilService.makeId(),
        status: 'trash',
        subject: 'Security alert',
        body: 'Someone is trying to enter your discount, please be carefull',
        isRead: false,
        isStarred: false,
        sentAt: Date.now()-(1000*60*60*24*10),
        from: { name: 'Google', email: 'google@gmail.com' },
        to: { name: 'Chen', email: 'chen@gmail.com' }
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);

  }
  return emails;
}
