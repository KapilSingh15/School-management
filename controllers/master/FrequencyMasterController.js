const FrequencyMasterService = require("../../services/master/FrequencyMasterService");
const frequencyMasterService = new FrequencyMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new frequency record
const ADD_FREQUENCY = async (req, res) => {
    try {
        await frequencyMasterService.createFrequency(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Frequency added successfully',
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

// Update an existing frequency record
const UPDATE_FREQUENCY = async (req, res) => {
    const { frequencyId } = req.params; // Assuming frequencyId is passed as a route parameter
    try {
        await frequencyMasterService.updateFrequency(frequencyId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Frequency updated successfully',
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

// Delete a frequency record
const DELETE_FREQUENCY = async (req, res) => {
    const { frequencyId } = req.params; // Assuming frequencyId is passed as a route parameter
    try {
        await frequencyMasterService.deleteFrequency(frequencyId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Frequency deleted successfully',
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

// Fetch frequency records
const FETCH_FREQUENCIES = async (req, res) => {
    try {
        const result = await frequencyMasterService.fetchFrequencies(req.query);
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
    ADD_FREQUENCY,
    UPDATE_FREQUENCY,
    DELETE_FREQUENCY,
    FETCH_FREQUENCIES
};
