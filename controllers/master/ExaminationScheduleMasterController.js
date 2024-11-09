const ExaminationScheduleMasterService = require("../../services/master/ExaminationScheduleMasterService");
const examinationScheduleMasterService = new ExaminationScheduleMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new examination schedule record
const ADD_EXAM_SCHEDULE = async (req, res) => {
    try {
        await examinationScheduleMasterService.createExaminationSchedule(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Examination schedule added successfully',
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

// Update an existing examination schedule record
const UPDATE_EXAM_SCHEDULE = async (req, res) => {
    const { examScheduleId } = req.params; // Assuming examScheduleId is passed as a route parameter
    try {
        await examinationScheduleMasterService.updateExaminationSchedule(examScheduleId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Examination schedule updated successfully',
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

// Delete an examination schedule record
const DELETE_EXAM_SCHEDULE = async (req, res) => {
    const { examScheduleId } = req.params; // Assuming examScheduleId is passed as a route parameter
    try {
        await examinationScheduleMasterService.deleteExaminationSchedule(examScheduleId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Examination schedule deleted successfully',
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

// Fetch examination schedule records
const FETCH_EXAM_SCHEDULES = async (req, res) => {
    try {
        const result = await examinationScheduleMasterService.fetchExaminationSchedules(req.query);
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
    ADD_EXAM_SCHEDULE,
    UPDATE_EXAM_SCHEDULE,
    DELETE_EXAM_SCHEDULE,
    FETCH_EXAM_SCHEDULES
};
