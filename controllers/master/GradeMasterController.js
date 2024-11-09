const GradeMasterService = require("../../services/master/GradeMasterService");
const gradeMasterService = new GradeMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new grade record
const ADD_GRADE = async (req, res) => {
    try {
        await gradeMasterService.createGrade(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Grade added successfully',
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

// Update an existing grade record
const UPDATE_GRADE = async (req, res) => {
    const { gradeId } = req.params; // Assuming gradeId is passed as a route parameter
    try {
        await gradeMasterService.updateGrade(gradeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Grade updated successfully',
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

// Delete a grade record
const DELETE_GRADE = async (req, res) => {
    const { gradeId } = req.params; // Assuming gradeId is passed as a route parameter
    try {
        await gradeMasterService.deleteGrade(gradeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Grade deleted successfully',
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

// Fetch grade records
const FETCH_GRADES = async (req, res) => {
    try {
        const result = await gradeMasterService.fetchGrades(req.query);
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
    ADD_GRADE,
    UPDATE_GRADE,
    DELETE_GRADE,
    FETCH_GRADES
};
