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

export enum Type {
    STRING = "String",
    NUMBER = "Number"
}

export interface Header {
    type: Type;
    key: String;
    title: String;
}

export interface Item {
    key: String;
    value?: String | Number;
}

export interface Row {
    id: number;
    items: Item[];
}

export class Database {
    private headers!: Header[];
    private rows?: Row[];

    constructor(headers: Header[]) {
        this.headers=headers;
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

        
        let header_titles: String[] = this.headers.map((h: Header) => {
            return h.title + "|";
        });
        
        console.log(...header_titles);
        
        for (let r=0; r < this.rows.length; r++) {
            let row: Row = this.rows[r];
            let row_titles: String[] = row.items.map((i: Item) => {
                return i.value + "|";
            });

            console.log(...row_titles);
        }
    }

}