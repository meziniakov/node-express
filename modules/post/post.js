import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = low(adapter);
const posts = db.get('posts').value();
const authors = db.get('authors').value();

export function allPosts(req, res) {
  // console.log(authors.find((a) => a.id == 2));
  res.render('index.ejs', { posts: posts, authors: authors });
}

export async function addPost(req, res) {
  const text = req.body.text;
  const lastPost = posts[posts.length - 1];
  const nextId = lastPost.id + 1;
  db.get('posts').push({ id: nextId, authorId: 0, text: text }).write();
  res.redirect('/posts');
}

export function postById(req, res) {
  const post = posts.find((p) => p.id == req.params.id);
  res.send(post);
}
