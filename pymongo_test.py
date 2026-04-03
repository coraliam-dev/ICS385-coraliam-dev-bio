import os
import logging
from pprint import pprint

from pymongo import MongoClient
from pymongo.errors import PyMongoError


logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


def main() -> None:
    mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
    client = None

    try:
        client = MongoClient(mongo_uri)
        db = client["week11_assignment"]
        collection_name = "Customer"

        logging.info("Connected to MongoDB")

        # Create Customer collection if needed
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)
            logging.info("1) Collection 'Customer' created")
        else:
            logging.info("1) Collection 'Customer' already exists")

        customers = db[collection_name]

        # Ensure unique emails
        customers.create_index("email", unique=True)

        # Delete all records
        delete_result = customers.delete_many({})
        logging.info("2) Cleared existing records: %d deleted", delete_result.deleted_count)

        # Insert many
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
        logging.info("3) Inserted %d records", len(insert_result.inserted_ids))

        # Updates
        update_email_result = customers.update_one(
            {"lastName": "Johnson"},
            {"$set": {"email": "alice.j.updated@example.com"}},
        )
        update_phone_result = customers.update_one(
            {"firstName": "Brian"},
            {"$set": {"phone": "808-555-9999"}},
        )

        logging.info(
            "4) Updated records: email matched=%d modified=%d; phone matched=%d modified=%d",
            update_email_result.matched_count,
            update_email_result.modified_count,
            update_phone_result.matched_count,
            update_phone_result.modified_count,
        )

        # Queries
        query_by_last_name = customers.find_one({"lastName": "Santos"}, {"_id": 0})
        query_by_first_name = customers.find_one({"firstName": "Alice"}, {"_id": 0})

        logging.info("5) Query by lastName='Santos':")
        pprint(query_by_last_name)
        logging.info("5) Query by firstName='Alice':")
        pprint(query_by_first_name)

        # Drop collection
        customers.drop()
        logging.info("6) Collection 'Customer' dropped")

    except PyMongoError as e:
        logging.error("MongoDB error: %s", e)
    finally:
        if client is not None:
            client.close()
            logging.info("Connection closed")


if __name__ == "__main__":
    main()