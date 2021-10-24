export default interface Card {
    id: Number;
    front_text: String;
    front_note?: String;
    front_image?: String;
    back_text: String;
    back_note?: String;
    back_image?: String;
    test_attempts: Number;
    test_successes: Number;
    category: String;
    subcategory: String;
}

//let cardimage = (document.getElementsByClassName('cardimage')[0] as HTMLImageElement).src = "1234";
//console.log("card: ", cardimage);
