import HOA from './logic/admin-endpoint'

const routes = [
  {
    name: 'ping moviedb',
    url: '/pingmoviedb',
    cb: HOA.ping_moviedb
  },
  {
    name: 'ping me',
    url: '/pingme',
    cb: HOA.ping_me
  }
]

export default routes;