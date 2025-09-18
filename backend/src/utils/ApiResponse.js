class ApiResponse {
    constructor(statusCode, message = "Success", data = null, meta = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = true;
        this.data = data;
        this.meta = Object.keys(meta).length > 0 ? meta : undefined;
    }
}

export { ApiResponse };
