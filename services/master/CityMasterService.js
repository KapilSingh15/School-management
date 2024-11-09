const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class CityMasterService {
    async createCity(data) {
        try {
            const city = await db.CityMaster.create({
                CityName: data.CityName,
                StateID: data.StateID,
                StatusID: data.StatusID
            });
            return city;
        } catch (error) {
            throw new Error("Failed to create city: " + error);
        }
    }

    async updateCity(cityId, data) {
        try {
            const updatedCity = await db.CityMaster.update({
                CityName: data.CityName,
                StateID: data.StateID,
                StatusID: data.StatusID
            }, {
                where: { CityID: cityId }
            });

            if (updatedCity[0] === 0) throw new Error("City not found or no changes made");
            return "City updated successfully";
        } catch (error) {
            throw new Error("Failed to update city: " + error);
        }
    }

    async deleteCity(cityId) {
        try {
            const deleted = await db.CityMaster.destroy({ where: { CityID: cityId } });
            if (deleted === 0) throw new Error("City not found");
            return "City deleted successfully";
        } catch (error) {
            throw new Error("Failed to delete city: " + error);
        }
    }

    async fetchCities(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;
        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);
            if (searchBy && searchValue) where[searchBy] = { [Op.like]: `%${searchValue}%` };
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["CityID", "ASC"]];
            const { count, rows } = await db.CityMaster.findAndCountAll({
                where, offset, limit: parseInt(limit) || Helper.getPageNumber(1, limit), order
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
            throw new Error("Failed to retrieve cities");
        }
    }
}

module.exports = CityMasterService;
