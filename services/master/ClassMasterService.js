const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ClassMasterService {
    
    // Create a new class
    async createClass(data) {
        try {
            const classRecord = await db.ClassMaster.create({
                ClassName: data.ClassName,
                StatusID: data.StatusID
            });
            return classRecord;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create class: " + error);
        }
    }

    // Update an existing class by ClassID
    async updateClass(classId, data) {
        try {
            const updatedClass = await db.ClassMaster.update({
                ClassName: data.ClassName,
                StatusID: data.StatusID
            }, {
                where: { ClassID: classId }
            });

            if (updatedClass[0] === 0) {
                throw new Error("Class not found or no changes made");
            }

            return "Class updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update class: " + error);
        }
    }

    // Delete a class by ClassID
    async deleteClass(classId) {
        try {
            const deleted = await db.ClassMaster.destroy({
                where: { ClassID: classId }
            });

            if (deleted === 0) {
                throw new Error("Class not found");
            }

            return "Class deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete class: " + error);
        }
    }

    // Fetch classes with optional search, sorting, and pagination
    async fetchClasses(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);
            
            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ClassID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ClassMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve classes");
        }
    }
}

module.exports = ClassMasterService;
