const BloodGroupMasterService = require("../../services/master/BloodGroupMasterService");
const bloodGroupMasterService = new BloodGroupMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new blood group record
const ADD_BLOOD_GROUP = async (req, res) => {
    try {
        await bloodGroupMasterService.createBloodGroup(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Blood group added successfully',
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

// Update an existing blood group record
const UPDATE_BLOOD_GROUP = async (req, res) => {
    const { bloodGroupId } = req.params; // Assuming bloodGroupId is passed as a route parameter
    try {
        await bloodGroupMasterService.updateBloodGroup(bloodGroupId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Blood group updated successfully',
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

// Delete a blood group record
const DELETE_BLOOD_GROUP = async (req, res) => {
    const { bloodGroupId } = req.params; // Assuming bloodGroupId is passed as a route parameter
    try {
        await bloodGroupMasterService.deleteBloodGroup(bloodGroupId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Blood group deleted successfully',
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

// Fetch blood group records
const FETCH_BLOOD_GROUPS = async (req, res) => {
    try {
        const result = await bloodGroupMasterService.fetchBloodGroups(req.query);
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
    ADD_BLOOD_GROUP,
    UPDATE_BLOOD_GROUP,
    DELETE_BLOOD_GROUP,
    FETCH_BLOOD_GROUPS
};
