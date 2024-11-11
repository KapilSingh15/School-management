const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ResultReportMasterService {

    // Create a new result report record
    async createResultReport(data) {
        try {
            const report = await db.ResultReportMaster.create({
                SubjectID: data.SubjectID,
                SubjectName: data.SubjectName,
                FA1: data.FA1,
                FA2: data.FA2,
                FA3: data.FA3,
                FA4: data.FA4,
                SA1: data.SA1,
                SA2: data.SA2,
                Total1: data.Total1,
                Total2: data.Total2,
                FASA: data.FASA,
                GradePoint: data.GradePoint
            });
            return report;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create result report record: " + error);
        }
    }

    // Update an existing result report record by ReportID
    async updateResultReport(reportId, data) {
        try {
            const updatedReport = await db.ResultReportMaster.update({
                SubjectID: data.SubjectID,
                SubjectName: data.SubjectName,
                FA1: data.FA1,
                FA2: data.FA2,
                FA3: data.FA3,
                FA4: data.FA4,
                SA1: data.SA1,
                SA2: data.SA2,
                Total1: data.Total1,
                Total2: data.Total2,
                FASA: data.FASA,
                GradePoint: data.GradePoint
            }, {
                where: { ReportID: reportId }
            });

            if (updatedReport[0] === 0) {
                throw new Error("Result report record not found or no changes made");
            }

            return "Result report record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update result report record: " + error);
        }
    }

    // Delete a result report record by ReportID
    async deleteResultReport(reportId) {
        try {
            const deleted = await db.ResultReportMaster.destroy({
                where: { ReportID: reportId }
            });

            if (deleted === 0) {
                throw new Error("Result report record not found");
            }

            return "Result report record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete result report record: " + error);
        }
    }

    // Fetch result report records with optional search, sorting, and pagination
    async fetchResultReports(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ReportID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ResultReportMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve result report records");
        }
    }
}

module.exports = ResultReportMasterService;
