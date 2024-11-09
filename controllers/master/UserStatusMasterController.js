const UserStatusMasterService = require("../../services/master/UserStatusMasterService");
const userStatusMasterService = new UserStatusMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new user status
const ADD_USER_STATUS = async (req, res) => {
    try {
        await userStatusMasterService.createUserStatus(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'User status added successfully',
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

// Update an existing user status
const UPDATE_USER_STATUS = async (req, res) => {
    const { statusId } = req.params; // Assuming statusId is passed as a route parameter
    try {
        await userStatusMasterService.updateUserStatus(statusId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'User status updated successfully',
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

// Delete a user status
const DELETE_USER_STATUS = async (req, res) => {
    const { statusId } = req.params; // Assuming statusId is passed as a route parameter
    try {
        await userStatusMasterService.deleteUserStatus(statusId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'User status deleted successfully',
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

// Fetch user statuses
const FETCH_USER_STATUSES = async (req, res) => {
    try {
        const result = await userStatusMasterService.fetchUserStatuses(req.query);
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

module.exports = {
    ADD_USER_STATUS,
    UPDATE_USER_STATUS,
    DELETE_USER_STATUS,
    FETCH_USER_STATUSES
};
