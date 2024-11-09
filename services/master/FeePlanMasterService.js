const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeePlanMasterService {
    
    // Create a new fee plan record
    async createFeePlan(data) {
        try {
            const feePlan = await db.FeePlanMaster.create({
                PlanName: data.PlanName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return feePlan;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create fee plan record: " + error);
        }
    }

    // Update an existing fee plan record by FeePlanID
    async updateFeePlan(feePlanId, data) {
        try {
            const updatedFeePlan = await db.FeePlanMaster.update({
                PlanName: data.PlanName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { FeePlanID: feePlanId }
            });

            if (updatedFeePlan[0] === 0) {
                throw new Error("Fee plan record not found or no changes made");
            }

            return "Fee plan record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update fee plan record: " + error);
        }
    }

    // Delete a fee plan record by FeePlanID
    async deleteFeePlan(feePlanId) {
        try {
            const deleted = await db.FeePlanMaster.destroy({
                where: { FeePlanID: feePlanId }
            });

            if (deleted === 0) {
                throw new Error("Fee plan record not found");
            }

            return "Fee plan record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete fee plan record: " + error);
        }
    }

    // Fetch fee plan records with optional search, sorting, and pagination
    async fetchFeePlans(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["FeePlanID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeePlanMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve fee plan records");
        }
    }
}

module.exports = FeePlanMasterService;
