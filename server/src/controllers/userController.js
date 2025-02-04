const sendToken = require("../utils/jwtToken.js");
const ErrorHandler = require("../utils/errorhandler.js");
const User = require("../models/userModels");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const jwt = require("jsonwebtoken"); 




exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);

})



///Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;


    //Checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }

    const user = await User.findOne({
        email
    }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (isPasswordMatched === false) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    

    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success : true,
    //     token
    // });

    sendToken(user, 200, res);


})


// Logout

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })



    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})


exports.checkAuthStatus = catchAsyncErrors(async (req, res) => {

        // Get the token from httpOnly cookie
        const {token} = req.cookies;

        if (!token) {
            return res.status(401).json({
                isAuthenticated: false,
                message: 'No token found'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Fetch the full user details
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({
                    isAuthenticated: false,
                    message: "User not found"
                });
            }
    
            return res.status(200).json({
                isAuthenticated: true,
                user
            });
        } catch (error) {
            return res.status(401).json({
                isAuthenticated: false,
                message: 'Invalid or expired token'
            });
        }
});

