const SchoolDetailService = require("../../services/master/schoolDetailService");
const schoolDetailService = new SchoolDetailService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new school
const ADD_SCHOOL = async (req, res) => {
    try {
        await schoolDetailService.createScool(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'School added successfully',
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

// Update an existing school
const UPDATE_SCHOOL = async (req, res) => {
    const { schoolId } = req.params; // Assuming schoolId is passed as a route parameter
    try {
        await schoolDetailService.updateSchool(schoolId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'School updated successfully',
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

// Delete a school
const DELETE_SCHOOL = async (req, res) => {
    const { schoolId } = req.params; // Assuming schoolId is passed as a route parameter
    try {
        await schoolDetailService.deleteSchool(schoolId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'School deleted successfully',
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

// Fetch schools
const FETCH_SCHOOLS = async (req, res) => {
    try {
        const result = await schoolDetailService.fetchSchools(req.query);
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
    ADD_SCHOOL,
    UPDATE_SCHOOL,
    DELETE_SCHOOL,
    FETCH_SCHOOLS
};
