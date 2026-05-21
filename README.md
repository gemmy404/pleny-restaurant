# Pleny Restaurant Task API

A backend RESTful API built with NestJS, MongoDB, and Mongoose for managing restaurants, users, restaurant follows, nearby restaurant search using GeoSpatial Queries, and restaurant recommendations using MongoDB Aggregation Pipeline.

---

# Features

## Restaurant Management Module

* Create restaurant
* Get all restaurants
* Filter restaurants by cuisine
* Get restaurant details by:

    * MongoDB ObjectId
    * Slug
* Find nearby restaurants within a 1KM radius using MongoDB GeoSpatial Queries

---

## Users Module

* Create users
* Get all users
* Get user details by:
  * MongoDB ObjectId

---

## Restaurant Follow Module

* Users can follow restaurants
* Get my followed restaurants by userId

---

## Recommendation Module

Restaurant recommendation module powered by MongoDB Aggregation Pipeline.

### Recommendation Logic

1. Find users who share the same favorite cuisine
2. Retrieve restaurants followed by those users
3. Return:

    * Similar users
    * Recommended restaurants

---

# Tech Stack

* Language: TypeScript
* Framework: NestJS
* Database: MongoDB
* Containerization: Docker
* Documentation: Swagger

---

# Project Structure

```txt
.
├── src
│   ├── common
│   ├── modules
│   │   ├── recommendations
│   │   ├── restaurant-follows
│   │   ├── restaurants
│   │   └── users
│   ├── app.module.ts
│   └── main.ts
│
├── Dockerfile
├── docker-compose.yml
├── pleny-restaurant.postman_collection.json
├── .dockerignore
├── .env
├── package.json
├── package-lock.json
└── README.md
```
---

# API Endpoints

## Restaurants

| Method | Endpoint                          | Description                  |
| ------ | --------------------------------- | ---------------------------- |
| POST   | `/api/v1/restaurants`             | Create restaurant            |
| GET    | `/api/v1/restaurants`             | Get all restaurants          |
| GET    | `/api/v1/restaurants/:identifier` | Get restaurant by id or slug |
| GET    | `/api/v1/restaurants/nearby`      | Find nearby restaurants      |

---

## Users

| Method | Endpoint                | Description    |
| ------ |-------------------------|----------------|
| POST   | `/api/v1/users`         | Create user    |
| GET    | `/api/v1/users`         | Get all users  |
| GET    | `/api/v1/users/:userId` | Get user by id |

---

## Restaurant Follows

| Method | Endpoint                                  | Description                 |
|--------|-------------------------------------------|-----------------------------|
| POST   | `/api/v1/restaurant-follows`              | Follow restaurant           |
| GET    | `/api/v1/restaurant-follows/user/:userId` | Get my followed restaurants |

---

## Recommendations

| Method | Endpoint                               | Description                    |
| ------ |----------------------------------------| ------------------------------ |
| GET    | `/api/v1/recommendations/user/:userId` | Get restaurant recommendations |

---

# GeoSpatial Queries

The project uses MongoDB GeoSpatial Queries with:

* `GeoJSON Point`
* `2dsphere Index`
* `$geoNear`

Example:

```json
{
  "location": {
    "type": "Point",
    "coordinates": [31.2357, 30.0444]
  }
}
```

---

# Aggregation Pipeline

The recommendation system uses MongoDB Aggregation Pipeline operators such as:

* `$lookup`
* `$match`
* `$expr`
* `$setIntersection`
* `$map`
* `$project`

---

# Environment Variables

Create a `.env` file in the project root:

```env
PORT=
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGODB_URI=
```

---

````md id="7vesof"
# Running the Project

## Install dependencies

```bash
npm install
````

---

## Run development server

```bash
npm run start:dev
```

---

## Run production build

```bash
npm run build
npm run start:prod
```

---

# Docker

## Build and start containers

```bash
docker compose up -d --build
```

---

# Swagger Documentation

Swagger UI is available at:

```txt
http://localhost:3000/api-docs
```

---

# Example Nearby Restaurants Request

```http
GET /api/v1/restaurants/nearby?lng=31.2357&lat=30.0444
```

---

# Example Recommendation Response

```json
{
  "similarUsers": [],
  "recommendedRestaurants": []
}
```

---

# Validation & Best Practices

* DTO Validation using `class-validator`
* Global Validation Pipe
* Modular Architecture
* Clean Code Principles
* Reusable Mappers
* MongoDB Indexing
---