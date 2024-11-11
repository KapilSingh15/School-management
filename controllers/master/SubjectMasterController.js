const SubjectMasterService = require("../../services/master/SubjectMasterService");
const subjectMasterService = new SubjectMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new subject record
const ADD_SUBJECT = async (req, res) => {
    try {
        await subjectMasterService.createSubject(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Subject added successfully',
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

// Update an existing subject record
const UPDATE_SUBJECT = async (req, res) => {
    const { subjectId } = req.params; // Assuming subjectId is passed as a route parameter
    try {
        await subjectMasterService.updateSubject(subjectId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Subject updated successfully',
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

// Delete a subject record
const DELETE_SUBJECT = async (req, res) => {
    const { subjectId } = req.params; // Assuming subjectId is passed as a route parameter
    try {
        await subjectMasterService.deleteSubject(subjectId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Subject deleted successfully',
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

// Fetch subject records
const FETCH_SUBJECTS = async (req, res) => {
    try {
        const result = await subjectMasterService.fetchSubjects(req.query);
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
    ADD_SUBJECT,
    UPDATE_SUBJECT,
    DELETE_SUBJECT,
    FETCH_SUBJECTS
};
