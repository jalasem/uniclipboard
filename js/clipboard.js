// Initialize Firebase
var config = {
  apiKey: "AIzaSyDKM26ZT86nByRvc0Wo_HC_c9cqoySf9G8",
  authDomain: "uniclipboard-b99c9.firebaseapp.com",
  databaseURL: "https://uniclipboard-b99c9.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "287938920478"
};
firebase.initializeApp(config);

var database = firebase.database();
var dbref = database.ref('clipboard');
var fromCopy = dbref.child('fromCopy');
var toPaste = dbref.child('toPaste');

// tinyMCE.get('cparea').setContent(data);
// tinyMCE.get('cparea').getContent();
fromCopy.on('value', function (snap) {
  if (snap.val() !== tinyMCE.get('cparea').getContent()) {
    tinyMCE.get('cparea').setContent(snap.val());
  }
});

window.onload = function () {
  tinymce.init({
    selector: 'textarea#cparea',  // change this value according to your HTML
    menubar: false,
    setup: function (editor) {
      editor.on('keyup', function (e) {
        // console.log('change event', e);
        var jkl = e.currentTarget.innerHTML;
        fromCopy.set(jkl);
        // console.log('Editor contents was modified. Contents: ' + editor.getContent());
        // editor.on('change', function (e) {
        //   console.log('change event', e);
        //   console.log('Editor contents was modified. Contents: ' + editor.getContent());
        // });
        // check_submit(); //another function calling
      });
    }
    // setup:function(ed) {
    //     ed.on('change', function(e) {
    //         console.log('the event object ', e);
    //         console.log('the editor object ', ed);
    //         console.log('the content ', ed.getContent());
    //     });
    // },
    // plugins: [
    // 'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
    // 'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
    // 'save table contextmenu directionality emoticons template paste textcolor'
    // ],
    // content_css: 'css/content.css',
    // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons'
  });
};
// window.load = function(){

// }