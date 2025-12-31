# 🚨 Hazard API

Een RESTful API voor het beheren van hazards (gevaren) en categorieën, gebouwd met Node.js, Express en MongoDB.

## 📋 Inhoudsopgave

- [Technische Stack](#-technische-stack)
- [Installatie](#-installatie)
- [Gebruik](#-gebruik)
- [API Endpoints](#-api-endpoints)
- [Validatie](#-validatie)
- [Voorbeelden](#-voorbeelden)
- [Extra Features](#-extra-features)
- [Project Structuur](#-project-structuur)
- [Scripts](#-scripts)
- [Database Seeding & Demo](#-database-seeding--demo)
- [Error Responses](#-error-responses)
- [Development Environment](#-development-environment)
- [Bronvermelding](#-bronvermelding)

## 🛠 Technische Stack

| Technologie | Versie |
|-------------|--------|
| Node.js | v20+ |
| Express | v5.2.1 |
| MongoDB | - |
| Mongoose | v9.1.0 |

## 🚀 Installatie

### Vereisten
- Node.js v20 of hoger
- MongoDB database (lokaal of cloud, bijv. MongoDB Atlas)

### Stappen

1. **Clone de repository**
   ```bash
   git clone <repository-url>
   cd Hazard_api
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Configureer environment variabelen**
   
   Maak een `.env` bestand aan in de root folder:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hazard_db
   ```

4. **Start de server**
   ```bash
   # Development mode (met auto-reload)
   npm run dev

   # Production mode
   npm run serve
   ```

5. **Open de documentatiepagina**
   
   Ga naar `http://localhost:3000` in je browser voor de volledige API documentatie.

## 📖 Gebruik

De API draait standaard op `http://localhost:3000`.

### Basis URL
```
http://localhost:3000/api
```

### Documentatie
Bezoek de root URL (`http://localhost:3000`) voor de documentatiepagina met alle endpoints.

## 🔗 API Endpoints

### Categories

| Method | Endpoint | Beschrijving | Query Parameters |
|--------|----------|--------------|------------------|
| `GET` | `/api/categories` | Alle categorieën ophalen | `limit`, `offset` |
| `GET` | `/api/categories/search` | Categorieën zoeken | `q` (zoekterm) |
| `GET` | `/api/category/:id` | Eén categorie ophalen | - |
| `POST` | `/api/categories` | Nieuwe categorie aanmaken | - |
| `PUT` | `/api/category/:id` | Categorie updaten | - |
| `DELETE` | `/api/category/:id` | Categorie verwijderen | - |

### Hazards

| Method | Endpoint | Beschrijving | Query Parameters |
|--------|----------|--------------|------------------|
| `GET` | `/api/hazards` | Alle hazards ophalen | `limit`, `offset`, `sortBy`, `order` |
| `GET` | `/api/hazards/search` | Hazards zoeken | `q` (zoekterm) |
| `GET` | `/api/hazard/:id` | Eén hazard ophalen | - |
| `POST` | `/api/hazards` | Nieuwe hazard aanmaken | - |
| `PUT` | `/api/hazard/:id` | Hazard updaten | - |
| `DELETE` | `/api/hazard/:id` | Hazard verwijderen | - |

## ✅ Validatie

### Category Schema
| Veld | Type | Validatie |
|------|------|-----------|
| `name` | String | Verplicht, geen cijfers toegestaan, uniek |
| `description` | String | Verplicht |
| `color` | String | Optioneel, default: `#FF0000` |

### Hazard Schema
| Veld | Type | Validatie |
|------|------|-----------|
| `name` | String | Verplicht, geen cijfers toegestaan |
| `description` | String | Verplicht |
| `severity` | Number | Verplicht, waarde 1-5 |
| `category` | ObjectId | Verplicht, referentie naar Category |

## 💡 Voorbeelden

### Categorie aanmaken
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chemical Hazards",
    "description": "Gevaren gerelateerd aan chemische stoffen",
    "color": "#FF5733"
  }'
```

### Hazard aanmaken
```bash
curl -X POST http://localhost:3000/api/hazards \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fire Risk",
    "description": "Risico op brand op de werkplek",
    "severity": 4,
    "category": "<category-id>"
  }'
```

### Hazards ophalen met pagination & sorting
```bash
curl "http://localhost:3000/api/hazards?limit=5&sortBy=severity&order=desc"
```

Response:
```json
{
  "data": [...],
  "pagination": {
    "total": 25,
    "limit": 5,
    "offset": 0,
    "hasMore": true,
    "sortBy": "severity",
    "order": "desc"
  }
}
```

### Hazards zoeken
```bash
curl "http://localhost:3000/api/hazards/search?q=fire"
```

## 🌟 Extra Features

Deze features zijn toegevoegd bovenop de minimumvereisten:

### Geavanceerd Sorteren
De `GET /api/hazards` endpoint ondersteunt nu dynamisch sorteren:
- **`sortBy`**: Sorteer op `name`, `severity`, of `createdAt`.
- **`order`**: Kies tussen `asc` (oplopend) of `desc` (aflopend).
- **Validatie**: De API valideert of de opgegeven sorteervelden bestaan om fouten te voorkomen.

## 📁 Project Structuur

```
Hazard_api/
├── app.js                  # Hoofdapplicatie met alle routes
├── models/
│   ├── hazard.model.js     # Hazard Mongoose model
│   └── category.model.js   # Category Mongoose model
└── public/
    ├── css/
    │   └── style.css       # CSS stijlen
    └── index.html          # API documentatiepagina
├── seed.js                 # Seed script
├── package-lock.json       # Lock file voor package.json
├── package.json            # Project configuratie
└── .gitignore              # Git ignore file
```

## 📝 Scripts

| Script | Commando | Beschrijving |
|--------|----------|--------------|
| Dev | `npm run dev` | Start server met nodemon (auto-reload) |
| Serve | `npm run serve` | Start server in production mode |
| Seed | `node seed.js` | Reset database en vul met demo data |

## 🧪 Database Seeding & Demo

Voor een demo te kunnen creëeren is er een seeder script aanwezig dat de database vult met realistische testdata. Dit zodat er gemakkelijk kan getoond worden hoe de API werkt.

**Let op:** Dit script verwijdert eerst alle bestaande hazards en categorieën voordat het de nieuwe data toevoegt.

```bash
node seed.js
```

De seeder voegt automatisch 8 categorieën (zoals Fire, Chemical, Electrical) en 16 specifieke hazards toe.

## ❌ Error Responses

| Status Code | Beschrijving |
|-------------|--------------|
| `400` | Bad Request - Ongeldige input of ontbrekende velden |
| `404` | Not Found - Resource bestaat niet |
| `500` | Internal Server Error - Serverfout |


## 🧑‍💻 Development Environment

Dit project is ontwikkeld met gebruik van:
- IDE: Visual Studio Code
- Extensions: Live Server, MongoDB
- API Testing: Postman

## 📚 Bronvermelding

### Documentatie
- [Node.js Documentation](https://nodejs.org/docs/latest/api/) - Officiële Node.js documentatie
- [Express.js Documentation](https://expressjs.com/) - Express framework documentatie
- [MongoDB Documentation](https://www.mongodb.com/docs/) - MongoDB database documentatie
- [StackOverflow](https://stackoverflow.com/) - StackOverflow:
    - [Seed data in node.js-mongoose](https://stackoverflow.com/questions/44427563/what-is-the-best-way-to-seed-data-in-nodejs-mongoose)

### Tutorials & Guides
- [How to Start to Build an API](https://www.youtube.com/watch?v=_7UQPve99r4) - FreeCodeCamp: CRUD API Tutorial - Node, Express, MongoDB
- [RESTful API Design](https://restfulapi.net/) - Best practices voor REST API's
- [Express Routing](https://expressjs.com/en/guide/routing.html) - Voor het gebruik van Routing in Express

### Tools
- [Postman](https://www.postman.com/) - API testing tool
- [npm](https://www.npmjs.com/) - Node Package Manager
- [Nodemon](https://www.npmjs.com/package/nodemon) - Auto-reload tool voor Node.js development

### Design Inspiratie
- [Postman Documentation](https://learning.postman.com/docs/) - Inspiratie voor endpoint tabellen en schema weergave
- [Flat UI Colors Pallete v1](https://flatuicolors.com/palette/defo) - Kleurenpalet voor de styling

### Mock Data
- [Mock Data via ChatGPT](https://chatgpt.com/share/6953f2d9-80b8-800e-af9d-c2b398aeb7cd)

---

**Hazard API v0.1** | Gemaakt door Charlotte Schröer voor Backend Web 2025-2026
