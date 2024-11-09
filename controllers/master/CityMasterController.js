const CityMasterService = require("../../services/master/CityMasterService");
const cityMasterService = new CityMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new city record
const ADD_CITY = async (req, res) => {
    try {
        await cityMasterService.createCity(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'City added successfully',
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

// Update an existing city record
const UPDATE_CITY = async (req, res) => {
    const { cityId } = req.params; // Assuming cityId is passed as a route parameter
    try {
        await cityMasterService.updateCity(cityId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'City updated successfully',
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

// Delete a city record
const DELETE_CITY = async (req, res) => {
    const { cityId } = req.params; // Assuming cityId is passed as a route parameter
    try {
        await cityMasterService.deleteCity(cityId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'City deleted successfully',
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

// Fetch city records
const FETCH_CITIES = async (req, res) => {
    try {
        const result = await cityMasterService.fetchCities(req.query);
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
    ADD_CITY,
    UPDATE_CITY,
    DELETE_CITY,
    FETCH_CITIES
};
