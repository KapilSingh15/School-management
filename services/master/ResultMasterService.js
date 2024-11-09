const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ResultMasterService {
    
    // Create a new result record
    async createResult(data) {
        try {
            const result = await db.ResultMaster.create({
                StudentID: data.StudentID,
                SubjectID: data.SubjectID,
                MarksObtained: data.MarksObtained,
                TotalMarks: data.TotalMarks,
                StatusID: data.StatusID
            });
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create result record: " + error);
        }
    }

    // Update an existing result record by ResultID
    async updateResult(resultId, data) {
        try {
            const updatedResult = await db.ResultMaster.update({
                StudentID: data.StudentID,
                SubjectID: data.SubjectID,
                MarksObtained: data.MarksObtained,
                TotalMarks: data.TotalMarks,
                StatusID: data.StatusID
            }, {
                where: { ResultID: resultId }
            });

            if (updatedResult[0] === 0) {
                throw new Error("Result record not found or no changes made");
            }

            return "Result record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update result record: " + error);
        }
    }

    // Delete a result record by ResultID
    async deleteResult(resultId) {
        try {
            const deleted = await db.ResultMaster.destroy({
                where: { ResultID: resultId }
            });

            if (deleted === 0) {
                throw new Error("Result record not found");
            }

            return "Result record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete result record: " + error);
        }
    }

    // Fetch result records with optional search, sorting, and pagination
    async fetchResults(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ResultID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ResultMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve result records");
        }
    }
}

module.exports = ResultMasterService;
