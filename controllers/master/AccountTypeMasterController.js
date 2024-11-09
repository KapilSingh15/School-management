const AccountTypeMasterService = require("../../services/master/AccountTypeMasterService");
const accountTypeMasterService = new AccountTypeMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new account types
const ADD_ACCOUNT_TYPE = async (req, res) => {
    try {
        await accountTypeMasterService.createAccountType(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Account type added successfully',
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

// Update an existing account type
const UPDATE_ACCOUNT_TYPE = async (req, res) => {
    const { accountTypeId } = req.params; // Assuming accountTypeId is passed as a route parameter
    try {
        await accountTypeMasterService.updateAccountType(accountTypeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Account type updated successfully',
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

// Delete an account type
const DELETE_ACCOUNT_TYPE = async (req, res) => {
    const { accountTypeId } = req.params; // Assuming accountTypeId is passed as a route parameter
    try {
        await accountTypeMasterService.deleteAccountType(accountTypeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Account type deleted successfully',
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

// Fetch account types
const FETCH_ACCOUNT_TYPES = async (req, res) => {
    try {
        const result = await accountTypeMasterService.fetchAccountTypes(req.query);
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
    ADD_ACCOUNT_TYPE,
    UPDATE_ACCOUNT_TYPE,
    DELETE_ACCOUNT_TYPE,
    FETCH_ACCOUNT_TYPES
};
