const db = require("../../model");
const { Op } = require("sequelize");

class TermsMasterService {
    
    // Create a new term record
    async createTerm(data) {
        try {
            const term = await db.TermsMaster.create({
                TermName: data.TermName,
                AssessmentID: data.AssessmentID,
                StatusID: data.StatusID
            });
            return term;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create term: " + error);
        }
    }

    // Update an existing term record by TermID
    async updateTerm(termId, data) {
        try {
            const updatedTerm = await db.TermsMaster.update({
                TermName: data.TermName,
                AssessmentID: data.AssessmentID,
                StatusID: data.StatusID
            }, {
                where: { TermID: termId }
            });
            return updatedTerm;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update term: " + error);
        }
    }

    // Delete a term record by TermID
    async deleteTerm(termId) {
        try {
            const deletedTerm = await db.TermsMaster.destroy({
                where: { TermID: termId }
            });
            return deletedTerm;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete term: " + error);
        }
    }

    // Fetch all term records with optional filtering
    async fetchTerms(query) {
        const { searchBy, searchValue, status, sortby, sortCode, page, limit } = query;
        try {
            let where = {};
            const offset = (page - 1) * limit;

            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }
            if (status) {
                where.StatusID = { [Op.eq]: status };
            }

            const order = sortby && sortCode ? [[sortby, sortCode]] : [["TermID", "ASC"]];
            const { count, rows } = await db.TermsMaster.findAndCountAll({
                where,
                offset: parseInt(offset),
                limit: parseInt(limit),
                order
            });
            return {
                data: {
                    pagination: {
                        currentPage: parseInt(page),
                        pageSize: parseInt(limit),
                        totalPages: Math.ceil(count / limit),
                        totalResults: count,
                    },
                    data: rows,
                },
            };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to retrieve terms: " + error);
        }
    }
}

module.exports = TermsMasterService;
