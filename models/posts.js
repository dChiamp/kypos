var mongoose = require('mongoose')
    Schema = mongoose.Schema

var PostSchema = new Schema({
  postDate: { type: Date, default: Date.now },
  title: String,
  content: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  garden: [{ type: Schema.Types.ObjectId, ref: 'Garden' }],
  // canEdit: { type: Date, default: false },
  Pics: String
})

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;