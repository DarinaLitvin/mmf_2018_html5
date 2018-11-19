let elem = {
  template: `<li class='file'>
  <div class='name'>{{name}}</div>
  <div class='info'>i</div>
  <div class='edit'>e</div>
  <div class='copy'>c</div>
  <div class='remove'>r</div>
  </li>`,
  props : ['name']
};

let andrey = new Vue({
  el: '#app',
  data: {
    list: [],
    text: '',
    current: ''
  },
  components: {
    elem
  },
  methods: {
    edit(e) {
      if (e.target.classList.contains('edit')) {
        let data = this;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/andrey/${e.target.parentNode.children[0].innerText}`);
        xhr.addEventListener('load', () => {
          data.text = xhr.responseText;
          data.current = e.target.parentNode.children[0].innerText
        });
        xhr.send()
      }
    },
    save() {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `/andrey/${this.current}`);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.addEventListener('load', () => {
        if(xhr.responseText == 'ok') {
          alert('Сохранено')
        } else {
          alert('Ошибка')
        }
      });
      let req = {text: this.text}
      xhr.send(JSON.stringify(req))
    }
  },
    created() {
      let data = this;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', '/andrey');
      xhr.addEventListener('load', () => {
        data.list = JSON.parse(xhr.responseText)
      });
      xhr.send()
    }
})
