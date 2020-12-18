import auth from "../auth";
import routes from "./routes";

export default async function allowAccess(req, res, next) {
  let route = routes[req.url];
  let { userId } = await auth.decodeToken(req.body.security.token);
  if (!route.allowed.includes(userId.role)) {
    return res.status(401).json({
      statusCode: 401,
      statusMessage: "Unauthorized Access",
    });
  }
  req.body.param.user_id = userId.user_id;
  next();
}
