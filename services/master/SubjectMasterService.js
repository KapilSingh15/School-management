const db = require("../../model");
const { Op } = require("sequelize");

class SubjectMasterService {
    
    // Create a new subject record
    async createSubject(data) {
        try {
            const subject = await db.SubjectMaster.create({
                BranchID: data.BranchID,
                SubjectName: data.SubjectName,
                IsOptional: data.IsOptional,
                StatusID: data.StatusID
            });
            return subject;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create subject: " + error);
        }
    }

    // Update an existing subject record by SubjectID
    async updateSubject(subjectId, data) {
        try {
            const updatedSubject = await db.SubjectMaster.update({
                BranchID: data.BranchID,
                SubjectName: data.SubjectName,
                IsOptional: data.IsOptional,
                StatusID: data.StatusID
            }, {
                where: { SubjectID: subjectId }
            });
            return updatedSubject;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update subject: " + error);
        }
    }

    // Delete a subject record by SubjectID
    async deleteSubject(subjectId) {
        try {
            const deletedSubject = await db.SubjectMaster.destroy({
                where: { SubjectID: subjectId }
            });
            return deletedSubject;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete subject: " + error);
        }
    }

    // Fetch all subject records with optional filtering
    async fetchSubjects(query) {
        const { searchBy, searchValue, status, sortby, sortCode, page, limit } = query;
        try {
            let where = {};
            const offset = (page - 1) * limit;

            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }
            if (status) {
                where.StatusID = { [Op.eq]: status };
            }

            const order = sortby && sortCode ? [[sortby, sortCode]] : [["SubjectID", "ASC"]];
            const { count, rows } = await db.SubjectMaster.findAndCountAll({
                where,
                offset: parseInt(offset),
                limit: parseInt(limit),
                order
            });
            return {
                data: {
                    pagination: {
                        currentPage: parseInt(page),
                        pageSize: parseInt(limit),
                        totalPages: Math.ceil(count / limit),
                        totalResults: count,
                    },
                    data: rows,
                },
            };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to retrieve subjects: " + error);
        }
    }
}

module.exports = SubjectMasterService;
