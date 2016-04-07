var Post = require('../models/posts')

var postsController = {
  postIndex: function (req, res) {
    var gardenId = req.params.gardenId;
    Post.find({})
      .populate("author")
      .exec(function (err, allPosts) {
        var gardensPosts = []
        console.log("allposts garden Ids: ", allPosts[0].garden)
        for (var i = 0; i < allPosts.length; i++ ) {
          var postObj = allPosts[i]
          var postGardenId = postObj.garden;
            console.log("GARDEN ID:", gardenId)
            console.log("post GARDEN ID:", postGardenId);
          if (gardenId == postGardenId){
            console.log("they match!")
            gardensPosts.push(postObj)
            // res.json(postObj);
          }
        }

        err ? console.log(err) : res.send(gardensPosts);
        // err ? console.log(err) : res.json(allPosts);
      })
  },
  newPost: function (req, res) {
    console.log("post req.body:", req.body)
    // posts should also be linked to user
    var author = req.params.userId;
    var gardenId  = req.params.gardenId;

    var title = req.body.title
    var content = req.body.content;

    Post.create({title: title, content: content,  garden: gardenId, author: author}, 
    function(err, newPost) { 
      console.log(newPost)
      err ? console.log(err) : res.json(newPost);
    })
  },
  deletePost: function (req, res) {
    console.log("hitting delete route")
    var postId  = req.params.postId;
    var userId = req.params.userId;
    console.log("User ID:", userId)
    // find post.author._id
    Post.findById({_id: postId}, function(err, data) {
      console.log("POST AUTHOR: ", data.author[0]);
      var postAuthor = data.author[0]
      // matches user id?
      if(userId == postAuthor) {
        console.log("after IF")
        // if yes delete post
        Post.remove({_id: postId}, function(err, data) {
          err ? console.log(err) : res.json(data);
          console.log("post deleted")
        })
      }
    })
  }
}

module.exports =  postsController