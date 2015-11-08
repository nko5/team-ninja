var _ = require("lodash");
var TicketsStrip = function () {
    this.tickets = [];
    var count = {
        stripSize: 6,
        rows: 3,
        columns: 9,
        filled: 5,
        stripX: {}
    };
    this.generateTickets(count);
};

TicketsStrip.prototype.generateTickets = function (count) {
    var numbers = [];
    for (var i = 0; i < count.stripSize; i++) {
        var ticket = new Ticket();
        count.index = i;
        count.ticket = {
            x: {},
            y: {}
        };
        ticket.fill(count, numbers);
        ticket.print();
        this.tickets.push(ticket);
    }
};

var Ticket = function () {
    this.rows = [];
};

Ticket.prototype.print = function () {
    this.rows.forEach(function (row) {
        console.log(row.join("\t"));
    });
    console.log("------------------------------------")
};

Ticket.prototype.fill = function (count, numbers) {
    var row, filledIndex;
    for (var y = 0; y < count.rows; y++) {
        row = _.range(0, count.columns - 1, 0);
        filledIndex = [];
        var arr = _.range(0, 8);
        for (var i = 0; i < count.filled; i++) {
            var x = this.getX(y, count, filledIndex, arr);
            if (x) {
                var number = this.getNumber(x, numbers);
                filledIndex.push(x);
                numbers.push(number);
                this.updateCount(x, y, count);
                row[x] = number;
            }
        }
        this.rows.push(row);
    }
};


Ticket.prototype.getX = function (y, count, filledIndex, arr) {
    arr = _.shuffle(arr);
    var x = arr.pop();
    var rejected = [];
    while (this.xIsRejected(x, y, count, filledIndex)) {
        rejected.indexOf(x) == -1 && rejected.push(x);
        if (rejected.length == 9) {
            x = null;
            console.log("Fatt gayi re")
            break;
        }
        arr = _.shuffle(arr);
        x = arr.pop();
    }
    return x;
};

Ticket.prototype.getNumber = function (x, numbers) {
    var low = x * 10,
        high = low + 9,
        number = _.random(low, high);
    while (this.numberIsRejected(number, numbers)) {
        number = _.random(low, high);
    }
    return number;
};

Ticket.prototype.canOthersStarve = function (x, count) {
    var ticketsLeft = count.stripSize - count.index + 1, newNumber = 1;
    count.ticket.x[x] = count.ticket.x[x] ? count.ticket.x[x] : 0;
    count.stripX[x] = count.stripX[x] ? count.stripX[x] : 0;
    var stripExceeding = (9 - ( count.stripX[x] + ticketsLeft + newNumber) < 0);
    var currentTicketExceeding = (count.ticket.x[x] + 1) > 2;
    //console.log(ticketsLeft, stripExceeding, currentTicketExceeding);
    return stripExceeding || currentTicketExceeding;
};

Ticket.prototype.hasNeighbors = function (x, filledIndex) {
    var neighbors = [
            [x - 2, x - 1],
            [x - 1, x + 1],
            [x + 1, x + 2]
        ],
        result = false;
    for (var i = 0; i < neighbors.length; i++) {
        var set = neighbors[i];
        if (set.length == _.intersection(set, filledIndex).length) {
            result = true;
            break;
        }
    }
    return result
};

Ticket.prototype.xIsRejected = function (x, y, count, filledIndex) {
    var c1 = filledIndex.indexOf(x) != -1;
    var c2 = this.hasNeighbors(x, filledIndex);
    var c3 = this.canOthersStarve(x, count);
    //console.log(c1, c2, c3);
    return c1 || c2 || c3;
};

Ticket.prototype.numberIsRejected = function (number, numbers) {
    return numbers.indexOf(number) != -1 || number == 0;
};

Ticket.prototype.updateCount = function (x, y, count) {
    count.stripX[x] = count.stripX[x] ? count.stripX[x] + 1 : 1;
    count.ticket.x[x] = count.ticket.x[x] ? count.ticket.x[x] + 1 : 1;
    count.ticket.y[y] = count.ticket.y[y] ? count.ticket.y[y] + 1 : 1;
};

new TicketsStrip();
