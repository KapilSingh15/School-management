const db = require("../../model");
const { Op } = require("sequelize");

class StudentTypeMasterService {
    
    // Create a new student type record
    async createStudentType(data) {
        try {
            const studentType = await db.StudentTypeMaster.create({
                StudentType: data.StudentType
            });
            return studentType;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create student type: " + error);
        }
    }

    // Update an existing student type record by StudentTypeID
    async updateStudentType(studentTypeId, data) {
        try {
            const updatedStudentType = await db.StudentTypeMaster.update({
                StudentType: data.StudentType
            }, {
                where: { StudentTypeID: studentTypeId }
            });
            return updatedStudentType;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update student type: " + error);
        }
    }

    // Delete a student type record by StudentTypeID
    async deleteStudentType(studentTypeId) {
        try {
            const deletedStudentType = await db.StudentTypeMaster.destroy({
                where: { StudentTypeID: studentTypeId }
            });
            return deletedStudentType;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete student type: " + error);
        }
    }

    // Fetch all student type records with optional filtering
    async fetchStudentTypes(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;
        try {
            let where = {};
            const offset = (page - 1) * limit;

            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StudentTypeID", "ASC"]];
            const { count, rows } = await db.StudentTypeMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve student types: " + error);
        }
    }
}

module.exports = StudentTypeMasterService;
