export async function home(req, res) {
  res.sendFile(__dirname + '/client/index.html');
  // res.send(posts[0].find({ id: 0 }))
}
