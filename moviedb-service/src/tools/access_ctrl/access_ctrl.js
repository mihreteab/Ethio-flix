import auth from '../auth';
import routes from './routes';

async function allowAccess(req, res, next) {
  let route = routes[req.url];
  let { userId, role } = await auth.decodeToken(req.body.security.token);
  if(!route.allowed.includes(role)){
    return res.status(401).json({
      statusCode: 401,
      statusMessage: "Unauthorized Access",
    });
  }
  next();
}