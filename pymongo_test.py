import os
from pprint import pprint

from pymongo import MongoClient


def main() -> None:
	# Update MONGO_URI if needed, or export it in your shell.
	mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

	# You can change this DB name if your instructor expects a specific one.
	client = MongoClient(mongo_uri)
	db = client["week11_assignment"]
	collection_name = "Customer"

	print("Connected to MongoDB")

	# 1) Create Customer collection (if not already present)
	if collection_name not in db.list_collection_names():
		db.create_collection(collection_name)
		print("1) Collection 'Customer' created")
	else:
		print("1) Collection 'Customer' already exists")

	customers = db[collection_name]

	# Ensure unique emails
	customers.create_index("email", unique=True)

	# 2) Delete all records to clean up
	delete_result = customers.delete_many({})
	print(f"2) Cleared existing records: {delete_result.deleted_count} deleted")

	# 3) Insert many (3 separate customer records)
	seed_customers = [
		{
			"firstName": "Alice",
			"lastName": "Johnson",
			"email": "alice.johnson@example.com",
			"phone": "808-555-1001",
		},
		{
			"firstName": "Brian",
			"lastName": "Kim",
			"email": "brian.kim@example.com",
			"phone": "808-555-1002",
		},
		{
			"firstName": "Carla",
			"lastName": "Santos",
			"email": "carla.santos@example.com",
			"phone": "808-555-1003",
		},
	]

	insert_result = customers.insert_many(seed_customers)
	print(f"3) Inserted {len(insert_result.inserted_ids)} records")

	# 4) Update one customer's email and another customer's phone
	update_email_result = customers.update_one(
		{"lastName": "Johnson"},
		{"$set": {"email": "alice.j.updated@example.com"}},
	)

	update_phone_result = customers.update_one(
		{"firstName": "Brian"},
		{"$set": {"phone": "808-555-9999"}},
	)

	print(
		"4) Updated records: "
		f"email update matched={update_email_result.matched_count}, modified={update_email_result.modified_count}; "
		f"phone update matched={update_phone_result.matched_count}, modified={update_phone_result.modified_count}"
	)

	# 5) Query one by last name, and another by first name
	query_by_last_name = customers.find_one({"lastName": "Santos"}, {"_id": 0})
	query_by_first_name = customers.find_one({"firstName": "Alice"}, {"_id": 0})

	print("5) Query by lastName='Santos':")
	pprint(query_by_last_name)
	print("5) Query by firstName='Alice':")
	pprint(query_by_first_name)

	# 6) Drop Customer collection
	customers.drop()
	print("6) Collection 'Customer' dropped")

	client.close()
	print("Done")


if __name__ == "__main__":
	main()