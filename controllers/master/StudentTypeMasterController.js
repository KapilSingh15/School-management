const StudentTypeMasterService = require("../../services/master/StudentTypeMasterService");
const studentTypeMasterService = new StudentTypeMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new student type record
const ADD_STUDENT_TYPE = async (req, res) => {
    try {
        await studentTypeMasterService.createStudentType(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student type added successfully',
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

// Update an existing student type record
const UPDATE_STUDENT_TYPE = async (req, res) => {
    const { studentTypeId } = req.params; // Assuming studentTypeId is passed as a route parameter
    try {
        await studentTypeMasterService.updateStudentType(studentTypeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student type updated successfully',
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

// Delete a student type record
const DELETE_STUDENT_TYPE = async (req, res) => {
    const { studentTypeId } = req.params; // Assuming studentTypeId is passed as a route parameter
    try {
        await studentTypeMasterService.deleteStudentType(studentTypeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Student type deleted successfully',
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

// Fetch student type records
const FETCH_STUDENT_TYPES = async (req, res) => {
    try {
        const result = await studentTypeMasterService.fetchStudentTypes(req.query);
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
    ADD_STUDENT_TYPE,
    UPDATE_STUDENT_TYPE,
    DELETE_STUDENT_TYPE,
    FETCH_STUDENT_TYPES
};
