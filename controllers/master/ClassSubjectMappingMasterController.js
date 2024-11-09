const ClassSubjectMappingMasterService = require("../../services/master/ClassSubjectMappingMasterService");
const classSubjectMappingMasterService = new ClassSubjectMappingMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new class-subject mapping record
const ADD_CLASS_SUBJECT_MAPPING = async (req, res) => {
    try {
        await classSubjectMappingMasterService.createClassSubjectMapping(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Class-Subject mapping added successfully',
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

// Update an existing class-subject mapping record
const UPDATE_CLASS_SUBJECT_MAPPING = async (req, res) => {
    const { mappingId } = req.params; // Assuming mappingId is passed as a route parameter
    try {
        await classSubjectMappingMasterService.updateClassSubjectMapping(mappingId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Class-Subject mapping updated successfully',
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

// Delete a class-subject mapping record
const DELETE_CLASS_SUBJECT_MAPPING = async (req, res) => {
    const { mappingId } = req.params; // Assuming mappingId is passed as a route parameter
    try {
        await classSubjectMappingMasterService.deleteClassSubjectMapping(mappingId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Class-Subject mapping deleted successfully',
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

// Fetch class-subject mapping records
const FETCH_CLASS_SUBJECT_MAPPINGS = async (req, res) => {
    try {
        const result = await classSubjectMappingMasterService.fetchClassSubjectMappings(req.query);
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
    ADD_CLASS_SUBJECT_MAPPING,
    UPDATE_CLASS_SUBJECT_MAPPING,
    DELETE_CLASS_SUBJECT_MAPPING,
    FETCH_CLASS_SUBJECT_MAPPINGS
};
