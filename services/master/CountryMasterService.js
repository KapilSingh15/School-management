const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class CountryMasterService {
    
    // Create a new country
    async createCountry(data) {
        try {
            const country = await db.CountryMaster.create({
                CountryName: data.CountryName,
                CountryCode: data.CountryCode,
                StatusID: data.StatusID
            });
            return country;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create country: " + error);
        }
    }

    // Update an existing country by CountryID
    async updateCountry(countryId, data) {
        try {
            const updatedCountry = await db.CountryMaster.update({
                CountryName: data.CountryName,
                CountryCode: data.CountryCode,
                StatusID: data.StatusID
            }, {
                where: { CountryID: countryId }
            });

            if (updatedCountry[0] === 0) {
                throw new Error("Country not found or no changes made");
            }

            return "Country updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update country: " + error);
        }
    }

    // Delete a country by CountryID
    async deleteCountry(countryId) {
        try {
            const deleted = await db.CountryMaster.destroy({
                where: { CountryID: countryId }
            });

            if (deleted === 0) {
                throw new Error("Country not found");
            }

            return "Country deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete country: " + error);
        }
    }

    // Fetch countries with optional search, sorting, and pagination
    async fetchCountries(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["CountryID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.CountryMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve countries");
        }
    }
}

module.exports = CountryMasterService;
