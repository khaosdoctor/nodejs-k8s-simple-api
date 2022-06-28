import { createHash, createHmac, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

function encryptHmac (data, key) {
  return createHmac('sha512', key).update(data).digest('hex')
}

function encryptHash (data) {
  return createHash('sha512').update(data).digest('hex')
}

function aesEncrypt (key, data) {
  const iv = randomBytes(16)
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  let encrypted = Buffer.concat([
    cipher.update(data),
    cipher.final()
  ])

  return {
    encrypted: encrypted.toString('hex'),
    iv: iv.toString('hex')
  }
}

function aesDecrypt (key, iv, encrypted) {
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'))
  let deciphered = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
    decipher.final()
  ])
  return deciphered.toString('utf-8')
}

export {
  encryptHmac,
  encryptHash,
  aesEncrypt,
  aesDecrypt
}
