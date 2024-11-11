const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class SchoolDetailsService {
    
    // Create a new school record
    async createSchool(data) {
        try {
            console.log(data);
            
            const school = await db.schoolDetails.create({
                SchoolName: data.schoolName,
                Address: data.address,
                ContactNo: data.contactNo,
                EmailID: data.emailID,
                FaxNo: data.faxNo,
                Website: data.website,
                Logo: data.logo,
                status:'Active'
            });
            return school;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create school record: " + error);
        }
    }

    // Update an existing school record by SchoolID
    async updateSchool(schoolId, data) {
        try {
            const updatedSchool = await db.schoolDetails.update({
                SchoolName: data.schoolName,
                Address: data.address,
                ContactNo: data.contactNo,
                EmailID: data.emailID,
                FaxNo: data.faxNo,
                Website: data.website,
                Logo: data.logo,
                status:data.status
            }, {
                where: { SchoolID: schoolId }
            });

            if (updatedSchool[0] === 0) {
                throw new Error("School record not found or no changes made");
            }

            return "School record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update school record: " + error);
        }
    }

    // Delete a school record by SchoolID
    async deleteSchool(schoolId) {
        try {
            const deleted = await db.schoolDetails.destroy({
                where: { SchoolID: schoolId }
            });

            if (deleted === 0) {
                throw new Error("School record not found");
            }

            return "School record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete school record: " + error);
        }
    }

    // Fetch school records with optional search, sorting, and pagination
    async fetchSchools(query) {
        const { searchBy, status, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }
            if (status) {
                where.status = { [Op.eq]: status };
            }
            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["SchoolID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.schoolDetails.findAndCountAll({
                where,
                offset:offset,
                limit: Number(limit),
                 order
            });

            return {
                data: {
                    pagination: {
                        currentPage: parseInt(page),
                        pageSize: parseInt(limit) || Helper.getPageNumber(1, limit),
                        totalPages: Math.ceil(count / Number(limit)),
                        totalResults: count,
                    },
                    data: rows,
                },
            };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to retrieve school records");
        }
    }
}

module.exports = SchoolDetailsService;
