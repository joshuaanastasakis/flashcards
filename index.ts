import Card from './card';
import { Database, Header, Row, Item, Type } from './database';

let cards: Card[] = [];
let categories: String[] = [];
let subcategories: String[] = [];

let currentcard: Card;

let header: Header[] = [
    { type: Type.NUMBER, key: "id", title: "ID" },
    { type: Type.STRING, key: "front_text", title: "Front Text" },
    { type: Type.STRING, key: "front_note", title: "Front Note" },
    { type: Type.STRING, key: "back_text", title: "Back Text" },
    { type: Type.STRING, key: "back_note", title: "Back Note" },
    { type: Type.NUMBER, key: "test_attempts", title: "Test Attempts" },
    { type: Type.NUMBER, key: "test_successes", title: "Test Successes" },
    { type: Type.STRING, key: "category", title: "Category" },
    { type: Type.STRING, key: "subcategory", title: "Subcategory" }
];

let row1: Row = {
    id: 1,
    items: [
        <Item> {
            key: "id",
            value: 1
        },
        <Item> {
            key: "front_text",
            value: "Hello"
        },
        <Item> {
            key: "front_note",
            value: "English"
        },
        <Item> {
            key: "back_text",
            value: "Hallo"
        },
        <Item> {
            key: "back_note",
            value: "German"
        },
        <Item> {
            key: "test_attempts",
            value: 0
        },
        <Item> {
            key: "test_successes",
            value: 0
        },
        <Item> {
            key: "category",
            value: "German"
        },
        <Item> {
            key: "subcategory",
            value: "Greeting"
        }
    ]
};

let db = new Database("file:\\C:\Users\Josh\Documents\Programming\Projects\flashcards\inputs\input.csv");

db.addRow(row1);

db.print();




// let cardimage = (document.getElementsByClassName('cardimage')[0] as HTMLImageElement).src = "1234";
// console.log("card: ", cardimage);
