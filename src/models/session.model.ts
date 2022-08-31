import mongoose from 'mongoose'
import { UserModelDocument } from './user.model'

export interface SessionModelDocument extends mongoose.Document {
  user: UserModelDocument['_id']
  valid: boolean
  userAgent: string
  createdAt: Date
  updatedAt: Date
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
)
sessionSchema.virtual('id').get(function () {
  return this._id.toHexString()
})
const SessionModel = mongoose.model<SessionModelDocument>(
  'Session',
  sessionSchema
)

export default SessionModel
