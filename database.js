"use strict";
/*
    |h1|h2|h3|h4|
    |11|12|13|14|
    |21|22|23|24|
    |31|32|33|34|
    |41|42|43|44|

    headers [String]
    row     [any]
    rows    [row]

    sort_columns(by: )
    arrange_columns(order: [String])
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
exports.Database = exports.Type = void 0;
var Type;
(function (Type) {
    Type["STRING"] = "String";
    Type["NUMBER"] = "Number";
})(Type = exports.Type || (exports.Type = {}));
var Database = /** @class */ (function () {
    function Database(headers) {
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
        this.headers = headers;
        this.rows = [];
    }
    return Database;
}());
exports.Database = Database;
