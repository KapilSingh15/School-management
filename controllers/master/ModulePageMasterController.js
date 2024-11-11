const ModulePageMasterService = require("../../services/master/ModulePageMasterService");
const modulePageMasterService = new ModulePageMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new module page record
const ADD_MODULE_PAGE = async (req, res) => {
    try {
        await modulePageMasterService.createModulePage(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Module page added successfully',
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

// Update an existing module page record
const UPDATE_MODULE_PAGE = async (req, res) => {
    const { modulePageId } = req.params; // Assuming modulePageId is passed as a route parameter
    try {
        await modulePageMasterService.updateModulePage(modulePageId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Module page updated successfully',
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

// Delete a module page record
const DELETE_MODULE_PAGE = async (req, res) => {
    const { modulePageId } = req.params; // Assuming modulePageId is passed as a route parameter
    try {
        await modulePageMasterService.deleteModulePage(modulePageId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Module page deleted successfully',
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

// Fetch module page records
const FETCH_MODULE_PAGES = async (req, res) => {
    try {
        const result = await modulePageMasterService.fetchModulePages(req.query);
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
    ADD_MODULE_PAGE,
    UPDATE_MODULE_PAGE,
    DELETE_MODULE_PAGE,
    FETCH_MODULE_PAGES
};
