const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StudentOptionalSubjectMasterService {
    
    // Create a new optional subject record for a student
    async createSubject(data) {
        try {
            const subject = await db.StudentOptionalSubjectMaster.create({
                StudentID: data.StudentID,
                SubjectName: data.SubjectName,
                StatusID: data.StatusID
            });
            return subject;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create optional subject record: " + error);
        }
    }

    // Update an existing optional subject record by SubjectID
    async updateSubject(subjectId, data) {
        try {
            const updatedSubject = await db.StudentOptionalSubjectMaster.update({
                StudentID: data.StudentID,
                SubjectName: data.SubjectName,
                StatusID: data.StatusID
            }, {
                where: { SubjectID: subjectId }
            });

            if (updatedSubject[0] === 0) {
                throw new Error("Optional subject record not found or no changes made");
            }

            return "Optional subject record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update optional subject record: " + error);
        }
    }

    // Delete an optional subject record by SubjectID
    async deleteSubject(subjectId) {
        try {
            const deleted = await db.StudentOptionalSubjectMaster.destroy({
                where: { SubjectID: subjectId }
            });

            if (deleted === 0) {
                throw new Error("Optional subject record not found");
            }

            return "Optional subject record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete optional subject record: " + error);
        }
    }

    // Fetch optional subject records with optional search, sorting, and pagination
    async fetchSubjects(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["SubjectID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.StudentOptionalSubjectMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve optional subject records");
        }
    }
}

module.exports = StudentOptionalSubjectMasterService;
