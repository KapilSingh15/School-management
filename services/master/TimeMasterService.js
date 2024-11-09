const db = require("../../model");
const { Op } = require("sequelize");

class TimeMasterService {
    
    // Create a new time record
    async createTime(data) {
        try {
            const time = await db.TimeMaster.create({
                Time: data.Time
            });
            return time;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create time: " + error);
        }
    }

    // Update an existing time record by TimeID
    async updateTime(timeId, data) {
        try {
            const updatedTime = await db.TimeMaster.update({
                Time: data.Time
            }, {
                where: { TimeID: timeId }
            });
            return updatedTime;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update time: " + error);
        }
    }

    // Delete a time record by TimeID
    async deleteTime(timeId) {
        try {
            const deletedTime = await db.TimeMaster.destroy({
                where: { TimeID: timeId }
            });
            return deletedTime;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete time: " + error);
        }
    }

    // Fetch all time records with optional filtering
    async fetchTimes(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;
        try {
            let where = {};
            const offset = (page - 1) * limit;

            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            const order = sortby && sortCode ? [[sortby, sortCode]] : [["TimeID", "ASC"]];
            const { count, rows } = await db.TimeMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve times: " + error);
        }
    }
}

module.exports = TimeMasterService;
