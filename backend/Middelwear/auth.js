import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {

  const { usertoken } = req.headers;

  if (!usertoken) {
    console.log("token not avalibal")
    return res.json({ success: false, massege: "User is not authorized" })
  }

  try {
    if (!req.body) {
      req.body = {};
    }

    const decoded = jwt.verify(usertoken, process.env.JWT_SECRET)
    req.body.id = decoded.id
    next();
  } catch (error) {
    console.log(error)
    res.json({ success: false, massege: "server error" })
  }
}

export { authMiddleware }