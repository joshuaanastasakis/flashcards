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

import { assert } from "./utilities";

export function openCSV(filepath: string): string {
    let file = new XMLHttpRequest();
    let content: string = null;
    file.open("GET", filepath, false);

    file.onreadystatechange = () => {
        // check file ready state
        if (file.readyState===4) {
            // check file status
            if (file.status===200 || file.status===0) {
                content = file.responseText;
            }
        }
    }

    file.send(null);

    if (!content || content===null) {
        assert(false, "Content is null");
    }

    return content;
}

export function parseCSV(input: string): {}[] {
    if (!input || input === null) {
        return null;
    }

    let rows: string[] = input.split("\n");

    // make sure that the header row (row 1) and the types row (row 2) exist
    assert(rows.length>=2, "Missing headers/types provided");

    // store each row as an object, and all objects in an array
    let data: {}[] = [];

    // get headers from first row
    let headers: string[] = (rows[0]).split(',');

    // shift down to next row (headers->types)
    rows.shift();

    // get types from second row
    let types: string[] = (rows[0]).split(',');

    // shift down to beginning of data rows
    rows.shift();

    // while there is data in the row
    while (typeof rows[0] !== undefined) {
        // put first data row into string array
        let items: string[] = (rows[0]).split(',');

        // init empty object for row data (item)
        let item: {} = {};

        // loop through each item in the row
        for (let i=0; i < headers.length; i++) {
            // set 'key' as the header corresponding to the column of the item
            let key: string = headers[i];

            // set 'value' as the contents of the current item
            let value = items[i];

            // set item object data
            item[key]=value;
        }
        
        // add row object to main data array
        data.push(item);
    }

    return data;
}

export enum Type {
    STRING = "string",
    NUMBER = "number"
}

export interface Header {
    type: Type;
    key: string;
    title: string;
}

export interface Item {
    key: string;
    value?: string | Number;
}

export interface Row {
    id: number;
    items: Item[];
}

export class Database {
    private headers!: Header[];
    private rows?: Row[];

    

    constructor(input: String) {
        this.headers=[];
        this.rows = [];
    }



    addRow = (newRow: Row) => {
        // if (this.rows===null) {
        //     this.rows = [];
        // }
        if (newRow === null) {
            return;
        }

        this.rows.push(newRow);
    }

    /*
        delete a row from the database
        input:
            - id: row ID to be deleted
        return: 
            - boolean (true on success, false on error)
    */
    deleteRow = (id: number) => {
        // return false if param `id` is not positive (only allowing positive integers for id)
        if (id < 0) {
            return false;
        }

        // get the row that matches param `id` by filtering the items array
        const row: Row[] = this.rows.filter((r: Row) => {
            r.id===id;
        });

        // return false if no row with param `id` found
        if (row===null || row===undefined) {
            return false;
        }

        // get the index of the row found above
        const index = this.rows.indexOf(row[0]);

        // remove index from rows array
        if (this.rows.splice(index, 1).length <= 0) {
            return false;
        }
        
        return true;
    }

    print = () => {
        // each row should be represented by an object, with the title

        let header_titles: string[] = this.headers.map((h: Header) => {
            return h.title + "|";
        });
        
        console.log(...header_titles);
        
        for (let r=0; r < this.rows.length; r++) {
            let row: Row = this.rows[r];
            let row_titles: string[] = row.items.map((i: Item) => {
                return i.value + "|";
            });

            console.log(...row_titles);
        }
    }

    generateHTML = () =>  {
        assert(false, "TO DO");
    }

}