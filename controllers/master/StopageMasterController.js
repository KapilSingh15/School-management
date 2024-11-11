const StopageMasterService = require("../../services/master/StopageMasterService");
const stopageMasterService = new StopageMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new stopage record
const ADD_STOPAGE = async (req, res) => {
    try {
        await stopageMasterService.createStopage(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Stopage added successfully',
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

// Update an existing stopage record
const UPDATE_STOPAGE = async (req, res) => {
    const { stopageId } = req.params; // Assuming stopageId is passed as a route parameter
    try {
        await stopageMasterService.updateStopage(stopageId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Stopage updated successfully',
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

// Delete a stopage record
const DELETE_STOPAGE = async (req, res) => {
    const { stopageId } = req.params; // Assuming stopageId is passed as a route parameter
    try {
        await stopageMasterService.deleteStopage(stopageId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Stopage deleted successfully',
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

// Fetch stopage records
const FETCH_STOPAGES = async (req, res) => {
    try {
        const result = await stopageMasterService.fetchStopages(req.query);
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
    ADD_STOPAGE,
    UPDATE_STOPAGE,
    DELETE_STOPAGE,
    FETCH_STOPAGES
};
