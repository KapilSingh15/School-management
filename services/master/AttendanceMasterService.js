const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class AttendanceMasterService {
    
    // Create a new attendance record
    async createAttendance(data) {
        try {
            const attendance = await db.AttendanceMaster.create({
                StudentID: data.StudentID,
                Date: data.Date,
                Status: data.Status,
                Remarks: data.Remarks
            });
            return attendance;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create attendance record: " + error);
        }
    }

    // Update an existing attendance record by AttendanceID
    async updateAttendance(attendanceId, data) {
        try {
            const updatedAttendance = await db.AttendanceMaster.update({
                StudentID: data.StudentID,
                Date: data.Date,
                Status: data.Status,
                Remarks: data.Remarks
            }, {
                where: {
                    AttendanceID: attendanceId
                }
            });

            if (updatedAttendance[0] === 0) {
                throw new Error("Attendance record not found or no changes made");
            }

            return "Attendance record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update attendance record: " + error);
        }
    }

    // Delete an attendance record by AttendanceID
    async deleteAttendance(attendanceId) {
        try {
            const deleted = await db.AttendanceMaster.destroy({
                where: {
                    AttendanceID: attendanceId
                }
            });

            if (deleted === 0) {
                throw new Error("Attendance record not found");
            }

            return "Attendance record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete attendance record: " + error);
        }
    }

    // Fetch attendance records with optional search, sorting, and pagination
    async fetchAttendance(query) {
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
                where.Status = { [Op.eq]: status };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["AttendanceID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.AttendanceMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve attendance records");
        }
    }
}

module.exports = AttendanceMasterService;
