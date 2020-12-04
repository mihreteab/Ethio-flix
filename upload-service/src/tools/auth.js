const bcrypt = require("bcrypt");
const jwtAuth = require("fwsp-jwt-auth");

jwtAuth.loadCerts("./src/config/server.pem", "./src/config/server.pem");

async function createToken(userId, role) {
  try {
    const token = await jwtAuth.createAccessToken({ userId, role });
    return token;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

async function decodeToken(token) {
  try {
    const data = await jwtAuth.verifyToken(token);
    return data;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

function hashPassword(passwd) {
  return bcrypt.hashSync(passwd, 10);
}

function comparePassword(passwd, hash) {
  return bcrypt.compareSync(passwd, hash);
}

export default {
  createToken,
  decodeToken,
  hashPassword,
  comparePassword
}
