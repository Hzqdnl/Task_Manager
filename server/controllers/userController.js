import User from "../models/user.js";

export const registerUser = async (req, res) => {
    try {
        const {name, email, password, isAdmin, role, title} = req.body;
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                status: false,
                message: 'User already Exist',
            })
        }

        const user = await User.create({
            name, email, password, isAdmin, role, title,
        });

        if(user){
            isAdmin ? createJWT(res, user._id) : null;
        }

    } catch (error) {
        return res
        .status(400)
        .json({status: false, message: error.message});
    }
}

// export const registerUser = async (req, res) => {
//     try {
        
//     } catch (error) {
//         return res
//         .status(400)
//         .json({status: false, message: error.message});
//     }
// }