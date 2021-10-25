"use strict";
/*
    |h1|h2|h3|h4|
    |11|12|13|14|
    |21|22|23|24|
    |31|32|33|34|
    |41|42|43|44|

    headers [string]
    row     [any]
    rows    [row]

    sort_columns(by: )
    arrange_columns(order: [string])
    sort_rows(by: )


    define Item type list
    : in Database class:
      - validate rows: check that the types for each
                       item in each row match the types
                       defined in the headers
                       - assert match, throw error on mismatch
    
    add column
    - add header row with new type
    - for each existing row, set value to undefined?
*/
exports.__esModule = true;
exports.Database = exports.Type = exports.parseCSV = exports.openCSV = void 0;
var utilities_1 = require("./utilities");
function openCSV(filepath) {
    var file = new XMLHttpRequest();
    var content = null;
    file.open("GET", filepath, false);
    file.onreadystatechange = function () {
        // check file ready state
        if (file.readyState === 4) {
            // check file status
            if (file.status === 200 || file.status === 0) {
                content = file.responseText;
            }
        }
    };
    file.send(null);
    if (!content || content === null) {
        (0, utilities_1.assert)(false, "Content is null");
    }
    return content;
}
exports.openCSV = openCSV;
function parseCSV(input) {
    if (!input || input === null) {
        return null;
    }
    var rows = input.split("\n");
    // make sure that the header row (row 1) and the types row (row 2) exist
    (0, utilities_1.assert)(rows.length >= 2, "Missing headers/types provided");
    // store each row as an object, and all objects in an array
    var data = [];
    // get headers from first row
    var headers = (rows[0]).split(',');
    // shift down to next row (headers->types)
    rows.shift();
    // get types from second row
    var types = (rows[0]).split(',');
    // shift down to beginning of data rows
    rows.shift();
    // while there is data in the row
    while (typeof rows[0] !== undefined) {
        // put first data row into string array
        var items = (rows[0]).split(',');
        // init empty object for row data (item)
        var item = {};
        // loop through each item in the row
        for (var i = 0; i < headers.length; i++) {
            // set 'key' as the header corresponding to the column of the item
            var key = headers[i];
            // set 'value' as the contents of the current item
            var value = items[i];
            // set item object data
            item[key] = value;
        }
        // add row object to main data array
        data.push(item);
    }
    return data;
}
exports.parseCSV = parseCSV;
var Type;
(function (Type) {
    Type["STRING"] = "string";
    Type["NUMBER"] = "number";
})(Type = exports.Type || (exports.Type = {}));
var Database = /** @class */ (function () {
    function Database(input) {
        var _this = this;
        this.addRow = function (newRow) {
            // if (this.rows===null) {
            //     this.rows = [];
            // }
            if (newRow === null) {
                return;
            }
            _this.rows.push(newRow);
        };
        /*
            delete a row from the database
            input:
                - id: row ID to be deleted
            return:
                - boolean (true on success, false on error)
        */
        this.deleteRow = function (id) {
            // return false if param `id` is not positive (only allowing positive integers for id)
            if (id < 0) {
                return false;
            }
            // get the row that matches param `id` by filtering the items array
            var row = _this.rows.filter(function (r) {
                r.id === id;
            });
            // return false if no row with param `id` found
            if (row === null || row === undefined) {
                return false;
            }
            // get the index of the row found above
            var index = _this.rows.indexOf(row[0]);
            // remove index from rows array
            if (_this.rows.splice(index, 1).length <= 0) {
                return false;
            }
            return true;
        };
        this.print = function () {
            // each row should be represented by an object, with the title
            var header_titles = _this.headers.map(function (h) {
                return h.title + "|";
            });
            console.log.apply(console, header_titles);
            for (var r = 0; r < _this.rows.length; r++) {
                var row = _this.rows[r];
                var row_titles = row.items.map(function (i) {
                    return i.value + "|";
                });
                console.log.apply(console, row_titles);
            }
        };
        this.generateHTML = function () {
            (0, utilities_1.assert)(false, "TO DO");
        };
        this.headers = [];
        this.rows = [];
    }
    return Database;
}());
exports.Database = Database;
