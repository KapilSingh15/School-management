const StudentOptionalSubjectMasterService = require("../../services/master/StudentOptionalSubjectMasterService");
const studentOptionalSubjectMasterService = new StudentOptionalSubjectMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new student optional subject record
const ADD_STUDENT_OPTIONAL_SUBJECT = async (req, res) => {
    try {
        await studentOptionalSubjectMasterService.createStudentOptionalSubject(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student optional subject added successfully',
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

// Update an existing student optional subject record
const UPDATE_STUDENT_OPTIONAL_SUBJECT = async (req, res) => {
    const { studentOptionalSubjectId } = req.params; // Assuming studentOptionalSubjectId is passed as a route parameter
    try {
        await studentOptionalSubjectMasterService.updateStudentOptionalSubject(studentOptionalSubjectId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student optional subject updated successfully',
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

// Delete a student optional subject record
const DELETE_STUDENT_OPTIONAL_SUBJECT = async (req, res) => {
    const { studentOptionalSubjectId } = req.params; // Assuming studentOptionalSubjectId is passed as a route parameter
    try {
        await studentOptionalSubjectMasterService.deleteStudentOptionalSubject(studentOptionalSubjectId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student optional subject deleted successfully',
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

// Fetch student optional subject records
const FETCH_STUDENT_OPTIONAL_SUBJECTS = async (req, res) => {
    try {
        const result = await studentOptionalSubjectMasterService.fetchStudentOptionalSubjects(req.query);
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
    ADD_STUDENT_OPTIONAL_SUBJECT,
    UPDATE_STUDENT_OPTIONAL_SUBJECT,
    DELETE_STUDENT_OPTIONAL_SUBJECT,
    FETCH_STUDENT_OPTIONAL_SUBJECTS
};
