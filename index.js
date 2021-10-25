"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var cards = [];
var categories = [];
var subcategories = [];
var currentcard;
var header = [
    { type: database_1.Type.NUMBER, key: "id", title: "ID" },
    { type: database_1.Type.STRING, key: "front_text", title: "Front Text" },
    { type: database_1.Type.STRING, key: "front_note", title: "Front Note" },
    { type: database_1.Type.STRING, key: "back_text", title: "Back Text" },
    { type: database_1.Type.STRING, key: "back_note", title: "Back Note" },
    { type: database_1.Type.NUMBER, key: "test_attempts", title: "Test Attempts" },
    { type: database_1.Type.NUMBER, key: "test_successes", title: "Test Successes" },
    { type: database_1.Type.STRING, key: "category", title: "Category" },
    { type: database_1.Type.STRING, key: "subcategory", title: "Subcategory" }
];
var row1 = {
    id: 1,
    items: [
        {
            key: "id",
            value: 1
        },
        {
            key: "front_text",
            value: "Hello"
        },
        {
            key: "front_note",
            value: "English"
        },
        {
            key: "back_text",
            value: "Hallo"
        },
        {
            key: "back_note",
            value: "German"
        },
        {
            key: "test_attempts",
            value: 0
        },
        {
            key: "test_successes",
            value: 0
        },
        {
            key: "category",
            value: "German"
        },
        {
            key: "subcategory",
            value: "Greeting"
        }
    ]
};
var db = new database_1.Database("file:\\C:\Users\Josh\Documents\Programming\Projects\flashcards\inputs\input.csv");
db.addRow(row1);
db.print();
// let cardimage = (document.getElementsByClassName('cardimage')[0] as HTMLImageElement).src = "1234";
// console.log("card: ", cardimage);
