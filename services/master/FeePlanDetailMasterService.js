const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeePlanDetailMasterService {
    
    // Create a new fee plan detail record
    async createFeePlanDetail(data) {
        try {
            const feePlanDetail = await db.FeePlanDetailMaster.create({
                FeePlanID: data.FeePlanID,
                FeeHeadID: data.FeeHeadID,
                Amount: data.Amount,
                DueDate: data.DueDate,
                StatusID: data.StatusID
            });
            return feePlanDetail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create fee plan detail record: " + error);
        }
    }

    // Update an existing fee plan detail record by FeePlanDetailID
    async updateFeePlanDetail(feePlanDetailId, data) {
        try {
            const updatedFeePlanDetail = await db.FeePlanDetailMaster.update({
                FeePlanID: data.FeePlanID,
                FeeHeadID: data.FeeHeadID,
                Amount: data.Amount,
                DueDate: data.DueDate,
                StatusID: data.StatusID
            }, {
                where: { FeePlanDetailID: feePlanDetailId }
            });

            if (updatedFeePlanDetail[0] === 0) {
                throw new Error("Fee plan detail record not found or no changes made");
            }

            return "Fee plan detail record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update fee plan detail record: " + error);
        }
    }

    // Delete a fee plan detail record by FeePlanDetailID
    async deleteFeePlanDetail(feePlanDetailId) {
        try {
            const deleted = await db.FeePlanDetailMaster.destroy({
                where: { FeePlanDetailID: feePlanDetailId }
            });

            if (deleted === 0) {
                throw new Error("Fee plan detail record not found");
            }

            return "Fee plan detail record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete fee plan detail record: " + error);
        }
    }

    // Fetch fee plan detail records with optional search, sorting, and pagination
    async fetchFeePlanDetails(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["FeePlanDetailID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeePlanDetailMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve fee plan detail records");
        }
    }
}

module.exports = FeePlanDetailMasterService;
