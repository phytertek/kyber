export const app = {
  name: 'Application Name',
  host: 'http://localhost',
  port: 8080,
  hostPort: 'http://localhost:8080'
}

export const db = {
  host: 'localhost',
  port: 28015,
  db: 'genericdbname'
}

export const auth = {
  passwordSalt: 'O7lcfArrFbBQp9g7VT7KZ0xcqZmCKZJV',
  sessionSecret: process.env.APP_AUTH_SESSIONSECRET ||
    '2GcK*"HlB@JY*BQ`(,*_q4`6a,d*}i0fJ^6mmo:P-W{=oTML$`?A2wWAJGfqlemr',
  jwtSecret: process.env.APP_AUTH_JWTSECRET ||
    'H#+Q9brQ2!C,VKdtQ<.Hh<+1/-=*n:x=MAAQ;kp0=.=_wTC0>U3@a@nM2&omeWwC'
}
