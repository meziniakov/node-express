const card = (post) => {
  return `
				<div class="card z-depth-4">
	        <div class="card-content">
	          <span class="card-title">${post.title}</span>
	          <p>${post.postText}</p>
	          <small>${post.date}</small>
	        </div>
	        <div class="card-action">
						<button id="deletePost" data-id=${post._id} class="js-remove btn btn-small red">
							<i class="material-icons">delete</i>
						</button>	
	        </div>
	      </div>
	`;
};

const BASE_URL = '/api/post';
let posts = [];
let modal;
class PostApi {
  static _fetch() {
    return fetch(BASE_URL, { method: 'get' }).then((res) => res.json());
  }
  static create(post) {
    return fetch(BASE_URL, {
      method: 'post',
      body: JSON.stringify(post),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
  static remove(id) {
    return fetch(`${BASE_URL}/${id}`, { method: 'delete' }).then((res) =>
      res.json()
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  PostApi.fetch().then((backendPosts) => {
    posts = backendPosts.concat();
    renderPosts(posts);
  });
  modal = M.Modal.init(document.querySelector('.modal'));
  document.querySelector('#createPost').addEventListener('click', onCreatePost);
  document.querySelector('#posts').addEventListener('click', onDeletePost);
});

function renderPosts(_posts = []) {
  const $posts = document.querySelector('#posts');
  if (_posts.length > 0) {
    $posts.innerHTML = _posts.map((post) => card(post)).join();
  } else {
    $posts.innerHTML = '<div class="center">Постов пока нет.</div>';
  }
}

function onCreatePost() {
  const $title = document.querySelector('#title');
  const $postText = document.querySelector('#postText');
  if ($title.value && $postText.value) {
    const newPost = {
      title: $title.value,
      postText: $postText.value,
    };
    PostApi.create(newPost).then((post) => {
      posts.push(post);
      renderPosts(posts);
    });
    modal.close();
    $title.value = '';
    $postText.value = '';
    M.updateTextFields();
  }
}

function onDeletePost() {
  if (event.target.classList.contains('js-remove')) {
    const decision = confirm('Вы уверены, что хотите удалить пост?');
    if (decision) {
      const id = event.target.getAttribute('data-id');

      PostApi.remove(id).then(() => {
        const postIndex = posts.findIndex((post) => post._id === id);
        posts.splice(postIndex, 1);
        renderPosts(posts);
      });
    }
  }
}
