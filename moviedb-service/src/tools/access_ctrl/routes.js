export default {
  "/movie/post": {
    allowed: ["admin"],
  },
  "/movie/gets": {
    allowed: ["subscriber"],
  },
  "/movie/list": {
    allowed: ["subscriber", "producer"],
  },
  "/playlist/post": {
    allowed: ["subscriber"],
  },
};