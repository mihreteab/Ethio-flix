import HOA from './logic/moviedb-endpoint'

const routes = [
  {
    name: "ping hello",
    url: "/pingadmin",
    cb: HOA.pingAdmin
  },
  {
    name: "ping me",
    url: "/pingme",
    cb: HOA.PingMe
  },
  {
    name: "store movie data",
    url: "/movie/store",
    cb: HOA.storeMovie
  },
  {
    name: "get movie data",
    url: "/movie/get",
    cb: HOA.getMovie
  }
];

export default routes;