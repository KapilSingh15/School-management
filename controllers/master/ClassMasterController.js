const ClassMasterService = require("../../services/master/ClassMasterService");
const classMasterService = new ClassMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new class record
const ADD_CLASS = async (req, res) => {
    try {
        await classMasterService.createClass(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Class added successfully',
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

// Update an existing class record
const UPDATE_CLASS = async (req, res) => {
    const { classId } = req.params; // Assuming classId is passed as a route parameter
    try {
        await classMasterService.updateClass(classId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Class updated successfully',
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

// Delete a class record
const DELETE_CLASS = async (req, res) => {
    const { classId } = req.params; // Assuming classId is passed as a route parameter
    try {
        await classMasterService.deleteClass(classId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Class deleted successfully',
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

// Fetch class records
const FETCH_CLASSES = async (req, res) => {
    try {
        const result = await classMasterService.fetchClasses(req.query);
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
    ADD_CLASS,
    UPDATE_CLASS,
    DELETE_CLASS,
    FETCH_CLASSES
};
