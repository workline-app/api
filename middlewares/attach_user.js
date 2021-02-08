import jwtDecode from 'jwt-decode';

export default (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) res.status(401).json({ message: 'Authentication invalid' });

  // Remove the Bearer scheme from the token.
  const decodedToken = jwtDecode(token.slice(6));

  if (!decodedToken) {
    res
      .status(401)
      .json({ message: 'There was a problem authorizing the request' });
  } else {
    req.user = decodedToken;
    next();
  }
};
