import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {apiResponse} from "../utils/apiResponse.js"
const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists - email,username
    // check for images, check for avatar
    // upload them to cloudinary , avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const{username,email,password,fullname}= req.body;
    console.log(email);

    if(
        [username,email,password,fullname].some((field)=>field?.trim() === "")
    ){
        throw new ApiError(400,"All fileds are required");
    }
    
    const existedUser = User.findOne({
        $or : [{username},{email}]
    })
    if(existedUser) {
        throw new ApiError(409,"username and email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath =req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar Image is required")
    }

    const avatar = uploadOnCloudinary(avatarLocalPath);
    const coverImage = uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar Image is required");
    }

    const user = await User.create({
        username : username.toLowerCase(),
        email,
        password,
        fullname,
        avatar : avatar.url,
        coverImage : coverImage?.url || ""
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");
    }

    return res.status(201).json(
        new apiResponse(200,createdUser,"User registered successfully")
    )

})

export {registerUser}