let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

let clients = [];
let pallet = [];
let drawing = [];
let boxWidth = boxHeight = 40;

class Bit {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    UpdateForClients() {
        for (let i = 0; i < clients.length; i++) {
            io.to(clients[i].id).emit("UpdateBit", this.x, this.y, this.color, boxWidth, boxHeight);
        }
    }

    UpdateForClient(id) {
        io.to(id).emit("UpdateBit", this.x, this.y, this.color, boxWidth, boxHeight);
    }
}


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/client/index.html");
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});

init();

io.on("connection", function (socket) {
    // als de speler connect vind een game waar ze nog 1 / 2 spelers nodig hebben!
    console.log("Client connected with id " + socket.id);
    clients.push(socket);
    io.to(socket.id).emit("LoadCanvas", drawing);
    io.to(socket.id).emit("LoadPallet", pallet);

    for (let i = 0; i < drawing.length; i++) {
        drawing[i].UpdateForClient(socket.id);
    }

    for (let i = 0; i < pallet.length; i++) {
        pallet[i].UpdateForClient(socket.id);
    }

    socket.on("UpdateBit", function (x, y, color) {
        for (let i = 0; i < drawing.length; i++) {
            if (drawing[i].x == x && drawing[i].y == y) {
                drawing[i].color = color;
                console.log("Updated a bit");

                drawing[i].UpdateForClients();
            }
        }
    });
});

function init() {
    // init pallet
    for (let i = 0; i < 0x10; i++) {
        let numOnRow = 2;
        let bitWidth = boxWidth;
        let x = 10 * boxWidth + (i % numOnRow) * bitWidth;//pallet starts at position 11
        let y = Math.floor(i / numOnRow) * bitWidth;
        let bit = new Bit(x, y, i);
        bit.colorBit = true;
        pallet.push(bit);
    }
    // init playfield
    for (i = 0; i < 80; i++) {
        //grid 10 cols x 8 rows
        let numOnRow = 10;
        let bitWidth = boxWidth;
        let x = (i % numOnRow) * bitWidth;
        let y = Math.floor(i / numOnRow) * bitWidth;
        let bit = new Bit(x, y, 0xf); // 0xf background color from ega array
        drawing[i] = bit; //opslag van de tekening tbv export naar json
    }
}