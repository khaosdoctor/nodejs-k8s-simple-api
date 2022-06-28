import Express from 'express'
import { aesDecrypt, aesEncrypt, encryptHash, encryptHmac } from './hasher.mjs'
const app = new Express()

function createHandler (algorithm) {
  return async (req, res) => {
    const { key, iv, decrypt } = req.query
    const { data } = req.params

    if (algorithm === 'aes') {
      if (!key) return res.status(400).json({ error: 'Key is missing' })
      if (key.length !== 32) return res.status(400).json({ error: 'Key should be 32 chars long' })
      if (!!decrypt && !iv) return res.status(400).json({ error: 'IV is missing' })
      if (!!decrypt && iv) return res.status(200).json({ response: aesDecrypt(key, iv, data) })
      return res.json(aesEncrypt(key, data))
    }

    if (key) return res.json({ hash: encryptHmac(data, key) })
    return res.json({ hash: encryptHash(data) })
  }
}

app.get('/hash/:data', createHandler('sha512'))
app.get('/aes/:data', createHandler('aes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server ready on port ${PORT}`))
