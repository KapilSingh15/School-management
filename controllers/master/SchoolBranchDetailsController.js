const SchoolBranchDetailsService = require("../../services/master/SchoolBranchDetailsService");
const schoolBranchDetailsService = new SchoolBranchDetailsService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new school branch detail record
const ADD_SCHOOL_BRANCH_DETAIL = async (req, res) => {
    try {
        await schoolBranchDetailsService.createSchoolBranchDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'School branch detail added successfully',
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

// Update an existing school branch detail record
const UPDATE_SCHOOL_BRANCH_DETAIL = async (req, res) => {
    const { schoolBranchDetailId } = req.params; // Assuming schoolBranchDetailId is passed as a route parameter
    try {
        await schoolBranchDetailsService.updateSchoolBranchDetail(schoolBranchDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'School branch detail updated successfully',
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

// Delete a school branch detail record
const DELETE_SCHOOL_BRANCH_DETAIL = async (req, res) => {
    const { schoolBranchDetailId } = req.params; // Assuming schoolBranchDetailId is passed as a route parameter
    try {
        await schoolBranchDetailsService.deleteSchoolBranchDetail(schoolBranchDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'School branch detail deleted successfully',
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

// Fetch school branch detail records
const FETCH_SCHOOL_BRANCH_DETAILS = async (req, res) => {
    try {
        const result = await schoolBranchDetailsService.fetchSchoolBranchDetails(req.query);
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
    ADD_SCHOOL_BRANCH_DETAIL,
    UPDATE_SCHOOL_BRANCH_DETAIL,
    DELETE_SCHOOL_BRANCH_DETAIL,
    FETCH_SCHOOL_BRANCH_DETAILS
};
