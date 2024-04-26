const { Schema, model } = require('mongoose');

const refreshTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const RefreshToken = model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;