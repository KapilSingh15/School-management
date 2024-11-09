const GroupMasterService = require("../../services/master/GroupMasterService");
const groupMasterService = new GroupMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new group record
const ADD_GROUP = async (req, res) => {
    try {
        await groupMasterService.createGroup(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Group added successfully',
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

// Update an existing group record
const UPDATE_GROUP = async (req, res) => {
    const { groupId } = req.params; // Assuming groupId is passed as a route parameter
    try {
        await groupMasterService.updateGroup(groupId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Group updated successfully',
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

// Delete a group record
const DELETE_GROUP = async (req, res) => {
    const { groupId } = req.params; // Assuming groupId is passed as a route parameter
    try {
        await groupMasterService.deleteGroup(groupId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Group deleted successfully',
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

// Fetch group records
const FETCH_GROUPS = async (req, res) => {
    try {
        const result = await groupMasterService.fetchGroups(req.query);
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
    ADD_GROUP,
    UPDATE_GROUP,
    DELETE_GROUP,
    FETCH_GROUPS
};
