const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ExaminationScheduleMasterService {
    
    // Create a new examination schedule
    async createExaminationSchedule(data) {
        try {
            const schedule = await db.ExaminationScheduleMaster.create({
                ExaminationName: data.ExaminationName,
                ClassID: data.ClassID,
                SubjectID: data.SubjectID,
                ExamDate: data.ExamDate,
                StartTime: data.StartTime,
                EndTime: data.EndTime,
                StatusID: data.StatusID
            });
            return schedule;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create examination schedule: " + error);
        }
    }

    // Update an existing examination schedule by ScheduleID
    async updateExaminationSchedule(scheduleId, data) {
        try {
            const updatedSchedule = await db.ExaminationScheduleMaster.update({
                ExaminationName: data.ExaminationName,
                ClassID: data.ClassID,
                SubjectID: data.SubjectID,
                ExamDate: data.ExamDate,
                StartTime: data.StartTime,
                EndTime: data.EndTime,
                StatusID: data.StatusID
            }, {
                where: { ScheduleID: scheduleId }
            });

            if (updatedSchedule[0] === 0) {
                throw new Error("Examination schedule not found or no changes made");
            }

            return "Examination schedule updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update examination schedule: " + error);
        }
    }

    // Delete an examination schedule by ScheduleID
    async deleteExaminationSchedule(scheduleId) {
        try {
            const deleted = await db.ExaminationScheduleMaster.destroy({
                where: { ScheduleID: scheduleId }
            });

            if (deleted === 0) {
                throw new Error("Examination schedule not found");
            }

            return "Examination schedule deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete examination schedule: " + error);
        }
    }

    // Fetch examination schedules with optional search, sorting, and pagination
    async fetchExaminationSchedules(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ScheduleID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ExaminationScheduleMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve examination schedules");
        }
    }
}

module.exports = ExaminationScheduleMasterService;
