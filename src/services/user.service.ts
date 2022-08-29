import { FilterQuery } from 'mongoose'
import { omit } from 'lodash'
import UserModel, { UserModelInput } from '../models/user.model'

export async function createUser(input: UserModelInput) {
  return UserModel.create(input)
    .then((user) => {
      return omit(user.toJSON(), 'password')
    })
    .catch((e: any) => {
      throw new Error(e)
    })
}
