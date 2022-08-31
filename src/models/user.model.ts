import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserModelInput {
  email: string
  name: string
  password: string
}

export interface UserModelDocument extends UserModelInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
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
userSchema.virtual('id').get(function () {
  return this._id.toHexString()
})
userSchema.pre('save', async function (next) {
  const user = this as UserModelDocument
  // if password is not being changed
  if (!user.isModified('password')) {
    return next()
  }
  // if password is being saved, hash the password
  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))

  const hashedPassword = bcrypt.hashSync(user.password, salt)

  user.password = hashedPassword

  return next()
})
userSchema.methods.comparePassword = async function (
  candidatePassword: string
){
  const user = this as UserModelDocument

  return bcrypt.compare(candidatePassword, user.password).catch(() => false)
}
const UserModel = mongoose.model<UserModelDocument>('User', userSchema)

export default UserModel
