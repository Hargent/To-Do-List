//jshint esversio:6

//functions 

//To get date
exports.getDate = function() {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    return today.toLocaleDateString("en-US", options);
}

//To get day
exports.getDay = function() {

    const today = new Date();

    const options = {
        weekday: "long"
    };

    return today.toLocaleDateString("en-US", options);
}