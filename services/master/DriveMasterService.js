const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class DriveMasterService {
    
    // Create a new drive
    async createDrive(data) {
        try {
            const drive = await db.DriveMaster.create({
                DriveName: data.DriveName,
                DriveType: data.DriveType,
                StatusID: data.StatusID
            });
            return drive;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create drive: " + error);
        }
    }

    // Update an existing drive by DriveID
    async updateDrive(driveId, data) {
        try {
            const updatedDrive = await db.DriveMaster.update({
                DriveName: data.DriveName,
                DriveType: data.DriveType,
                StatusID: data.StatusID
            }, {
                where: { DriveID: driveId }
            });

            if (updatedDrive[0] === 0) {
                throw new Error("Drive not found or no changes made");
            }

            return "Drive updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update drive: " + error);
        }
    }

    // Delete a drive by DriveID
    async deleteDrive(driveId) {
        try {
            const deleted = await db.DriveMaster.destroy({
                where: { DriveID: driveId }
            });

            if (deleted === 0) {
                throw new Error("Drive not found");
            }

            return "Drive deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete drive: " + error);
        }
    }

    // Fetch drives with optional search, sorting, and pagination
    async fetchDrives(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["DriveID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.DriveMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve drives");
        }
    }
}

module.exports = DriveMasterService;
