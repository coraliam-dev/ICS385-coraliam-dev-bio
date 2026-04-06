# Term Project 3: Hawaiian Hospitality Property Management System

## Week 11 Progress

### Project Overview
This project builds a full-stack web application for managing Hawaiian hospitality properties (hotels and vacation rentals) with guest reviews. The backend uses Node.js/Express and MongoDB via Mongoose; the frontend will expand to React in Weeks 12–13.

**Island Selected:** Maui  
**Property Selected:** Fairmont Kea Lani  
**Property Type:** Luxury Resort Hotel

### Week 10 Summary (Foundation)
- Designed Mongoose Property schema with 8+ fields (name, island, type, description, amenities, targetSegment, imageURL, createdAt)
- Created seed.js to populate MongoDB with initial property data
- Verified MongoDB Atlas cloud connection
- Made initial GitHub commit with schema and seed files

### Week 11 Deliverables (This Week)

#### 1. **Review Sub-Schema** (Embedded Documents)
Added a `reviewSchema` embedded inside each Property document:
- `guestName` (String, required) — name of guest leaving review
- `rating` (Number 1–5, required) — review rating
- `comment` (String) — review text
- `date` (Date, auto-set to now) — timestamp of review

**Rationale:** Reviews are tightly coupled to a single property and always accessed together, making embedding the natural choice over a separate collection.

#### 2. **Express REST Routes**

| Method | Route | Purpose | Status |
|--------|-------|---------|--------|
| GET | `/properties` | List all properties (with optional filters); renders EJS template | ✅ Complete |
| GET | `/properties/:id` | Fetch single property by MongoDB ObjectId | ✅ Complete |
| POST | `/properties/:id/reviews` | Add a review to a property | ✅ Complete |

**Query Operators Implemented:**
- `$gte` (greater than or equal) — filter by minimum rating
- `$lte` (less than or equal) — filter by maximum rating
- `$elemMatch` — query nested review arrays

**Example Request:**
```
GET /properties?island=Maui&minRating=4
```
Returns all Maui properties with at least one review rated 4 or higher.

#### 3. **EJS Template UI**
Created `/views/properties.ejs` — a basic HTML template that:
- Loops through all properties via `<% properties.forEach() %>`
- Displays property name, island, type, description
- Shows review count and average rating
- No styling yet (plain HTML; will enhance with CSS in Week 12)

#### 4. **Postman Testing & Export**
Tested all three routes in Postman with realistic request bodies:
- `GET /properties` — returns JSON array of all properties
- `GET /properties/[ObjectId]` — returns single property with all reviews
- `POST /properties/[ObjectId]/reviews` — adds new review and returns updated property

Exported collection as `postman_collection.json` committed to repo.

#### 5. **File Structure**
```
week11/term-project/
├── models/
│   └── Property.js           (Mongoose schema + Review sub-schema)
├── routes/
│   └── properties.js         (all three CRUD routes)
├── views/
│   └── properties.ejs        (EJS template for /properties)
├── app.js                    (Express server + Mongoose connection)
├── package.json              (dependencies: express, mongoose, ejs, dotenv)
├── .env                      (MONGODB_URI, PORT — NOT committed)
├── .gitignore                (excludes node_modules, .env)
├── seed.js                   (populate initial data)
├── postman_collection.json   (exported Postman collection)
└── README.md                 (this file)
```

### Installation & Setup

1. **Navigate to week11/term-project/**
   ```bash
   cd week11/term-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file** (do NOT commit this)
   ```
   MONGODB_URI=mongodb+srv://[username]:[password]@cluster0.mongodb.net/week11?retryWrites=true&w=majority
   PORT=3000
   ```

4. **Run seed.js to populate database**
   ```bash
   node seed.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. **Access the application**
   - EJS listing: `http://localhost:3000/properties`
   - JSON API: `http://localhost:3000/properties?format=json`

### Testing Routes

#### GET /properties (EJS render)
```bash
curl http://localhost:3000/properties
```

#### GET /properties/:id (single property)
```bash
curl http://localhost:3000/properties/[objectId]
```

#### POST /properties/:id/reviews (add review)
```bash
curl -X POST http://localhost:3000/properties/[objectId]/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "guestName": "John Doe",
    "rating": 5,
    "comment": "Amazing oceanfront property!"
  }'
```

### Learning Reflections (Week 11)

**What I Built:**
This week I extended the Week 10 Property schema by embedding a Review sub-document, then built three Express routes that handle the core CRUD operations for properties and reviews. The GET /properties route now renders an EJS template directly to the browser, bridging the gap between my MongoDB database and a simple web UI. Using Mongoose query operators ($gte, $lte), I added filtering capability so users can search properties by island or minimum rating.

**What I Learned:**
- **Schema Design:** Understood when to embed vs. reference; embedding reviews inside properties made sense because reviews are always accessed together with their property.
- **Mongoose Operators:** Learned how MongoDB's $gte and $lte comparison operators work; used $elemMatch to query nested arrays of reviews.
- **EJS Templating:** Saw how server-side templates like EJS can render dynamic HTML by looping through data passed from Express routes (res.render()).
- **REST API Testing:** Exported a Postman collection and verified all three routes return the correct status codes and JSON structures.
- **Git Workflow:** Made meaningful commits with clear messages (e.g., "Add Review schema and POST /properties/:id/reviews") so the project history is transparent.

**Next Steps (Weeks 12–13):**
In Week 12, I will replace the EJS template with a React component-based marketing page that consumes the GET /properties/:id endpoint. In Week 13, I'll add a visitor statistics dashboard with Chart.js and integrate the OpenWeatherMap API to display current weather for my island. The REST API I built this week will power both of those front-ends.

---

### Commits This Week

- `Add Review schema to Property model` — embedded reviewSchema
- `Add GET /properties, GET /:id, POST /:id/reviews routes` — CRUD routes with $gte/$lte filtering
- `Add properties.ejs EJS template` — basic listing UI
- `Export Postman collection` — testable API documentation
- `Update README with Week 11 scope and reflections`

---

### Resources Used

- [Mongoose Schemas](https://mongoosejs.com/docs/guide.html)
- [Mongoose Validation](https://mongoosejs.com/docs/validation.html)
- [W3Schools MongoDB Operators](https://www.w3schools.com/python/python_mongodb_getstarted.asp)
- [Postman Documentation](https://learning.postman.com/docs/getting-started/first-steps/)
- [EJS Documentation](https://ejs.co/)

---

**Author:** Corita  
**Course:** ICS 385 — Spring 2026  
**Week:** 11