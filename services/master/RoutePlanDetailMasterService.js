const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class RoutePlanDetailMasterService {
    
    // Create a new route plan detail record
    async createRoutePlanDetail(data) {
        try {
            const detail = await db.RoutePlanDetailMaster.create({
                RoutePlanID: data.RoutePlanID,  // updated to match schema
                ClassID: data.ClassID,          // updated to match schema
            });
            return detail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create route plan detail record: " + error);
        }
    }

    // Update an existing route plan detail record by RoutePlanDetailID
    async updateRoutePlanDetail(detailId, data) {
        try {
            const updatedDetail = await db.RoutePlanDetailMaster.update({
                RoutePlanID: data.RoutePlanID,  // updated to match schema
                ClassID: data.ClassID,          // updated to match schema
            }, {
                where: { RoutePlanDetailID: detailId }  // updated to match schema
            });

            if (updatedDetail[0] === 0) {
                throw new Error("Route plan detail record not found or no changes made");
            }

            return "Route plan detail record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update route plan detail record: " + error);
        }
    }

    // Delete a route plan detail record by RoutePlanDetailID
    async deleteRoutePlanDetail(detailId) {
        try {
            const deleted = await db.RoutePlanDetailMaster.destroy({
                where: { RoutePlanDetailID: detailId }  // updated to match schema
            });

            if (deleted === 0) {
                throw new Error("Route plan detail record not found");
            }

            return "Route plan detail record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete route plan detail record: " + error);
        }
    }

    // Fetch route plan detail records with optional search, sorting, and pagination
    async fetchRoutePlanDetails(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["RoutePlanDetailID", "ASC"]];  // updated to match schema

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.RoutePlanDetailMaster.findAndCountAll({
                where,
                offset,
                limit: parseInt(limit) || Helper.getPageNumber(1, limit), // Default limit if undefined
                order
            });

            return {
                data: {
                    pagination: {
                        currentPage: parseInt(page),
                        pageSize: parseInt(limit) || Helper.getPageNumber(1, limit),
                        totalPages: Math.ceil(count / (parseInt(limit) || Helper.getPageNumber(1, limit))),
                        totalResults: count,
                    },
                    data: rows,
                },
            };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to retrieve route plan detail records");
        }
    }
}

module.exports = RoutePlanDetailMasterService;
