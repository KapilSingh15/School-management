const CountryMasterService = require("../../services/master/CountryMasterService");
const countryMasterService = new CountryMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new country record
const ADD_COUNTRY = async (req, res) => {
    try {
        await countryMasterService.createCountry(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Country added successfully',
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

// Update an existing country record
const UPDATE_COUNTRY = async (req, res) => {
    const { countryId } = req.params; // Assuming countryId is passed as a route parameter
    try {
        await countryMasterService.updateCountry(countryId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Country updated successfully',
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

// Delete a country record
const DELETE_COUNTRY = async (req, res) => {
    const { countryId } = req.params; // Assuming countryId is passed as a route parameter
    try {
        await countryMasterService.deleteCountry(countryId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Country deleted successfully',
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

// Fetch country records
const FETCH_COUNTRIES = async (req, res) => {
    try {
        const result = await countryMasterService.fetchCountries(req.query);
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
    ADD_COUNTRY,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
    FETCH_COUNTRIES
};
