use('orderDB')

// db.createCollection('customers') 

// db.createCollection('orders')

// db.customers.insertMany([
//     {
//         _id: 1,
//         name: "Alice Johnson",
//         email: "alice@example.com",
//         address: "123 Elm Street"
//       },
//       {
//         _id: 2,
//         name: "Bob Smith",
//         email: "bob@example.com",
//         address: "456 Oak Avenue"
//       },
//       {
//         _id: 3,
//         name: "Leena Smith",
//         email: "leena@example.com",
//         address: "456 Oak Avenue"
//       }
//     ])


// db.orders.insertMany([
//     {
//         _id: 5001,
//         customer_id: 1,
//         date: new Date("2024-11-01"),
//         items: [
//           { product: "Smartphone", quantity: 1, price: 499.99 },
//           { product: "Laptop", quantity: 1, price: 999.99 }
//         ],
//         status: "Pending",
//         total: 1499.98
//       },
//       {
//         _id: 5002,
//         customer_id: 2,
//         date: new Date("2024-11-05"),
//         items: [
//           { product: "Python Programming Book", quantity: 2, price: 29.99 }
//         ],
//         status: "Shipped",
//         total: 59.98
//       }
// ])



// db.orders.updateOne({_id: 5001}, {$set:{status: "Shipped"}})

// db.orders.find({_id: 5001})



// db.orders.find()




// var id1 = db.customer.findOne({name:"Alice Johnson"}) 

// db.customer.find({_id:id1}) 



// Update the quantity of an item in an order (e.g., change the quantity of a product in Alice Johnson's order).

// var customer = db.customers.findOne({ name: "Alice Johnson" });

// if (customer) {
//     // Update the quantity of "Smartphone" in Alice's order
//     db.orders.updateOne(
//         { customer_id: customer._id, "items.product": "Smartphone" }, // Correctly accessing items.product
//         { $set: { "items.$.quantity": 3 } } // Update the quantity of "Smartphone" to 3
//     );

//     // Update the quantity of "Laptop" in Alice's order
//     db.orders.updateOne(
//         { customer_id: customer._id, "items.product": "Laptop" }, // Correctly accessing items.product
//         { $set: { "items.$.quantity": 4 } } // Update the quantity of "Laptop" to 4
//     );
// } else {
//     print("Customer not found");
// }





// Find all orders placed after a specific date (e.g., November 3rd). 

// db.orders.find({
//     date: {$gt: new Date("2024-11-03")} 
// })  




// Q. Aggregate the total sales for a all customers.

// db.orders.aggregate([
//     {
//         $group: {
//             _id: "$customer_id",        // Group by customer_id
//             totalSales: { $sum: "$total" }  // Calculate the sum of total sales for each customer
//         }
//     }
// ]);




// Q. Aggregate the total sales for a specific customer. 

// var customer = db.customers.findOne({ name: "Alice Johnson" });

// if (customer) {
//   db.orders.aggregate([
//     { $match: { customer_id: customer._id } },  
//     {
//       $group: {
//         _id: "$customer_id",                     
//         totalSales: { $sum: "$total" }         
//       }
//     }
//   ]);
// }     




// find order details of customer name : name:"Alice Johnson .

// var customer = db.customers.findOne({ name: "Alice Johnson" });
// if (customer) {
//   db.orders.find({ customer_id: customer._id });
// } 




// Aggregate the Total Sales for a Specific Customer

// var customer = db.customers.findOne({ name: "Alice Johnson" });

// if (customer) {
//   db.orders.aggregate([
//     { $match: { customer_id: customer._id } },
//     { $group: { _id: "$customer_id", totalSales: { $sum: "$total" } } } // Sum the total field
//   ]);
// } else {
//   print("Customer not found");
// }





// Aggregate the Total Sales 

// db.orders.aggregate([
//     {
//         $group: {
//             _id: "$customer_id",           // Group by customer_id
//             totalSales: { $sum: "$total" }  // Sum up the "total" field for each customer
//         }
//     }])   




// Remove all orders that are in "Pending" status and older than 7 days.
// 
// db.orders.deleteMany({
//     status: "Pending",
//     date: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
// })


