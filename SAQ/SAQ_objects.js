//Define chair object
function Chair(id, name, price, comfort_options, ratings, picture){
    this.id = id;
    this.name = name;
    this.price = price;
    this.comfort_options = {
        firmness: comfort_options[0],
        back_support: comfort_options[1],
        arms: comfort_options[2]
    };
    this.ratings = ratings;  // an array
    this.picture = picture;
    return this
}

//Define the sales object
function Sale(transaction_id, sold_chair, buyer, date) {
    this.transaction_id = transaction_id;
    this.chair = sold_chair;  // Chair object
    this.buyer = buyer;
    this.sale_date = date;
}

//Define the subscription-user object
function User(user_id, name, surname) {
    this.user_id = user_id;
    this.name = name;
    this.surname = surname;

    this.tried_chairs = [ //Want an array of dictionaries
        chair_id = null,
        date_acquired = null,
        date_returned = null
    ];

    // try_chair(chair_id, date): { // Not sure how to pass arguments to JS object methods....
    try_chair: {
        this.tried_chairs.chair_id = chair_id;
        this.date_acquired = date;
    }
}





