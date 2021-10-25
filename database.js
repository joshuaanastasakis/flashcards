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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.Type = exports.parseCSV = exports.openCSV = void 0;
const utilities_1 = require("./utilities");
function openCSV(filepath) {
    let file = new XMLHttpRequest();
    let content = null;
    file.open("GET", filepath, false);
    file.onreadystatechange = () => {
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
    let rows = input.split("\n");
    // make sure that the header row (row 1) and the types row (row 2) exist
    (0, utilities_1.assert)(rows.length >= 2, "Missing headers/types provided");
    // store each row as an object, and all objects in an array
    let data = [];
    // get headers from first row
    let headers = (rows[0]).split(',');
    // shift down to next row (headers->types)
    rows.shift();
    // get types from second row
    let types = (rows[0]).split(',');
    // shift down to beginning of data rows
    rows.shift();
    // while there is data in the row
    while (typeof rows[0] !== undefined) {
        // put first data row into string array
        let items = (rows[0]).split(',');
        // init empty object for row data (item)
        let item = {};
        // loop through each item in the row
        for (let i = 0; i < headers.length; i++) {
            // set 'key' as the header corresponding to the column of the item
            let key = headers[i];
            // set 'value' as the contents of the current item
            let value = items[i];
            // set item object data
            item[key] = value;
        }
        // add row object to main data array
        data.push(item);
    }
    return [headers, types, data];
}
exports.parseCSV = parseCSV;
var Type;
(function (Type) {
    Type["STRING"] = "string";
    Type["NUMBER"] = "number";
})(Type = exports.Type || (exports.Type = {}));
class Database {
    constructor(input) {
        this.generateHeaders = (header_titles, header_types) => {
            (0, utilities_1.assert)(header_titles.length === header_types.length, "Header titles and types lengths don't match");
            (0, utilities_1.assert)(Object.keys(Type).length / 2 === 2, "unimplemented type checking");
            let headers = [];
            for (let i = 0; i < header_titles.length; i++) {
                let type;
                if (header_types[i] === "string") {
                    type = Type.STRING;
                }
                else if (header_types[i] === "number") {
                    type = Type.NUMBER;
                }
                else {
                    (0, utilities_1.assert)(false, "Type should be either 'string or 'number'");
                }
                headers.push({
                    type: type,
                    key: "" + (i + 1),
                    title: header_titles[i]
                });
            }
            return headers;
        };
        this.addRow = (newRow, at) => {
            if (newRow === null) {
                return;
            }
            if (!at) {
                at = this.rows.length;
            }
            this.rows.splice(at, 0, newRow);
        };
        /*
            delete a row from the database
            input:
                - id: row ID to be deleted
            return:
                - boolean (true on success, false on error)
        */
        this.deleteRow = (id) => {
            // return false if param `id` is not positive (only allowing positive integers for id)
            if (id < 0) {
                return false;
            }
            // get the row that matches param `id` by filtering the items array
            const row = this.rows.filter((r) => {
                r.id === id;
            });
            // return false if no row with param `id` found
            if (row === null || row === undefined) {
                return false;
            }
            // get the index of the row found above
            const index = this.rows.indexOf(row[0]);
            // remove index from rows array
            if (this.rows.splice(index, 1).length <= 0) {
                return false;
            }
            return true;
        };
        this.print = () => {
            // each row should be represented by an object, with the title
            let header_titles = this.headers.map((h) => {
                return h.title + "|";
            });
            console.log(...header_titles);
            for (let r = 0; r < this.rows.length; r++) {
                let row = this.rows[r];
                let row_titles = row.items.map((i) => {
                    return i.value + "|";
                });
                console.log(...row_titles);
            }
        };
        this.generateHTML = () => {
            (0, utilities_1.assert)(false, "TO DO");
        };
        const csv = openCSV(input);
        let response = parseCSV(csv);
        (0, utilities_1.assert)((response[2]).length === (new Set(response[2]).size));
        ``;
        let headers = response[0];
        let types = response[1];
        this.data = response[2];
        this.headers = [];
        this.headers = [];
        this.rows = [];
        this.data = [];
    }
}
exports.Database = Database;
