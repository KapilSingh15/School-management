const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class AttendanceStatusService {
    
    // Create a new attendance status
    async createAttendanceStatus(data) {
        try {
            const attendanceStatus = await db.AttendanceStatus.create({
                Status: data.Status,
                Description: data.Description
            });
            return attendanceStatus;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create attendance status: " + error);
        }
    }

    // Update an existing attendance status by StatusID
    async updateAttendanceStatus(statusId, data) {
        try {
            const updatedAttendanceStatus = await db.AttendanceStatus.update({
                Status: data.Status,
                Description: data.Description
            }, {
                where: {
                    StatusID: statusId
                }
            });

            if (updatedAttendanceStatus[0] === 0) {
                throw new Error("Attendance status not found or no changes made");
            }

            return "Attendance status updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update attendance status: " + error);
        }
    }

    // Delete an attendance status by StatusID
    async deleteAttendanceStatus(statusId) {
        try {
            const deleted = await db.AttendanceStatus.destroy({
                where: {
                    StatusID: statusId
                }
            });

            if (deleted === 0) {
                throw new Error("Attendance status not found");
            }

            return "Attendance status deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete attendance status: " + error);
        }
    }

    // Fetch attendance statuses with optional search, sorting, and pagination
    async fetchAttendanceStatuses(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            
            // Calculate offset using Helper.getPageNumber
            const offset = Helper.getPageNumber(page, limit);
            
            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StatusID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.AttendanceStatus.findAndCountAll({
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
            throw new Error("Failed to retrieve attendance statuses");
        }
    }
}

module.exports = AttendanceStatusService;
