const TermMasterService = require("../../services/master/TermsMasterService");
const termMasterService = new TermMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new term record
const ADD_TERM = async (req, res) => {
    try {
        await termMasterService.createTerm(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Term added successfully',
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

// Update an existing term record
const UPDATE_TERM = async (req, res) => {
    const { termId } = req.params; // Assuming termId is passed as a route parameter
    try {
        await termMasterService.updateTerm(termId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Term updated successfully',
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

// Delete a term record
const DELETE_TERM = async (req, res) => {
    const { termId } = req.params; // Assuming termId is passed as a route parameter
    try {
        await termMasterService.deleteTerm(termId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Term deleted successfully',
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

// Fetch term records
const FETCH_TERMS = async (req, res) => {
    try {
        const result = await termMasterService.fetchTerms(req.query);
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
    ADD_TERM,
    UPDATE_TERM,
    DELETE_TERM,
    FETCH_TERMS
};
