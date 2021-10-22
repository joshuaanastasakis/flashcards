console.log("wokking");

interface Card {
    id: Number;
    front_text: String;
    front_note: String;
    front_image?: String;
    back_text: String;
    back_note: String;
    back_image?: String;
    test_attempts: Number;
    test_successes: Number;
}




let cardimage = (document.getElementsByClassName('cardimage')[0] as HTMLImageElement).src = "1234";
console.log("card: ", cardimage);
