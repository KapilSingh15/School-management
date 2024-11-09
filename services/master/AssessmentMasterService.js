const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class AssessmentMasterService {
    
    // Create a new assessment
    async createAssessment(data) {
        try {
            const assessment = await db.AssessmentMaster.create({
                Assessment: data.Assessment,
                StatusID: data.StatusID
            });
            return assessment;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create assessment: " + error);
        }
    }

    // Update an existing assessment by AssessmentID
    async updateAssessment(assessmentId, data) {
        try {
            const updatedAssessment = await db.AssessmentMaster.update({
                Assessment: data.Assessment,
                StatusID: data.StatusID
            }, {
                where: {
                    AssessmentID: assessmentId
                }
            });

            if (updatedAssessment[0] === 0) {
                throw new Error("Assessment not found or no changes made");
            }

            return "Assessment updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update assessment: " + error);
        }
    }

    // Delete an assessment by AssessmentID
    async deleteAssessment(assessmentId) {
        try {
            const deleted = await db.AssessmentMaster.destroy({
                where: {
                    AssessmentID: assessmentId
                }
            });

            if (deleted === 0) {
                throw new Error("Assessment not found");
            }

            return "Assessment deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete assessment: " + error);
        }
    }

    // Fetch assessments with optional search, sorting, and pagination
    async fetchAssessments(query) {
        const { searchBy, searchValue, status, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            
            // Calculate offset using Helper.getPageNumber
            const offset = Helper.getPageNumber(page, limit);
            
            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Status filter
            if (status) {
                where.StatusID = { [Op.eq]: status };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["AssessmentID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.AssessmentMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve assessments");
        }
    }
}

module.exports = AssessmentMasterService;
