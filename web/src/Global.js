
var State = {
    INIT: 0,
    QUEUED: 1,
    RUNNING: 2,
    STOPPED: 3
};

Date.prototype.toShortStr = function() {
    function pad(n) {
        n = parseInt(n);
        return (n < 10) ? ("0" + n) : n;
    }
    return this.getDate() + "." + (this.getMonth() + 1) + " - " + pad(this.getHours()) + ":" + pad(this.getMinutes());
};

export default State;