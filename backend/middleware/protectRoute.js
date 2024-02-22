import Jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).json({ error: 'Unauthorised-no token' })
    }
    const decoded = Jwt.verify(token, process.env.JWT_SECRET)
    
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorised-invalid token' })
    }
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }
    req.user = user
    next()
  } catch (error) {
    console.log('error in protectRoute ', error.message)
  }
}
export default protectRoute
