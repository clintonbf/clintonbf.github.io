function get_chair_collection(db_ref){
    return db_ref.collection("Chairs");
}

function get_sales_collection(db_ref) {
    return db_ref.collection("Sales");
}

//Code to destroy database
function destroy_database (db_ref) {
    let chair_colctn = get_chair_collection(db_ref);

    chair_colctn.get().then(function(docs) {
        docs.forEach(function(doc) {
            doc.delete().then(function() {
                console.log("Deleted record for " + doc.data().name);
            })
        })
    })
        .catch(function(error) {
            console.log("Threw error " + error);
        });
}

function delete_chair_record(db_ref, chair){
    let chair_collection = get_chair_collection(db_ref);

    chair_collection.doc(chair).delete().then(function() {
        console.log("Deleted " + chair);
    }).catch(function(error) {
        console.error("Whoops " + error);
    });
}

//Code for building the Chairs collection
// Insert a chair
function insert_chair_to_firestore(add_chair, id, collection_name){
    the_db.collection(collection_name).doc("chair_" + id).set({
        id: id,
        name: add_chair.name,
        price: add_chair.price,
        firmness: add_chair.comfort_options.firmness,
        back_support: add_chair.comfort_options.back_support,
        arms: add_chair.comfort_options.arms,
        ratings: add_chair.ratings,
        picture: add_chair.picture
    })
        .then(function() {
            console.log("Added chair " + add_chair.name);
        })
        .catch(function(error) {
            console.log("Error adding chair: " + error);
        });
}

//Create an array of Chairs
// Beware! This code is replicated in SAQ_functions.js. But, since imports are so difficult I've elected to keep it duplicated.
function create_chairs_array() {
    let chair_array = [];
    let chair_path = "images/chair_images/";
    chair_array.push(new Chair('chair_01', "the Clint", 525, [3, true, false], [1, 2, 1, 5, 5, 5, 4], chair_path + 'the_clint.jpg'));
    chair_array.push(new Chair(2, "the Fahad", 800, [1, true, true], [3, 3, 3], chair_path + 'the_fahad.png'));
    chair_array.push(new Chair(3, "the Em", 1250, [6, true, true], [5, 5], chair_path + 'the_em.jpeg'));
    chair_array.push(new Chair(4, "the Neda", 3200, [6, true, true], [5], chair_path + 'the_neda.jpg'));
    chair_array.push(new Chair(5, "the Sam", 800, [9, false, false], [3, 5], chair_path + 'the_sam.jpg'));
    chair_array.push(new Chair(6, "the Chris", 1000, [10, true, true], [1, 2, 3, 4, 5], chair_path + 'the_chris.jpg'));

    return chair_array;
}

//Initialize Firestore with chairs
function initialize_chair_collection(collection_name) {
    let chair_collection = create_chairs_array();

    for (let i = 0; i < chair_collection.length; i++) {
        insert_chair_to_firestore(chair_collection[i], i, collection_name);
    }
}

//Code for building the Sales collection
//Insert a sale
function insert_sale(sale) {
    the_db.collection("Sales").doc("sale_" + sale.transaction_id).set({
        transaction_id: sale.transaction_id,
        chair: sale.chair,
        sold_to: sale.buyer,
        sale_date: sale.sale_date
    })
        .then(function () {
            console.log("Added sale " + sale.transaction_id);
        })
        .catch(function(error) {
            console.log("Error adding sale: " + error);
        });
}

// Initialize Firestore with sales
function insert_sales() {
    let sale_array = [];
    sale_array.push(new Sale(generate_trans_id(), "the Clint", "Boogie Woogie", "Oct 14, 2019"));
    sale_array.push(new Sale(generate_trans_id(), "the Clint", "GitMaster", "Oct 15, 2019"));
    sale_array.push(new Sale(generate_trans_id(), "the Neda", "Neda", "Oct 31, 2019"));
    sale_array.push(new Sale(generate_trans_id(), "the Neda", "Sam", "Nov 31, 2019"));

    for (let j = 0; j < sale_array.length; j++) {
        insert_sale(sale_array[j]);
    }
}