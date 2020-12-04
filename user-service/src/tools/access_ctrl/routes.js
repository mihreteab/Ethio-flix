export default {
  "/movie/post": {
    allowed: ["producer"],
  },
  "/movie/get": {
    allowed: ["producer", "subscriber"],
  },
};