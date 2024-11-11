from pymongo import MongoClient

# Replace <your_connection_string> with your actual MongoDB connection string
client = MongoClient("mongodb+srv://kambleraniu2001:manager@rani0.vuxtt.mongodb.net/")

# Connect to the 'test' database
db = client['test']

# Create or access the 'employee' collection
employee_collection = db['employee']

# Insert a record into the 'employee' collection
employee_data = {
    "name": "John Doe",
    "age": 30,
    "position": "Software Engineer",
    "department": "IT"
}

# Insert the document into the collection
result = employee_collection.insert_one(employee_data)
# print(f"Inserted record with ID: {result.inserted_id}")


employee_collection.insert_one({
    "name": "Smith Doe",
    "age": 35,
    "position": "Mechanical Engineer",
    "department": "CS"
})


employee_collection.insert_one({
    "name": "Vicky Doe",
    "age": 45,
    "position": "CS Engineer",
    "department": "CS"
})

employee_collection.delete_one({
    "name": "Vicky Doe"
})