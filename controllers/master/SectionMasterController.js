const SectionMasterService = require("../../services/master/SectionMasterService");
const sectionMasterService = new SectionMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new section record
const ADD_SECTION = async (req, res) => {
    try {
        await sectionMasterService.createSection(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Section added successfully',
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

// Update an existing section record
const UPDATE_SECTION = async (req, res) => {
    const { sectionId } = req.params; // Assuming sectionId is passed as a route parameter
    try {
        await sectionMasterService.updateSection(sectionId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Section updated successfully',
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

// Delete a section record
const DELETE_SECTION = async (req, res) => {
    const { sectionId } = req.params; // Assuming sectionId is passed as a route parameter
    try {
        await sectionMasterService.deleteSection(sectionId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Section deleted successfully',
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

// Fetch section records
const FETCH_SECTIONS = async (req, res) => {
    try {
        const result = await sectionMasterService.fetchSections(req.query);
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
    ADD_SECTION,
    UPDATE_SECTION,
    DELETE_SECTION,
    FETCH_SECTIONS
};
