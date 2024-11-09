const FinancialYearMasterService = require("../../services/master/FinancialYearMasterService");
const financialYearMasterService = new FinancialYearMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new financial year record
const ADD_FINANCIAL_YEAR = async (req, res) => {
    try {
        await financialYearMasterService.createFinancialYear(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Financial year added successfully',
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

// Update an existing financial year record
const UPDATE_FINANCIAL_YEAR = async (req, res) => {
    const { financialYearId } = req.params; // Assuming financialYearId is passed as a route parameter
    try {
        await financialYearMasterService.updateFinancialYear(financialYearId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Financial year updated successfully',
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

// Delete a financial year record
const DELETE_FINANCIAL_YEAR = async (req, res) => {
    const { financialYearId } = req.params; // Assuming financialYearId is passed as a route parameter
    try {
        await financialYearMasterService.deleteFinancialYear(financialYearId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Financial year deleted successfully',
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

// Fetch financial year records
const FETCH_FINANCIAL_YEARS = async (req, res) => {
    try {
        const result = await financialYearMasterService.fetchFinancialYears(req.query);
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
    ADD_FINANCIAL_YEAR,
    UPDATE_FINANCIAL_YEAR,
    DELETE_FINANCIAL_YEAR,
    FETCH_FINANCIAL_YEARS
};
