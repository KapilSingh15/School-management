const LoginMasterService = require("../../services/master/LoginMasterService");
const loginMasterService = new LoginMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");
const db = require("../../model");
const {
    genrateUserAuthToken,
  } = require("../../middleware/users/index");

// Add a new login record
const ADD_LOGIN = async (req, res) => {
    try {
        await loginMasterService.createLogin(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Login added successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Update an existing login record
const UPDATE_LOGIN = async (req, res) => {
    const { loginId } = req.params; // Assuming loginId is passed as a route parameter
    try {
        await loginMasterService.updateLogin(loginId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Login updated successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Delete a login record
const DELETE_LOGIN = async (req, res) => {
    const { loginId } = req.params; // Assuming loginId is passed as a route parameter
    try {
        await loginMasterService.deleteLogin(loginId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Login deleted successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Fetch login records
const FETCH_LOGINS = async (req, res) => {
    try {
        const result = await loginMasterService.fetchLogins(req.query);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: result,
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};


const Login = async (req, res) => {
    try {
      const { loginId, password } = req.body;
  
      const user = await db.LoginMaster.findOne({ where: { LoginID: loginId } });
      if (!user) {
        return Response.error(req, res, { msgCode: "NOT_FOUND" }, httpStatus.NOT_FOUND);
      }
  
      if (user.Password !== password) {
        return Response.error(req, res, { msgCode: "WRONG_PASS" }, httpStatus.UNAUTHORIZED);
      }
  
      const accessToken = await genrateUserAuthToken({ 
        loginId: user.LoginID,
        roleId: user.RoleID,
        branchId: [user.BranchID],
        statusId: user.StatusID,
        email : user.EmailID,
        loginName : user.LoginName
      });
  
      return Response.success(req, res, {
        msgCode: "API_SUCCESS",
        data: {
          access_token: accessToken || ""
        }
      }, httpStatus.OK);
  
    } catch (error) {
      return Response.error(req, res, { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message }, httpStatus.INTERNAL_SERVER_ERROR);
    }
  };

module.exports = {
    ADD_LOGIN,
    UPDATE_LOGIN,
    DELETE_LOGIN,
    FETCH_LOGINS,
    Login
};
