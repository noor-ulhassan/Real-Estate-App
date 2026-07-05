import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. Grab the token from the request cookies
  const token = req.cookies.token;

  // 2. If there's no token, the user is NOT logged in. Reject them.
  if (!token) {
    return res.status(401).json({
      message: "You are not authenticated. Please log in.",
      success: false,
    });
  }

  // 3. If there IS a token, verify it's real and not tampered with
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Token exists but is invalid or expired
      return res.status(403).json({
        message: "Invalid or expired token. Please log in again.",
        success: false,
      });
    }

    // 4. Token is valid! Attach the decoded user info to the request.
    //    Now any controller after this can use req.user to know WHO is making the request.
    req.user = decoded;

    // 5. Call next() to pass control to the next function (the controller)
    next();
  });
};
