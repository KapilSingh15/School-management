const StateMasterService = require("../../services/master/StateMasterService");
const stateMasterService = new StateMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new state record
const ADD_STATE = async (req, res) => {
    try {
        await stateMasterService.createState(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'State added successfully',
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

// Update an existing state record
const UPDATE_STATE = async (req, res) => {
    const { stateId } = req.params; // Assuming stateId is passed as a route parameter
    try {
        await stateMasterService.updateState(stateId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'State updated successfully',
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

// Delete a state record
const DELETE_STATE = async (req, res) => {
    const { stateId } = req.params; // Assuming stateId is passed as a route parameter
    try {
        await stateMasterService.deleteState(stateId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'State deleted successfully',
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

// Fetch state records
const FETCH_STATES = async (req, res) => {
    try {
        const result = await stateMasterService.fetchStates(req.query);
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
    ADD_STATE,
    UPDATE_STATE,
    DELETE_STATE,
    FETCH_STATES
};
