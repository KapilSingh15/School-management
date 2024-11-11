const StudentMasterService = require("../../services/master/StudentMasterService");
const studentMasterService = new StudentMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new student record
const ADD_STUDENT = async (req, res) => {
    try {
        await studentMasterService.createStudent(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student added successfully',
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

// Update an existing student record
const UPDATE_STUDENT = async (req, res) => {
    const { studentId } = req.params; // Assuming studentId is passed as a route parameter
    try {
        await studentMasterService.updateStudent(studentId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student updated successfully',
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

// Delete a student record
const DELETE_STUDENT = async (req, res) => {
    const { studentId } = req.params; // Assuming studentId is passed as a route parameter
    try {
        await studentMasterService.deleteStudent(studentId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student deleted successfully',
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

// Fetch student records
const FETCH_STUDENTS = async (req, res) => {
    try {
        const result = await studentMasterService.fetchStudents(req.query);
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
    ADD_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    FETCH_STUDENTS
};
