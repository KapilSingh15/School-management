const UserModulePermissionService = require("../../services/master/UserModulePermissionService");
const userModulePermissionService = new UserModulePermissionService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new user module permission record
const ADD_USER_MODULE_PERMISSION = async (req, res) => {
    try {
        await userModulePermissionService.createUserModulePermission(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'User module permission added successfully',
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

// Update an existing user module permission record
const UPDATE_USER_MODULE_PERMISSION = async (req, res) => {
    const { permissionId } = req.params; // Assuming permissionId is passed as a route parameter
    try {
        await userModulePermissionService.updateUserModulePermission(permissionId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'User module permission updated successfully',
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

// Delete a user module permission record
const DELETE_USER_MODULE_PERMISSION = async (req, res) => {
    const { permissionId } = req.params; // Assuming permissionId is passed as a route parameter
    try {
        await userModulePermissionService.deleteUserModulePermission(permissionId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'User module permission deleted successfully',
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

// Fetch user module permission records
const FETCH_USER_MODULE_PERMISSIONS = async (req, res) => {
    try {
        const result = await userModulePermissionService.fetchUserModulePermissions(req.query);
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
    ADD_USER_MODULE_PERMISSION,
    UPDATE_USER_MODULE_PERMISSION,
    DELETE_USER_MODULE_PERMISSION,
    FETCH_USER_MODULE_PERMISSIONS
};
