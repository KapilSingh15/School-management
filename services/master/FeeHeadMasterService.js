const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeeHeadMasterService {
    
    // Create a new fee head record
    async createFeeHead(data) {
        try {
            const feeHead = await db.FeeHeadMaster.create({
                FeeHeadName: data.FeeHeadName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return feeHead;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create fee head record: " + error);
        }
    }

    // Update an existing fee head record by FeeHeadID
    async updateFeeHead(feeHeadId, data) {
        try {
            const updatedFeeHead = await db.FeeHeadMaster.update({
                FeeHeadName: data.FeeHeadName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { FeeHeadID: feeHeadId }
            });

            if (updatedFeeHead[0] === 0) {
                throw new Error("Fee head record not found or no changes made");
            }

            return "Fee head record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update fee head record: " + error);
        }
    }

    // Delete a fee head record by FeeHeadID
    async deleteFeeHead(feeHeadId) {
        try {
            const deleted = await db.FeeHeadMaster.destroy({
                where: { FeeHeadID: feeHeadId }
            });

            if (deleted === 0) {
                throw new Error("Fee head record not found");
            }

            return "Fee head record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete fee head record: " + error);
        }
    }

    // Fetch fee head records with optional search, sorting, and pagination
    async fetchFeeHeads(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["FeeHeadID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeeHeadMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve fee head records");
        }
    }
}

module.exports = FeeHeadMasterService;
