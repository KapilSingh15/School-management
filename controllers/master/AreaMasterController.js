const AreaMasterService = require("../../services/master/AreaMasterService");
const areaMasterService = new AreaMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new area
const ADD_AREA = async (req, res) => {
    try {
        await areaMasterService.createArea(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Area added successfully',
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

// Update an existing area
const UPDATE_AREA = async (req, res) => {
    const { areaId } = req.params; // Assuming areaId is passed as a route parameter
    try {
        await areaMasterService.updateArea(areaId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Area updated successfully',
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

// Delete an area
const DELETE_AREA = async (req, res) => {
    const { areaId } = req.params; // Assuming areaId is passed as a route parameter
    try {
        await areaMasterService.deleteArea(areaId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Area deleted successfully',
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

// Fetch areas
const FETCH_AREAS = async (req, res) => {
    try {
        const result = await areaMasterService.fetchAreas(req.query);
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
    ADD_AREA,
    UPDATE_AREA,
    DELETE_AREA,
    FETCH_AREAS
};
