const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class GradeMasterService {
    
    // Create a new grade record
    async createGrade(data) {
        try {
            const grade = await db.GradeMaster.create({
                GradeName: data.GradeName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return grade;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create grade record: " + error);
        }
    }

    // Update an existing grade record by GradeID
    async updateGrade(gradeId, data) {
        try {
            const updatedGrade = await db.GradeMaster.update({
                GradeName: data.GradeName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { GradeID: gradeId }
            });

            if (updatedGrade[0] === 0) {
                throw new Error("Grade record not found or no changes made");
            }

            return "Grade record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update grade record: " + error);
        }
    }

    // Delete a grade record by GradeID
    async deleteGrade(gradeId) {
        try {
            const deleted = await db.GradeMaster.destroy({
                where: { GradeID: gradeId }
            });

            if (deleted === 0) {
                throw new Error("Grade record not found");
            }

            return "Grade record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete grade record: " + error);
        }
    }

    // Fetch grade records with optional search, sorting, and pagination
    async fetchGrades(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["GradeID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.GradeMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve grade records");
        }
    }
}

module.exports = GradeMasterService;
