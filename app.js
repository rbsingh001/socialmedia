const bodyParser = require('body-parser');
const express = require('express');

const sequelize = require('./utils/database');

var cors = require('cors');

const Post = require('./model/post');
const Comment = require('./model/comment');
const app = express();

app.use(cors());
app.use(bodyParser.json())

Post.hasOne(Comment);
Comment.belongsTo(Post);


app.get('/', (req, res) => {
  Post.findAll()
    .then(posts => {
      res.send(posts);
    })
    .catch(err => {
      console.log(err);
    })

});

app.post('/post', async (req, res) => {
  const link = req.body.link;
  const des = req.body.des;

  console.log(link, des);
  const post = await Post.create({
    link: link,
    des: des
  })
  res.send(post);
});

app.get('/comments/:id', async(req, res)=>{
  const id = req.params.id;
  const comments = await Comment.findAll({
    where: {
      postId : id
    }
  })
  res.send(comments);
})

app.post('/post/:id',async (req, res) =>{
  const id = req.params.id;
  const c = req.body.des;
  console.log(id ,c);

  const comment = await Comment.create({
    des: c,
    postId: id
  })
  res.send(comment);

})


sequelize
  // .sync({force: true})
  .sync()

  .then((result) => {

    console.log("app started")
    app.listen(3000);
  })
  .catch(err => console.log(err));
