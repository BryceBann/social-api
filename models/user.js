const {Schema, model} = require('/mongoose');
const thoughtsSchema = require('./thoughts');

const userSchema = new Schema(
{
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    last : {
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

  