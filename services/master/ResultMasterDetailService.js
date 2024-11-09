const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ResultMasterDetailService {
    
    // Create a new result master detail record
    async createResultMasterDetail(data) {
        try {
            const detail = await db.ResultMasterDetail.create({
                ResultID: data.ResultID,
                StudentID: data.StudentID,
                SubjectID: data.SubjectID,
                MarksObtained: data.MarksObtained,
                StatusID: data.StatusID
            });
            return detail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create result master detail record: " + error);
        }
    }

    // Update an existing result master detail record by DetailID
    async updateResultMasterDetail(detailId, data) {
        try {
            const updatedDetail = await db.ResultMasterDetail.update({
                ResultID: data.ResultID,
                StudentID: data.StudentID,
                SubjectID: data.SubjectID,
                MarksObtained: data.MarksObtained,
                StatusID: data.StatusID
            }, {
                where: { DetailID: detailId }
            });

            if (updatedDetail[0] === 0) {
                throw new Error("Result master detail record not found or no changes made");
            }

            return "Result master detail record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update result master detail record: " + error);
        }
    }

    // Delete a result master detail record by DetailID
    async deleteResultMasterDetail(detailId) {
        try {
            const deleted = await db.ResultMasterDetail.destroy({
                where: { DetailID: detailId }
            });

            if (deleted === 0) {
                throw new Error("Result master detail record not found");
            }

            return "Result master detail record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete result master detail record: " + error);
        }
    }

    // Fetch result master detail records with optional search, sorting, and pagination
    async fetchResultMasterDetails(query) {
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
            const { count, rows } = await db.ResultMasterDetail.findAndCountAll({
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
            throw new Error("Failed to retrieve result master detail records");
        }
    }
}

module.exports = ResultMasterDetailService;
