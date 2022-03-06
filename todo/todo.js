let list = [{}];
list = JSON.parse(localStorage.getItem('todoList'));
console.log(list);

const elementList = document.getElementById('list');
const textInput = document.getElementById('inputText');

function render() {
  document.getElementById('list').innerHTML = null;
  for (let i = 0; i < list.length; i++) {
    let listItem = document.createElement('li');
    let listItemText = document.createTextNode(list[i].title);
    listItem.classList.add(list[i].done ? 'done' : 'progress');
    listItem.appendChild(listItemText);

    let buttonDone = document.createElement('button');
    buttonDone.setAttribute('id', Number(list[i].id));
    let buttonDoneText = document.createTextNode('Done');
    buttonDone.appendChild(buttonDoneText);

    let buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('id', Number(list[i].id));
    let buttonDeleteText = document.createTextNode('Delete');
    buttonDelete.appendChild(buttonDeleteText);
    listItem.appendChild(buttonDone);
    listItem.appendChild(buttonDelete);
    elementList.appendChild(listItem);
  }
}

elementList.addEventListener('click', (event) => {
  console.log(event);
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == event.target.id && event.target.innerHTML == 'Done') {
      console.log(event.target.id);
      list[i].done = !list[i].done;
    }
    if (list[i].id == event.target.id && event.target.innerHTML == 'Delete') {
      console.log('Delete');
      list.splice(i);
    }
  }
  localStorage.setItem('todoList', JSON.stringify(list));
  render();
});

function addItemInTodoList() {
  let textInputValue = textInput.value;
  if (textInputValue) {
    list.push({
      id: Math.random(),
      title: textInputValue,
      done: false,
    });
    localStorage.setItem('todoList', JSON.stringify(list));
    textInput.value = '';
    render();
  } else {
    alert('Input text');
  }
}

render();
