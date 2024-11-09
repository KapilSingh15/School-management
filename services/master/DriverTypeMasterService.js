const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class DriverTypeMasterService {
    
    // Create a new driver type
    async createDriverType(data) {
        try {
            const driverType = await db.DriverTypeMaster.create({
                DriverTypeName: data.DriverTypeName,
                StatusID: data.StatusID
            });
            return driverType;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create driver type: " + error);
        }
    }

    // Update an existing driver type by DriverTypeID
    async updateDriverType(driverTypeId, data) {
        try {
            const updatedDriverType = await db.DriverTypeMaster.update({
                DriverTypeName: data.DriverTypeName,
                StatusID: data.StatusID
            }, {
                where: { DriverTypeID: driverTypeId }
            });

            if (updatedDriverType[0] === 0) {
                throw new Error("Driver type not found or no changes made");
            }

            return "Driver type updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update driver type: " + error);
        }
    }

    // Delete a driver type by DriverTypeID
    async deleteDriverType(driverTypeId) {
        try {
            const deleted = await db.DriverTypeMaster.destroy({
                where: { DriverTypeID: driverTypeId }
            });

            if (deleted === 0) {
                throw new Error("Driver type not found");
            }

            return "Driver type deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete driver type: " + error);
        }
    }

    // Fetch driver types with optional search, sorting, and pagination
    async fetchDriverTypes(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["DriverTypeID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.DriverTypeMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve driver types");
        }
    }
}

module.exports = DriverTypeMasterService;
