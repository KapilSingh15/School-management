const StudentRegistrationService = require("../../services/master/StudentRegistrationService");
const studentRegistrationService = new StudentRegistrationService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new student registration record
const ADD_STUDENT_REGISTRATION = async (req, res) => {
    try {
        await studentRegistrationService.createStudentRegistration(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student registration added successfully',
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

// Update an existing student registration record
const UPDATE_STUDENT_REGISTRATION = async (req, res) => {
    const { studentRegistrationId } = req.params; // Assuming studentRegistrationId is passed as a route parameter
    try {
        await studentRegistrationService.updateStudentRegistration(studentRegistrationId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student registration updated successfully',
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

// Delete a student registration record
const DELETE_STUDENT_REGISTRATION = async (req, res) => {
    const { studentRegistrationId } = req.params; // Assuming studentRegistrationId is passed as a route parameter
    try {
        await studentRegistrationService.deleteStudentRegistration(studentRegistrationId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student registration deleted successfully',
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

// Fetch student registration records
const FETCH_STUDENT_REGISTRATIONS = async (req, res) => {
    try {
        const result = await studentRegistrationService.fetchStudentRegistrations(req.query);
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
    ADD_STUDENT_REGISTRATION,
    UPDATE_STUDENT_REGISTRATION,
    DELETE_STUDENT_REGISTRATION,
    FETCH_STUDENT_REGISTRATIONS
};
