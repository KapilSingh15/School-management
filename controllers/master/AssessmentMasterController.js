const AssessmentMasterService = require("../../services/master/AssessmentMasterService");
const assessmentMasterService = new AssessmentMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new assessment
const ADD_ASSESSMENT = async (req, res) => {
    try {
        await assessmentMasterService.createAssessment(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Assessment added successfully',
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

// Update an existing assessment
const UPDATE_ASSESSMENT = async (req, res) => {
    const { assessmentId } = req.params; // Assuming assessmentId is passed as a route parameter
    try {
        await assessmentMasterService.updateAssessment(assessmentId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Assessment updated successfully',
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

// Delete an assessment
const DELETE_ASSESSMENT = async (req, res) => {
    const { assessmentId } = req.params; // Assuming assessmentId is passed as a route parameter
    try {
        await assessmentMasterService.deleteAssessment(assessmentId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Assessment deleted successfully',
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

// Fetch assessments
const FETCH_ASSESSMENTS = async (req, res) => {
    try {
        const result = await assessmentMasterService.fetchAssessments(req.query);
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
    ADD_ASSESSMENT,
    UPDATE_ASSESSMENT,
    DELETE_ASSESSMENT,
    FETCH_ASSESSMENTS
};
