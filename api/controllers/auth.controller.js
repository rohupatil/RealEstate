import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import  Jwt  from "jsonwebtoken";

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
            return next(401,'Invalid password')
        }else{
            const token=Jwt.sign({id:validuser._id},process.env.JWT_SECRET);

            const {password:pass, ...rest}=validuser._doc;      //send rest of things without password wrapping into rest
            
            res.cookie('access_token',token, {httpOnly:true}).status(200).json(rest);
        }
       }
        } catch (error) {
            next(error);
        }
};
