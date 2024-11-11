const TimeMasterService = require("../../services/master/TimeMasterService");
const timeMasterService = new TimeMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new time record
const ADD_TIME = async (req, res) => {
    try {
        await timeMasterService.createTime(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Time added successfully',
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

// Update an existing time record
const UPDATE_TIME = async (req, res) => {
    const { timeId } = req.params; // Assuming timeId is passed as a route parameter
    try {
        await timeMasterService.updateTime(timeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Time updated successfully',
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

// Delete a time record
const DELETE_TIME = async (req, res) => {
    const { timeId } = req.params; // Assuming timeId is passed as a route parameter
    try {
        await timeMasterService.deleteTime(timeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Time deleted successfully',
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

// Fetch time records
const FETCH_TIMES = async (req, res) => {
    try {
        const result = await timeMasterService.fetchTimes(req.query);
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
    ADD_TIME,
    UPDATE_TIME,
    DELETE_TIME,
    FETCH_TIMES
};
