import auth from '../auth';
import routes from './routes';

export default async function allowAccess(req, res, next) {
  console.log(req.body)
  let route = routes[req.url];
  let {user_id} = await auth.decodeToken(req.body.security.token);

  if(!route.allowed.includes(user_id.role)){
    return res.status(401).json({
      statusCode: 401,
      statusMessage: "Unauthorized Access",
    });
  }
  req.body.param.user_id = user_id.user_id;
  next();
}
