const ParentDetailMasterService = require("../../services/master/ParentDetailMasterService");
const parentDetailMasterService = new ParentDetailMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new parent detail record
const ADD_PARENT_DETAIL = async (req, res) => {
    try {
        await parentDetailMasterService.createParentDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Parent detail added successfully',
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

// Update an existing parent detail record
const UPDATE_PARENT_DETAIL = async (req, res) => {
    const { parentDetailId } = req.params; // Assuming parentDetailId is passed as a route parameter
    try {
        await parentDetailMasterService.updateParentDetail(parentDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Parent detail updated successfully',
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

// Delete a parent detail record
const DELETE_PARENT_DETAIL = async (req, res) => {
    const { parentDetailId } = req.params; // Assuming parentDetailId is passed as a route parameter
    try {
        await parentDetailMasterService.deleteParentDetail(parentDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Parent detail deleted successfully',
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

// Fetch parent detail records
const FETCH_PARENT_DETAILS = async (req, res) => {
    try {
        const result = await parentDetailMasterService.fetchParentDetails(req.query);
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
    ADD_PARENT_DETAIL,
    UPDATE_PARENT_DETAIL,
    DELETE_PARENT_DETAIL,
    FETCH_PARENT_DETAILS
};
