const AttendanceMasterDetailService = require("../../services/master/AttendanceMasterDetailService");
const attendanceMasterDetailService = new AttendanceMasterDetailService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new attendance master detail record
const ADD_ATTENDANCE_DETAIL = async (req, res) => {
    try {
        await attendanceMasterDetailService.createAttendanceDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance detail added successfully',
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

// Update an existing attendance master detail record
const UPDATE_ATTENDANCE_DETAIL = async (req, res) => {
    const { attendanceDetailId } = req.params; // Assuming attendanceDetailId is passed as a route parameter
    try {
        await attendanceMasterDetailService.updateAttendanceDetail(attendanceDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance detail updated successfully',
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

// Delete an attendance master detail record
const DELETE_ATTENDANCE_DETAIL = async (req, res) => {
    const { attendanceDetailId } = req.params; // Assuming attendanceDetailId is passed as a route parameter
    try {
        await attendanceMasterDetailService.deleteAttendanceDetail(attendanceDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance detail deleted successfully',
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

// Fetch attendance master detail records
const FETCH_ATTENDANCE_DETAILS = async (req, res) => {
    try {
        const result = await attendanceMasterDetailService.fetchAttendanceDetails(req.query);
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
    ADD_ATTENDANCE_DETAIL,
    UPDATE_ATTENDANCE_DETAIL,
    DELETE_ATTENDANCE_DETAIL,
    FETCH_ATTENDANCE_DETAILS
};
