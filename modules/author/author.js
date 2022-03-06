import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = low(adapter);
const authors = db.get('authors').value();

export function allAuthors(req, res) {
  res.send(authors);
}
export async function addAuthor(req, res) {
  const name = req.body.name;
  const lastAuthor = authors[authors.length - 1];
  const nextId = lastAuthor.id + 1;
  db.get('authors').push({ id: nextId, name: name }).write();
  res.redirect('/authors');
}
export function authorById(req, res) {
  const author = authors.find((a) => a.id == req.params.id);
  res.send(author.name);
}
