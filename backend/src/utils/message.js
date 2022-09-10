const message = {

}

message.overallMessage = (res, statusCode, state, data, message) => {
    res.status(statusCode).json({
        state,
        data,
        message
    });
};

export default message;