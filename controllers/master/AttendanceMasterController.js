const AttendanceMasterService = require("../../services/master/AttendanceMasterService");
const attendanceMasterService = new AttendanceMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new attendance record
const ADD_ATTENDANCE = async (req, res) => {
    try {
        await attendanceMasterService.createAttendance(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance added successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Update an existing attendance record
const UPDATE_ATTENDANCE = async (req, res) => {
    const { attendanceId } = req.params; // Assuming attendanceId is passed as a route parameter
    try {
        await attendanceMasterService.updateAttendance(attendanceId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance updated successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Delete an attendance record
const DELETE_ATTENDANCE = async (req, res) => {
    const { attendanceId } = req.params; // Assuming attendanceId is passed as a route parameter
    try {
        await attendanceMasterService.deleteAttendance(attendanceId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance deleted successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Fetch attendance records
const FETCH_ATTENDANCES = async (req, res) => {
    try {
        const result = await attendanceMasterService.fetchAttendances(req.query);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: result,
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

module.exports = {
    ADD_ATTENDANCE,
    UPDATE_ATTENDANCE,
    DELETE_ATTENDANCE,
    FETCH_ATTENDANCES
};
