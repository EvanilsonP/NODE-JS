const generateMessages = (text, username) => {
    return {
        text,
        username,
        createdAt: new Date().getTime()
    }
};

const generateLocationMessage = (username, url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
};

module.exports = {generateMessages, generateLocationMessage};