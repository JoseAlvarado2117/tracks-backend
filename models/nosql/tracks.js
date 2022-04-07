const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const tracksSchema = new Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      }
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      }
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    }
  },
  {
    timestamps: true,  // TODO: createAt, updateAt
    versionKey: false
  }
);

module.exports = model('Tracks', tracksSchema);