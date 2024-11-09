const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeeReceiptConcessionDetailsService {
    
    // Create a new concession detail record
    async createConcessionDetail(data) {
        try {
            const concessionDetail = await db.FeeReceiptConcessionDetails.create({
                FeeReceiptID: data.FeeReceiptID,
                ConcessionAmount: data.ConcessionAmount,
                Reason: data.Reason,
                StatusID: data.StatusID
            });
            return concessionDetail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create concession detail record: " + error);
        }
    }

    // Update an existing concession detail record by ConcessionID
    async updateConcessionDetail(concessionId, data) {
        try {
            const updatedConcessionDetail = await db.FeeReceiptConcessionDetails.update({
                FeeReceiptID: data.FeeReceiptID,
                ConcessionAmount: data.ConcessionAmount,
                Reason: data.Reason,
                StatusID: data.StatusID
            }, {
                where: { ConcessionID: concessionId }
            });

            if (updatedConcessionDetail[0] === 0) {
                throw new Error("Concession detail record not found or no changes made");
            }

            return "Concession detail record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update concession detail record: " + error);
        }
    }

    // Delete a concession detail record by ConcessionID
    async deleteConcessionDetail(concessionId) {
        try {
            const deleted = await db.FeeReceiptConcessionDetails.destroy({
                where: { ConcessionID: concessionId }
            });

            if (deleted === 0) {
                throw new Error("Concession detail record not found");
            }

            return "Concession detail record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete concession detail record: " + error);
        }
    }

    // Fetch concession detail records with optional search, sorting, and pagination
    async fetchConcessionDetails(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ConcessionID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeeReceiptConcessionDetails.findAndCountAll({
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
            throw new Error("Failed to retrieve concession detail records");
        }
    }
}

module.exports = FeeReceiptConcessionDetailsService;
