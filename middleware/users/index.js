const Response = require('../../response/index')
const HttpStatus = require('http-status');
const blueBirdPromise = require('bluebird');
const jwt= blueBirdPromise.promisifyAll(require('jsonwebtoken'));
const bcrypt = require('bcrypt');

exports.verifyProjectApiKey = (req, res, next) => {
    try {
        let apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return Response.error(req, res, { msgCode: 'MISSING_API_KEY' }, HttpStatus.UNAUTHORIZED);
        }
        if (apiKey != process.env.USER_PUBLIC_API_KEY) {
            return Response.error(req, res, { msgCode: 'INVALID_API_KEY' }, HttpStatus.UNAUTHORIZED)
        }
        else{
            return next();
        }
    } catch (error) {
        return Response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

exports.verifyAccessToken = async (req, res, next) => {
    try {
        let token = req.headers["accesstoken"];
        if (!token) {
            return Response.error(req, res, { msgCode: 'MISSING_TOKEN' }, HttpStatus.UNAUTHORIZED);
        }
        token = token.replace(/^Bearer\s+/, "");
        jwt.verify(token, Constant.settings.admin_PRIVATE_KEY, async (error, decoded) => {
            if (error!==null) {
                if (error.message == Constant.error_msg.INVALID) {
                    return Response.error(req, res, { 'msgCode': 'INVALID_TOKEN' }, HttpStatus.UNAUTHORIZED)
                }
                else if (error.message == Constant.error_msg.EXPIRED) {
                    return Response.error(req, res, { 'msgCode': "TOKEN_EXPIRED" }, HttpStatus.UNAUTHORIZED)
                }
                else{
                    return Response.error(req, res, { 'msgCode': "INVALID_TOKEN" }, HttpStatus.UNAUTHORIZED)
                }                
            }
            else {
                const checkJwt = await CommonService.getByCondition(Model.Admins, {access_token: token})
                if (!checkJwt) {
                    return Response.error(req, res, { msgCode: 'INVALID_TOKEN' }, HttpStatus.UNAUTHORIZED)
                }
                else {
                    req.data = decoded;
                    return next();
                }
            }            
        });
    }
    catch (err) {
        return Response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR)
    }
};

exports.genrateUserAuthToken = (data) => {
    return jwt.signAsync(data, process.env.JWT_USER_PRIVATE_KEY, { expiresIn: process.env.JWT_USER_TOKEN_VALID_TILL })
        .then( (jwtToken) => {
            return jwtToken;
        }).catch(error => {
            return [0,error];
        });
};
exports.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(process.env.JWT_USER_SALT_LENGTH);
    const hashPassworrd = bcrypt.hashSync(password.trim(), salt);
    return hashPassworrd;
};
exports.comparePassword = (plainPassword, hashedPassword) => {
    try {
        const trimmedPassword = plainPassword.trim();
        console.log(trimmedPassword);
        const isMatch = bcrypt.compareSync(trimmedPassword.trim(), hashedPassword);
        console.log(isMatch);
        
        return isMatch;
    } catch (error) {
        console.error('Failed to compare password:', error);
        throw new Error('Password comparison failed');
    }
}