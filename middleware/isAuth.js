import jwt from 'jsonwebtoken';

export const isAuth = async (req,res, next) => {
    try{
        const token = req.header.token;

        if (!token) {
            return res.status(403).json({
            message: "Please login",
            });
        }

        const decode = jwt.verify(token, process.env.Jwt_sec);

        req.user = await User.findById(decode._id);

        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Login First",
        });
    }
};

export default isAuth;