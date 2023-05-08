import { hash } from 'bcrypt'

const SALT = 12

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, SALT)

  return hashedPassword
}
