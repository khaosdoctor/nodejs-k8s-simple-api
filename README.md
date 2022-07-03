# Simple Node.js API for Kubernetes

> This is just a simple Node.js API to be published locally with Node.js and KinD.

## More Details

This API is just a hashing and cryptography API, it has two main routes, 

- The `/hash/:data` route will hash everything that's sent as a parameter
  - If you want to use a password to use an HMAC instead of a simple SHA512 pass the `?key=<yourpass>` query string
- The `/aes/:data` will perform an AES reversible encryption and return both the encrypted text and an IV, to decrypt, you'll need both
  - To decrypt the data, pass on `?key=<yourpass>&iv=<theIV>&decrypt=1` to the query string
  
### Envs

- `PORT`: Default is 3000, if passed will tell the app to run on a specific port
