const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    try {
        //--------------------verify Authentication-----------------
        // Get authorization
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization token required" });
        }

        //  Get token
        // authorization = bearer + token
        //                bearer qqqqqq.wwwww.zzzz
        console.log("authorization", authorization);

        const token = authorization.split(' ')[1]; // Split by space
        //console.log("token", token);

        // Verify the token
        const { tokenId } = jwt.verify(token, process.env.SECRET);
        //console.log("_id=>", tokenId);

        // Find the user in the DB with the _id from token and add as property to req
        const user = await User.findOne({ _id: tokenId }).select("_id");
        //console.log("user=>", user);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.myUser = user;

        // 5. Fire the next handler function
        next();

    } catch (error) {
        console.error("Error:", error);
        res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = requireAuth;

// //A. ---------- Protecting Routes ----------

// //A1. import requireAuth middleware fct to protect workouts Routes
// const requireAuth = require("../middleware/requireAuth");

// //A2. we put it before all the routes to require Auth for all workouts routes
// router.use(requireAuth);
