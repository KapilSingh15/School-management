const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StudentMasterService {
    
    // Create a new student record
    async createStudent(data) {
        try {
            const student = await db.StudentMaster.create({
                ReceiptNo: data.ReceiptNo,
                FinancialYearID: data.FinancialYearID,
                BranchID: data.BranchID,
                RollNumber: data.RollNumber,
                StudentLoginID: data.StudentLoginID,
                Password: data.Password,
                AdmissionDate: data.AdmissionDate,
                ClassID: data.ClassID,
                SectionID: data.SectionID,
                StudentName: data.StudentName,
                DOB: data.DOB,
                GenderID: data.GenderID,
                AdharNo: data.AdharNo,
                BloodGroupID: data.BloodGroupID,
                GroupID: data.GroupID,
                ContactNo: data.ContactNo,
                EmailID: data.EmailID,
                CurrentAddress: data.CurrentAddress,
                PermanentAddress: data.PermanentAddress,
                FathersName: data.FathersName,
                FathersMobileNo: data.FathersMobileNo,
                FathersEmailID: data.FathersEmailID,
                Qualification: data.Qualification,
                Occupation: data.Occupation,
                StudentPhoto: data.StudentPhoto,
                StatusID: data.StatusID,
                RoutID: data.RoutID,
                LeavingDate: data.LeavingDate,
                MoveOnNextClass: data.MoveOnNextClass,
                ResultID: data.ResultID,
                PlaceOfBirth: data.PlaceOfBirth,
                Nationality: data.Nationality,
                ReligionID: data.ReligionID,
                MotherTounge: data.MotherTounge,
                IdentificationMark: data.IdentificationMark,
                PhysicalHandicap: data.PhysicalHandicap,
                QuotaID: data.QuotaID,
                PINCodeR: data.PINCodeR,
                PINCodeP: data.PINCodeP,
                CityID: data.CityID,
                CreatedOn: new Date(),
                CreatedBy: data.CreatedBy
            });
            return student;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create student: " + error);
        }
    }

    // Update an existing student record by StudentID
    async updateStudent(studentId, data) {
        try {
            const updatedStudent = await db.StudentMaster.update({
                ReceiptNo: data.ReceiptNo,
                FinancialYearID: data.FinancialYearID,
                BranchID: data.BranchID,
                RollNumber: data.RollNumber,
                StudentLoginID: data.StudentLoginID,
                Password: data.Password,
                AdmissionDate: data.AdmissionDate,
                ClassID: data.ClassID,
                SectionID: data.SectionID,
                StudentName: data.StudentName,
                DOB: data.DOB,
                GenderID: data.GenderID,
                AdharNo: data.AdharNo,
                BloodGroupID: data.BloodGroupID,
                GroupID: data.GroupID,
                ContactNo: data.ContactNo,
                EmailID: data.EmailID,
                CurrentAddress: data.CurrentAddress,
                PermanentAddress: data.PermanentAddress,
                FathersName: data.FathersName,
                FathersMobileNo: data.FathersMobileNo,
                FathersEmailID: data.FathersEmailID,
                Qualification: data.Qualification,
                Occupation: data.Occupation,
                StudentPhoto: data.StudentPhoto,
                StatusID: data.StatusID,
                RoutID: data.RoutID,
                LeavingDate: data.LeavingDate,
                MoveOnNextClass: data.MoveOnNextClass,
                ResultID: data.ResultID,
                PlaceOfBirth: data.PlaceOfBirth,
                Nationality: data.Nationality,
                ReligionID: data.ReligionID,
                MotherTounge: data.MotherTounge,
                IdentificationMark: data.IdentificationMark,
                PhysicalHandicap: data.PhysicalHandicap,
                QuotaID: data.QuotaID,
                PINCodeR: data.PINCodeR,
                PINCodeP: data.PINCodeP,
                CityID: data.CityID,
                ModifiedOn: new Date(),
                ModifiedBy: data.ModifiedBy
            }, {
                where: { StudentID: studentId }
            });
            return updatedStudent;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update student: " + error);
        }
    }

    // Delete a student record by StudentID
    async deleteStudent(studentId) {
        try {
            const deletedStudent = await db.StudentMaster.destroy({
                where: { StudentID: studentId }
            });
            return deletedStudent;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete student: " + error);
        }
    }

    // Fetch all student records with optional filtering
    async fetchStudents(query) {
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

            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StudentID", "ASC"]];
            const { count, rows } = await db.StudentMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve students: " + error);
        }
    }
}

module.exports = StudentMasterService;
