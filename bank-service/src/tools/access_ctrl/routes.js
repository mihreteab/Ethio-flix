export default {
  "/account/post": {
    allowed: ["producer", "subscriber", "admin"],
  },
  "/account/get": {
    allowed: ["producer", "subscriber", "admin"],
  },
  "/txn/deposite": {
    allowed: ["producer", "subscriber", "admin"],
  },
  "/txn/transfer": {
    allowed: ["producer", "subscriber", "admin"],
  },
  "/txn/balance/get": {
    allowed: ["producer", "subscriber", "admin"],
  },
};
