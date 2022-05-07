import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'

const NOTES_KEY = 'notes'
_createNotes()

export const notesService = {
  query,
  get,
  addNew,
  remove,
  addNewNote,
  get,
  update,
  mailToNote,
}

function query() {
  return storageService.query(NOTES_KEY)
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function addNew(note) {
  note.isPinned = false
  return storageService.post(NOTES_KEY, note)
}

function mailToNote(mail){
  // var time = +mail.sentAt
  var value = `${mail.body}
  from ${mail.from.name} to ${mail.to.name} sent at ${new Date(mail.sentAt)}`
  var note = {
    title: mail.subject,
    value,
    type: 'textCmp',
  };
  return addNewNote(note)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function addNewNote(note, isHardCoded = false) {
  if (note.type === 'textCmp') {
    note.info = { title: note.title, txt: note.value }
  } else if (note.type === 'listCmp') {
    var arrayTodo = note.value.split(',')
    for (var i = 0; i < arrayTodo.length; i++) {
      arrayTodo[i] = { txt: arrayTodo[i] }
    }
    note.info = { title: note.title, todos: arrayTodo }
  } else if (note.type === 'imgCmp' || note.type === 'soundCmp') {
    note.info = { title: note.title, url: note.value }
  } else if (note.type === 'videoCmp') {
    var videoId = _youtube_parser(note.value)
    var newUrl = `//www.youtube.com/embed/${videoId}`
    note.info = { title: note.title, url: newUrl }
  }
  note.style = { bgc: 'bgc12'}
  if (isHardCoded) {
    note.style.bgc = 'bgc' + utilService.getRandomInt(1, 12)
    return note
  }
  return addNew(note)
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = [
      addNewNote(
        {
          id: 'n120',
          title: 'my TODO list',
          value: 'dishes, clean my room, cook food, taking out the trash',
          type: 'listCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '858286',
          title: 'book a flight Maldives',
          value: 'https://i.insider.com/5698198de6183e50008b98a1?width=1000&format=jpeg&auto=webp',
          type: 'imgCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '15612',
          title: 'BEST SOUND EVER',
          value: 'http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3',
          type: 'soundCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '15612',
          title: 'SECOND BEST SOUND',
          value: 'http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3',
          type: 'soundCmp',
          isPinned: true,
        },
        true
      ),
      addNewNote(
        {
          id: '1566856',
          title: 'learn vue',
          value: 'https://www.youtube.com/watch?v=qZXt1Aom3Cs',
          type: 'videoCmp',
          isPinned: true,
        },
        true
      ),
      addNewNote(
        {
          id: 'n121',
          title: 'Note for tonight',
          value: 'call mom before 10 oclock',
          type: 'textCmp',
          isPinned: true,
        },
        true
      ),
      addNewNote(
        {
          id: 'n122',
          title: 'fill my servey',
          value: 'https://www.google.com/forms/about/',
          type: 'textCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '86456',
          title: 'Game of Thrones season 5 chapter 2',
          value: 'https://www.netflix.com/browse',
          type: 'textCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '48652',
          title: 'my image',
          value: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
          type: 'imgCmp',
          isPinned: true,
        },
        true
      ),
      addNewNote(
        {
          id: '255235',
          title: '',
          value: 'https://www.youtube.com/watch?v=cEItmb_a20M',
          type: 'videoCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '452269',
          title: '',
          value: 'https://www.youtube.com/watch?v=Rj_vssRaZlQ',
          type: 'videoCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '255235',
          title: '',
          value: 'https://www.youtube.com/watch?v=cEItmb_a20M',
          type: 'videoCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '255235',
          title: '',
          value: 'https://www.youtube.com/watch?v=cEItmb_a20M',
          type: 'videoCmp',
        },
        true
      ),
      addNewNote(
        {
          id: '452269',
          title: '',
          value: 'https://www.youtube.com/watch?v=Rj_vssRaZlQ',
          type: 'videoCmp',
        },
        true
      ),
    ]
    // notes = [
    //   {
    //     id: '1561',
    //     type: 'listCmp',
    //     info: {
    //       // title: 'Get my stuff together',
    //       todos: [
    //         { txt: 'Driving liscence'},
    //         { txt: 'Coding power' },
    //       ],
    //     },
    //   },
    //     {
    //       id: '5253',
    //       type: 'listCmp',
    //       info: {
    //         // title: 'Get my stuff together',
    //         todos: [
    //           { txt: 'Driving liscence', doneAt: null },
    //           { txt: 'Coding power', doneAt: 187111111 },
    //         ],
    //       },
    //     },
    //     {
    //       id: 'n101',
    //       type: 'textCmp',
    //       info: {
    //         txt: 'Fullstack Me Baby!sdfgh',
    //         title: 'lol'
    //       },
    //     },
    //     {
    //       id: 'n102',
    //       type: 'textCmp',
    //       info: {
    //         txt: 'Fullstack Me Baby!',
    //       },
    //     },
    //   // {
    //   //   id: 'n101',
    //   //   type: 'note-txt',
    //   //   isPinned: true,
    //   //   info: {
    //   //     txt: 'Fullstack Me Baby!',
    //   //   },
    //   // },
    //   // {
    //   //   id: 'n102',
    //   //   type: 'note-img',
    //   //   info: {
    //   //     url: 'http://some-img/me',
    //   //     title: 'Bobi and Me',
    //   //   },
    //   //   style: {
    //   //     backgroundColor: '#00d',
    //   //   },
    //   // },
    //   // {
    //   //   id: 'n103',
    //   //   type: 'note-todos',
    //   //   info: {
    //   //     label: 'Get my stuff together',
    //   //     todos: [
    //   //       { txt: 'Driving liscence', doneAt: null },
    //   //       { txt: 'Coding power', doneAt: 187111111 },
    //   //     ],
    //   //   },
    //   // },
    // ]
  }
  utilService.saveToStorage(NOTES_KEY, notes)
}

function update(newNote) {
  return storageService.put(NOTES_KEY, newNote)
}

function _youtube_parser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}
