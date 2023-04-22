import mongoose from 'mongoose'

import { SessionDetails } from './dto/userInputs'

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: String,
  },
  {
    timestamps: true,
  },
)

const SessionModel = mongoose.model<SessionDetails>('Session', sessionSchema)

export default SessionModel
