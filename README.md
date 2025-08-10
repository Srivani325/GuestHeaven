# ​ 🏨GuestHeaven

GuestHeaven is  a full-stack web application for exploring, creating, editing, and deleting listings for places to stay, with user reviews and ratings.

## 📑 Table of Contents
1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Installation](#-installation)
4. [Usage](#-usage)
5. [API Routes](#-api-routes)
6. [Project Structure](#-project-structure)
7. [Contributing](#-contributing)
8. [License](#-license)
9. [Contact](#-contact)

## 🚀 Features
- 🏠 **Create Listings** – Add new places with images, descriptions, prices and locations.
- ✏️ **Edit & Delete Listings** – Update or remove existing places.
- ⭐ **Reviews & Ratings** – Leave feedback and star ratings on any listing.
- 🔐 **Authentication** – Secure signup/login with session management.
- 🖼 **Image Uploads** – Store listing images using ImageBB.
- 📱 **Responsive Design** – Works smoothly on desktop and mobile.

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** CSS, EJS(Embedded JavaScript Templates),Bootstrap
- **Database:** MongoDB (mongoose)
- **Image Storage:** ImageBB + Multer
- **Other Tools:** dotenv, Express-Session, Connect-Flash, passport( for authentication)

## Installation
#### 1️⃣ Clone the repository
- git clone https://github.com/yourusername/GuestHeaven.git
- cd GuestHeaven

#### 2️⃣ Install dependencies
npm install

#### 3️⃣ Set up environment variables
Create a .env file in the root directory and add:
- IMAGEBB_URL=your_imageBB_api_key
- ATLAS_URL=your_mongodb_connection_string
- SESSION_SECRET=your_session_secret

#### 4️⃣ Run the server
npm start

## 🖥 Usage
- Visit http://localhost:5000
- Navigate to the homepage to view all listings.
- Log in or sign up to create, edit, or delete listings.
- View a listing’s details and add your review/rating.
- Edit or remove your reviews if needed.
- Search any listing by it's name.

## 📡 API Routes
### 📍 Listings
```
Method    Endpoint	            Description              Auth Required
GET	     /listings  	       View all listings   	  No
GET	     /listings/:id	       View single listing	  No
POST	     /listings	            Create new listing	  Yes
PUT      	/listings/:id	       Update listing	       Yes
DELETE	/listings/:id     	  Delete listing	       Yes
```

### 📝 Reviews
```
Method	   Endpoint	                      Description	     Auth Required
POST	       /listings/:id/reviews     	       Add review	     Yes
DELETE	  /listings/:id/reviews/:reviewId	  Delete review  	Yes
```

## Project Structure
```
GuestHeaven/
├── controllers/             # Controller logic for routes
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/                    # Initial data setup scripts
│   ├── data.js
│   └── index.js
├── models/                  # Mongoose models
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
├── public/                  # Static assets
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   ├── js/
│   │   ├── script.js
│   │   └── toggle.js
├── routes/                  # Express route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/                   # Utility functions
│   ├── ExpressError.js
│   └── WrapAsync.js
├── views/                   # EJS templates
│   ├── filters/
│   │   ├── apartments.ejs
│   │   ├── farms.ejs
│   │   ├── greenstay.ejs
│   │   ├── hotels.ejs
│   │   ├── mountains.ejs
│   │   ├── pools.ejs
│   │   ├── private.ejs
│   │   ├── public.ejs
│   │   ├── rooms.ejs
│   │   └── trending.ejs
│   ├── includes/
│   │   ├── filters.ejs
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   ├── signup.ejs
│   │   ├── create.ejs
│   │   ├── edit.ejs
│   │   ├── error.ejs
│   │   ├── home.ejs
│   │   └── show.ejs
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
├── imagebbConfig.js         # Image hosting configuration
├── index.html               # Static homepage
├── index.js                 # Main server file
├── middleware.js            # Custom Express middlewares
├── package-lock.json        # Dependency lock file
├── package.json             # Project metadata and dependencies
└── schema.js                # Joi validation schemas
```

## 🤝Contributing
- Contributions are welcome
- Fork the repository
- Create a new branch (git checkout -b feature/YourFeature)
- Commit your improvements (git commit -m 'Add feature')
- Push and open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
#### Gogula Srivani
 - GitHub: Srivani325
 - Email: gogulasrivani6@gmail.com





