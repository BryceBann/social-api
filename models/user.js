const {Schema, model} = require('mongoose');

const userSchema = new Schema(
{
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email : {
        type: String,
        require: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "please fill a vaild email address",
        ],
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  const User = model('User', userSchema);
  module.exports = User;