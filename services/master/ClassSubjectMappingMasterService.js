const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ClassSubjectMappingMasterService {
    
    // Create a new class-subject mapping
    async createClassSubjectMapping(data) {
        try {
            const mapping = await db.ClassSubjectMappingMaster.create({
                ClassID: data.ClassID,
                SubjectID: data.SubjectID,
                StatusID: data.StatusID
            });
            return mapping;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create class-subject mapping: " + error);
        }
    }

    // Update an existing class-subject mapping by MappingID
    async updateClassSubjectMapping(mappingId, data) {
        try {
            const updatedMapping = await db.ClassSubjectMappingMaster.update({
                ClassID: data.ClassID,
                SubjectID: data.SubjectID,
                StatusID: data.StatusID
            }, {
                where: { MappingID: mappingId }
            });

            if (updatedMapping[0] === 0) {
                throw new Error("Class-subject mapping not found or no changes made");
            }

            return "Class-subject mapping updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update class-subject mapping: " + error);
        }
    }

    // Delete a class-subject mapping by MappingID
    async deleteClassSubjectMapping(mappingId) {
        try {
            const deleted = await db.ClassSubjectMappingMaster.destroy({
                where: { MappingID: mappingId }
            });

            if (deleted === 0) {
                throw new Error("Class-subject mapping not found");
            }

            return "Class-subject mapping deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete class-subject mapping: " + error);
        }
    }

    // Fetch class-subject mappings with optional search, sorting, and pagination
    async fetchClassSubjectMappings(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["MappingID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ClassSubjectMappingMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve class-subject mappings");
        }
    }
}

module.exports = ClassSubjectMappingMasterService;
