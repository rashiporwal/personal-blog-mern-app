const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'A post must have a title.'],
        trim:true
    },

    slug:{
        type:String,
        unique:true,

    },

    markdownContent:{
        type:String,
        required:[true, 'A post must have content.']
    },

    categories:{
        type: [String],
        default: [],
    },

    author:{
        type:String,
        default: 'Admin'
    },

},{
    timestamps:true,
}

);

postSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  
});



const Post = mongoose.model('Post',postSchema);
module.exports = Post;