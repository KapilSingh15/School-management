const FrequencyMonthMappingMasterService = require("../../services/master/FrequencyMonthMappingMasterService");
const frequencyMonthMappingMasterService = new FrequencyMonthMappingMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new frequency month mapping record
const ADD_FREQUENCY_MONTH_MAPPING = async (req, res) => {
    try {
        await frequencyMonthMappingMasterService.createFrequencyMonthMapping(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Frequency month mapping added successfully',
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

// Update an existing frequency month mapping record
const UPDATE_FREQUENCY_MONTH_MAPPING = async (req, res) => {
    const { frequencyMonthMappingId } = req.params; // Assuming frequencyMonthMappingId is passed as a route parameter
    try {
        await frequencyMonthMappingMasterService.updateFrequencyMonthMapping(frequencyMonthMappingId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Frequency month mapping updated successfully',
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

// Delete a frequency month mapping record
const DELETE_FREQUENCY_MONTH_MAPPING = async (req, res) => {
    const { frequencyMonthMappingId } = req.params; // Assuming frequencyMonthMappingId is passed as a route parameter
    try {
        await frequencyMonthMappingMasterService.deleteFrequencyMonthMapping(frequencyMonthMappingId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Frequency month mapping deleted successfully',
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

// Fetch frequency month mapping records
const FETCH_FREQUENCY_MONTH_MAPPINGS = async (req, res) => {
    try {
        const result = await frequencyMonthMappingMasterService.fetchFrequencyMonthMappings(req.query);
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
    ADD_FREQUENCY_MONTH_MAPPING,
    UPDATE_FREQUENCY_MONTH_MAPPING,
    DELETE_FREQUENCY_MONTH_MAPPING,
    FETCH_FREQUENCY_MONTH_MAPPINGS
};
