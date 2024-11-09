const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class RegistrationTypeMasterService {
    
    // Create a new registration type record
    async createRegistrationType(data) {
        try {
            const registrationType = await db.RegistrationTypeMaster.create({
                TypeName: data.TypeName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return registrationType;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create registration type record: " + error);
        }
    }

    // Update an existing registration type record by TypeID
    async updateRegistrationType(typeId, data) {
        try {
            const updatedRegistrationType = await db.RegistrationTypeMaster.update({
                TypeName: data.TypeName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { TypeID: typeId }
            });

            if (updatedRegistrationType[0] === 0) {
                throw new Error("Registration type record not found or no changes made");
            }

            return "Registration type record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update registration type record: " + error);
        }
    }

    // Delete a registration type record by TypeID
    async deleteRegistrationType(typeId) {
        try {
            const deleted = await db.RegistrationTypeMaster.destroy({
                where: { TypeID: typeId }
            });

            if (deleted === 0) {
                throw new Error("Registration type record not found");
            }

            return "Registration type record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete registration type record: " + error);
        }
    }

    // Fetch registration type records with optional search, sorting, and pagination
    async fetchRegistrationTypes(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["TypeID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.RegistrationTypeMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve registration type records");
        }
    }
}

module.exports = RegistrationTypeMasterService;
