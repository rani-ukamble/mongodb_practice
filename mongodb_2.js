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



// 1. Calculate Average Order Value for Each Customer

// db.orders.aggregate([
//     {$group: {
//       _id: "$customer_id",
//       avgOrder : {
//         $avg: "$total"
//       }
//     }}
// ])



// 2. Count the Number of Orders by Status

// db.orders.aggregate([
//     {
//         $group: {
//             _id: "$status",
//             count: { $sum: 1 }
//         }
//     }
// ])    



// 3. Calculate Total Quantity of Each Product Sold 

// db.orders.aggregate([
//     // This stage deconstructs the items array in each order document
//     { $unwind: "$items" },
//     { $group: {
//         _id: "$items.product",
//         totalQty: { $sum: "$items.quantity" }
//     }}
// ]);




// 4. Find Top 3 Customers by Total Spending

// db.orders.aggregate([
//     {
//         $group: {
//             _id: "$customer_id",
//             totalSpending: { $sum: "$total" }
//         }
//     },
//     { $sort: { totalSpending: -1 } }, // Sort by totalSpending in descending order
//     { $limit: 3 } 
// ]);




// 4. Find the Customer with the Most Orders

// db.orders.aggregate([
//     {$group: {
//       _id: "$customer_id",
//       totalOrders: {
//         $sum : 1
//       }
//     }},
//     { $sort: { totalOrders: -1 }},
//     { $limit: 1 },
// ])  




// 4. Find the Customer name with the Most Orders 

// db.orders.aggregate([
//     {
//         $group: {
//             _id: "$customer_id",
//             totalOrders: {
//                 $sum: 1
//             }
//         }
//     },
//     { $sort: { totalOrders: -1 } },
//     { $limit: 1 },

//     {
//         $lookup: {
//             from: "customers",                // Correct collection name in quotes
//             localField: "_id",                // Match _id field of the customer
//             foreignField: "_id",              // Match _id field in orders
//             as: "customerDetails"             // Store result as "customerDetails"
//         }
//     },

//     {
//         $project: {
//             _id: 0,                           // Exclude the _id field
//             customerName: { $arrayElemAt: ["$customerDetails.name", 0] }, // Get the customer name
//             totalOrders: 1                    // Include the totalOrders field
//         }
//     }
// ]);





//5. Update Multiple Order Statuses in Bulk

// db.orders.updateMany(
//     { status: "Shipped" },           // Filter documents with status "Shipped"
//     { $set: { status: "Dispatched" }} // Set the status to "Dispatched"
// )

// db.orders.find({status: "Dispatched"}) 




//6. Calculate Total Sales for Each Day

// db.orders.aggregate([
//     {
//         $group: {
//             _id: "$date",                    // Group by the date field
//             totalSales: { $sum: "$total" }   // Sum the "total" field for each date
//         }
//     }
// ])




// 7. Retrieve Orders by Customer Address (Using Lookup)

// db.orders.aggregate([
//     {
//         $lookup: {
//             from: "customers",                 // Name of the collection to join with
//             localField: "customer_id",         // Field in the "orders" collection
//             foreignField: "_id",               // Matching field in the "customers" collection
//             as: "customerDetails"              // Output array field with customer details
//         }
//     },
//     {
//         $project: {
//             _id: 1,
//             date: 1,
//             items: 1,
//             status: 1,
//             total: 1,
//             "customerDetails.address": 1      // Include only the address field from customer details
//         }
//     }
// ])




//8. Remove All Customers Without Orders

// db.customers.aggregate([
//     {
//       $lookup: {
//         from: "orders",              // Join with the "orders" collection
//         localField: "_id",           // Match the customer _id with the customer_id in orders
//         foreignField: "customer_id", // The field in orders that references customers
//         as: "customerOrders"         // The name of the array to hold the matched orders
//       }
//     },
//     {
//       $match: { "customerOrders": { $size: 0 } } // Find customers with no orders (empty array)
//     },
//     { 
//       $merge: { into: "customers_to_delete" }   // Collect the customers to delete into a temporary collection
//     }
//   ]);
  
//   // 5. Now, delete the customers without orders
//   db.customers.deleteMany({ _id: { $in: db.customers_to_delete.distinct("_id") } });
  
//   // 6. Clean up the temporary collection
//   db.customers_to_delete.drop();


// db.customers.findOne({_id: 3})  



