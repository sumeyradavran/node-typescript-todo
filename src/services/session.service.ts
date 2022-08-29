import { FilterQuery } from 'mongoose'
import config from 'config'

import SessionModel, { SessionModelDocument } from 'models/session.model'
import { signJwt, verifyJwt } from 'utils/jwt'
import { get } from 'lodash'
import { findUser } from './user.service'

export async function createSession(userId: string, userAgent: string) {
  return SessionModel.create({ user: userId, userAgent })
    .then((session) => {
      return session
    })
    .catch((error) => {
      throw new Error(error)
    })
}
export async function findSessions(query: FilterQuery<SessionModelDocument>) {
  return SessionModel.find(query).lean()
}
export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string
}) {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey')

  if (!decoded || !get(decoded, 'session')) {
    return false
  }

  const session = await SessionModel.findById(get(decoded, 'session'))

  if (!session?.valid) {
    return false
  }

  const user = await findUser({ _id: session.user })

  if (!user) {
    return false
  }

  const accessToken = signJwt(
    { ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTtl') }
  )

  return accessToken
}
export async function deleteSession(query: FilterQuery<SessionModelDocument>) {
  return SessionModel.updateOne(query, { valid: false })
}
