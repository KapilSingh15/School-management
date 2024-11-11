const StudentHistoryService = require("../../services/master/StudentHistoryService");
const studentHistoryService = new StudentHistoryService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new student history record
const ADD_STUDENT_HISTORY = async (req, res) => {
    try {
        await studentHistoryService.createStudentHistory(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student history added successfully',
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

// Update an existing student history record
const UPDATE_STUDENT_HISTORY = async (req, res) => {
    const { studentHistoryId } = req.params; // Assuming studentHistoryId is passed as a route parameter
    try {
        await studentHistoryService.updateStudentHistory(studentHistoryId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student history updated successfully',
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

// Delete a student history record
const DELETE_STUDENT_HISTORY = async (req, res) => {
    const { studentHistoryId } = req.params; // Assuming studentHistoryId is passed as a route parameter
    try {
        await studentHistoryService.deleteStudentHistory(studentHistoryId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student history deleted successfully',
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

// Fetch student history records
const FETCH_STUDENT_HISTORIES = async (req, res) => {
    try {
        const result = await studentHistoryService.fetchStudentHistories(req.query);
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
    ADD_STUDENT_HISTORY,
    UPDATE_STUDENT_HISTORY,
    DELETE_STUDENT_HISTORY,
    FETCH_STUDENT_HISTORIES
};
