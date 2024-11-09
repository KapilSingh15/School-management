const apiRoutes = {
    master: {
        base: "master"
    }

}
const pageConfig = {
    PER_PAGE_RECORDS: 20,
    PAGE_NO: 1,
    IS_EXPORT: 0,
    ORDER_BY: 'id-DESC',
    RETURN_DB_DATE_TIME_FORMAT: '%b %d, %Y %l:%i %p',
    RETURN_DB_DATE_FORMAT: '%D %M, %Y',
    FULL_DATE_FORMAT: '%D %M %Y',
    DEFAULT_VALUE: 'N/A',
    BLOG_DATE_FORMAT: '%d-%b-%Y'
}

module.exports = {
    apiRoutes, pageConfig
}