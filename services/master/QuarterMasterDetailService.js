const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class QuarterMasterDetailService {
    
    // Create a new quarter master detail record
    async createQuarterMasterDetail(data) {
        try {
            const detail = await db.QuarterMasterDetail.create({
                QuarterID: data.QuarterID,
                Year: data.Year,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                StatusID: data.StatusID
            });
            return detail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create quarter master detail record: " + error);
        }
    }

    // Update an existing quarter master detail record by DetailID
    async updateQuarterMasterDetail(detailId, data) {
        try {
            const updatedDetail = await db.QuarterMasterDetail.update({
                QuarterID: data.QuarterID,
                Year: data.Year,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                StatusID: data.StatusID
            }, {
                where: { DetailID: detailId }
            });

            if (updatedDetail[0] === 0) {
                throw new Error("Quarter master detail record not found or no changes made");
            }

            return "Quarter master detail record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update quarter master detail record: " + error);
        }
    }

    // Delete a quarter master detail record by DetailID
    async deleteQuarterMasterDetail(detailId) {
        try {
            const deleted = await db.QuarterMasterDetail.destroy({
                where: { DetailID: detailId }
            });

            if (deleted === 0) {
                throw new Error("Quarter master detail record not found");
            }

            return "Quarter master detail record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete quarter master detail record: " + error);
        }
    }

    // Fetch quarter master detail records with optional search, sorting, and pagination
    async fetchQuarterMasterDetails(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["DetailID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.QuarterMasterDetail.findAndCountAll({
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
            throw new Error("Failed to retrieve quarter master detail records");
        }
    }
}

module.exports = QuarterMasterDetailService;
