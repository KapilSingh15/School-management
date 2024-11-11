const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class SectionMasterService {
    
    // Create a new section record
    async createSection(data) {
        try {
            const section = await db.SectionMaster.create({
                BranchID: data.BranchID,
                SectionName: data.SectionName,
                StatusID: data.StatusID,
                CreatedBy: data.CreatedBy,
                CreatedOn: new Date()
            });
            return section;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create section record: " + error);
        }
    }

    // Update an existing section record by SectionID
    async updateSection(sectionId, data) {
        try {
            const updatedSection = await db.SectionMaster.update({
                BranchID: data.BranchID,
                SectionName: data.SectionName,
                StatusID: data.StatusID,
                ModifiedBy: data.ModifiedBy,
                ModifiedOn: new Date()
            }, {
                where: { SectionID: sectionId }
            });

            if (updatedSection[0] === 0) {
                throw new Error("Section record not found or no changes made");
            }

            return "Section record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update section record: " + error);
        }
    }

    // Delete a section record by SectionID
    async deleteSection(sectionId) {
        try {
            const deleted = await db.SectionMaster.destroy({
                where: { SectionID: sectionId }
            });

            if (deleted === 0) {
                throw new Error("Section record not found");
            }

            return "Section record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete section record: " + error);
        }
    }

    // Fetch section records with optional search, sorting, and pagination
    async fetchSections(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["SectionID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.SectionMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve section records");
        }
    }
}

module.exports = SectionMasterService;
