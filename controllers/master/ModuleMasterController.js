const ModuleMasterService = require("../../services/master/ModuleMasterService");
const moduleMasterService = new ModuleMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new module record
const ADD_MODULE = async (req, res) => {
    try {
        await moduleMasterService.createModule(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Module added successfully',
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

// Update an existing module record
const UPDATE_MODULE = async (req, res) => {
    const { moduleId } = req.params; // Assuming moduleId is passed as a route parameter
    try {
        await moduleMasterService.updateModule(moduleId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Module updated successfully',
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

// Delete a module record
const DELETE_MODULE = async (req, res) => {
    const { moduleId } = req.params; // Assuming moduleId is passed as a route parameter
    try {
        await moduleMasterService.deleteModule(moduleId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Module deleted successfully',
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

// Fetch module records
const FETCH_MODULES = async (req, res) => {
    try {
        const result = await moduleMasterService.fetchModules(req.query);
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
    ADD_MODULE,
    UPDATE_MODULE,
    DELETE_MODULE,
    FETCH_MODULES
};
