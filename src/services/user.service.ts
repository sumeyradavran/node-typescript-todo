import { omit } from 'lodash'
import { FilterQuery } from 'mongoose'
import UserModel, { UserModelDocument, UserModelInput } from 'models/user.model'

export async function createUser(input: UserModelInput) {
  return UserModel.create(input)
    .then((user) => {
      return omit(user.toJSON(), 'password')
    })
    .catch((e: any) => {
      throw new Error(e)
    })
}

type ValidatePassword = {
  email: string
  password: string
}

export async function validatePassword({ email, password }: ValidatePassword) {
  const user = await UserModel.findOne({ email })

  if (!user) {
    return false
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    return false
  }

  return omit(user.toJSON(), 'password')
}

export async function findUser(query: FilterQuery<UserModelDocument>) {
  return UserModel.findOne(query).lean()
}
