const SmsGatewayDetailService = require("../../services/master/SmsGatewayDetailService");
const smsGatewayDetailService = new SmsGatewayDetailService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new SMS gateway detail record
const ADD_SMS_GATEWAY_DETAIL = async (req, res) => {
    try {
        await smsGatewayDetailService.createSmsGatewayDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'SMS Gateway detail added successfully',
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

// Update an existing SMS gateway detail record
const UPDATE_SMS_GATEWAY_DETAIL = async (req, res) => {
    const { smsGatewayDetailId } = req.params; // Assuming smsGatewayDetailId is passed as a route parameter
    try {
        await smsGatewayDetailService.updateSmsGatewayDetail(smsGatewayDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'SMS Gateway detail updated successfully',
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

// Delete an SMS gateway detail record
const DELETE_SMS_GATEWAY_DETAIL = async (req, res) => {
    const { smsGatewayDetailId } = req.params; // Assuming smsGatewayDetailId is passed as a route parameter
    try {
        await smsGatewayDetailService.deleteSmsGatewayDetail(smsGatewayDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'SMS Gateway detail deleted successfully',
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

// Fetch SMS gateway detail records
const FETCH_SMS_GATEWAY_DETAILS = async (req, res) => {
    try {
        const result = await smsGatewayDetailService.fetchSmsGatewayDetails(req.query);
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
    ADD_SMS_GATEWAY_DETAIL,
    UPDATE_SMS_GATEWAY_DETAIL,
    DELETE_SMS_GATEWAY_DETAIL,
    FETCH_SMS_GATEWAY_DETAILS
};
