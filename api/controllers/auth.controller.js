import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import  Jwt  from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });

  try {
    await newUser.save();
    res.status(201).json("user created succesfuly");
  } catch (error) {
    next(error); //middlewear function will handle this error
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
       const validuser=await User .findOne({email}) ;                            //form User.model.js
       if(!validuser)
       {
        return next(errorHandler(404,'user not found !!'))
       }else{
        const validpassword=bcryptjs.compareSync(password,validuser.password);
        if(!validpassword){
            return next(errorHandler(401,'Invalid credentials'))
        }else{
            const token=Jwt.sign({id:validuser._id},process.env.JWT_SECRET);

            const {password:pass, ...rest}=validuser._doc;      //send rest of things without password wrapping into rest
            
            res.cookie('access_token',token, {httpOnly:true}).status(200).json(rest);   //save into cookie and reutrn the rest
        }
       }
        } catch (error) {
            next(error);
        }
};

export const google=async (req,res,next)=>{
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =                             //in this case User model password field is required in case of signup
                                                           //with google it doesnt ask for password and it will throw error for pass req
                                                           //so generate a random password
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}

export const signOut= async(req,res,next)=>{
try {
  res.clearCookie('access_token');
  res.status(200).json('User has been logged out');
} catch (error) {
next(error)  
}
}