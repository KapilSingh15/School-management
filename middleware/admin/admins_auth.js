const Response = require('../../response/index');
const HttpStatus = require('http-status');
const CommonService = require('../services/common');
const Model = require('../model/index');
const Constant = require('../constant/basic-const');
const { env } = require('../constant/environment');
const blueBirdPromise = require('bluebird');
const jwt = blueBirdPromise.promisifyAll(require('jsonwebtoken'));
const bcrypt = require("bcryptjs");

exports.verifyApiKey = (req, res, next) => {
    try {
        let apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return Response.error(req, res, { msgCode: 'MISSING_API_KEY' }, HttpStatus.UNAUTHORIZED);
        }
        if (apiKey != env.ADMIN_API_KEY) {
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

exports.genrateAdminToken = (data) => {
    return jwt.signAsync(data, Constant.settings.admin_PRIVATE_KEY, { expiresIn: Constant.settings.admin_token_expiresIn })
        .then( (jwtToken) => {
            return [1,jwtToken];
        }).catch(error => {
            return [0,error];
        });
};

exports.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(Constant.settings.SALT_LENGTH);
    const hashPassworrd = bcrypt.hashSync(password.trim(), salt);
    return hashPassworrd;
};