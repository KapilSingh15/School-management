const RoleMasterService = require("../../services/master/RoleMasterService");
const roleMasterService = new RoleMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new role record
const ADD_ROLE = async (req, res) => {
    try {
        await roleMasterService.createRole(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Role added successfully',
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

// Update an existing role record
const UPDATE_ROLE = async (req, res) => {
    const { roleId } = req.params; // Assuming roleId is passed as a route parameter
    try {
        await roleMasterService.updateRole(roleId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Role updated successfully',
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

// Delete a role record
const DELETE_ROLE = async (req, res) => {
    const { roleId } = req.params; // Assuming roleId is passed as a route parameter
    try {
        await roleMasterService.deleteRole(roleId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Role deleted successfully',
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

// Fetch role records
const FETCH_ROLES = async (req, res) => {
    try {
        const result = await roleMasterService.fetchRoles(req.query);
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
    ADD_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE,
    FETCH_ROLES
};
