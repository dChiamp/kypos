var Post = require('../models/posts')

var postsController = {
  postIndex: function (req, res) {
    Post.find({}, function (err, allPosts){
      err ? console.log(err) : res.json(allPosts);
    })
  },
  newPost: function (req, res) {
    console.log("post req.body:", req.body)
    // posts should be linked to user
    // var author = req.params.userId;
    var gardenId  = req.params.gardenId
    var title = req.body.title
    var content = req.body.content;

    Post.create({title: title, content: content,  garden: gardenId /*author: author,*/}, 
    function(err, newPost) { 
      console.log(newPost)
      err ? console.log(err) : res.json(newPost);
    })
  },
  deletePost: function (req, res) {
    var postId  = req.params.id;
    Post.remove({_id: postId}, function(err, data){
      err ? console.log(err) : res.json(data);
    })
  }
}

module.exports =  postsController