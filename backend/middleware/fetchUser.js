const jwt = require('jsonwebtoken');
const JWT_token = "tanmayJWTtoken2026"

const fetchUser = (req,res,next) => {
    // get the user form JWT token and add id to req object
    const token = req.header('jwt_data');
    if (!token) {
        res.status(401).json({ error: "please authenticate using valid token if." });
    }
    try {
        const data = jwt.verify(token, JWT_token);
        req.user = data.user;

        next();
    } catch (error) {
        res.status(401).json({ error: "please authenticate using valid token catch." });
    }   
}

module.exports = fetchUser;