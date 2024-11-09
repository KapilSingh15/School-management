const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class AttendanceMasterDetailService {
    
    // Create a new attendance detail
    async createAttendanceDetail(data) {
        try {
            const attendanceDetail = await db.AttendanceMasterDetail.create({
                AttendanceID: data.AttendanceID,
                StudentID: data.StudentID,
                Date: data.Date,
                Status: data.Status,
                Remarks: data.Remarks
            });
            return attendanceDetail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create attendance detail: " + error);
        }
    }

    // Update an existing attendance detail by AttendanceDetailID
    async updateAttendanceDetail(attendanceDetailId, data) {
        try {
            const updatedAttendanceDetail = await db.AttendanceMasterDetail.update({
                AttendanceID: data.AttendanceID,
                StudentID: data.StudentID,
                Date: data.Date,
                Status: data.Status,
                Remarks: data.Remarks
            }, {
                where: {
                    AttendanceDetailID: attendanceDetailId
                }
            });

            if (updatedAttendanceDetail[0] === 0) {
                throw new Error("Attendance detail not found or no changes made");
            }

            return "Attendance detail updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update attendance detail: " + error);
        }
    }

    // Delete an attendance detail by AttendanceDetailID
    async deleteAttendanceDetail(attendanceDetailId) {
        try {
            const deleted = await db.AttendanceMasterDetail.destroy({
                where: {
                    AttendanceDetailID: attendanceDetailId
                }
            });

            if (deleted === 0) {
                throw new Error("Attendance detail not found");
            }

            return "Attendance detail deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete attendance detail: " + error);
        }
    }

    // Fetch attendance details with optional search, sorting, and pagination
    async fetchAttendanceDetails(query) {
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
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["AttendanceDetailID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.AttendanceMasterDetail.findAndCountAll({
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
            throw new Error("Failed to retrieve attendance details");
        }
    }
}

module.exports = AttendanceMasterDetailService;
