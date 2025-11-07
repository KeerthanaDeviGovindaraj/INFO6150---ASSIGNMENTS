# User Management API - Assignment 8

A secure RESTful API built with Node.js, Express, and MongoDB for managing users and profile images.

##  Features

### Core Functionality
-  **Complete CRUD Operations** - Create, Read, Update, Delete users
-  **Secure Password Storage** - bcrypt hashing with 10 salt rounds
-  **Image Upload System** - Profile pictures with format validation
-  **Input Validation** - Comprehensive validation for all inputs
-  **RESTful Design** - Standard HTTP methods and status codes
-  **MongoDB Integration** - NoSQL database with Mongoose ODM
-  **Auto-cleanup** - Images deleted when user is removed

### Technical Features
-  **Swagger Documentation** - Interactive API documentation
-  **Error Handling** - Detailed error messages for all scenarios
-  **File Management** - Organized image storage with unique naming
-  **Environment Configuration** - Secure credential management
-  **Modular Architecture** - Clean separation of concerns

##  Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/KeerthanaDeviGovindaraj/INFO6150---ASSIGNMENTS.git
cd INFO6150---ASSIGNMENTS/Assignment8-UserAPI
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- express
- mongoose
- bcrypt
- multer
- dotenv
- swagger-jsdoc
- swagger-ui-express

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/userdb
```

**For MongoDB Atlas (Cloud Database):**
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/userdb?retryWrites=true&w=majority
```

Replace `username` and `password` with your MongoDB Atlas credentials.

### Step 4: Start MongoDB

#### Windows:
```bash
# Open Command Prompt as Administrator
net start MongoDB
```
#### Using MongoDB Compass:
Simply open MongoDB Compass and click "Connect" - it will start MongoDB automatically.

### Step 5: Run the Server

#### Production Mode:
```bash
npm start
```

#### Development Mode (with auto-restart):
```bash
npm run dev
```

### Step 6: Verify Installation

Open your browser and navigate to:
```
http://localhost:3000
```

You should see:
```json
{
  "message": "User API Server is running",
  "documentation": "http://localhost:3000/api-docs",
  "endpoints": {
    "createUser": "POST /user/create",
    "getAllUsers": "GET /user/getAll",
    "updateUser": "PUT /user/edit",
    "deleteUser": "DELETE /user/delete",
    "uploadImage": "POST /user/uploadImage"
  }
}
```


##  API Endpoints

### Base URL
```
http://localhost:3000
```

---

###  Create User

**Endpoint:** `POST /user/create`

**Description:** Creates a new user with validation for email, name, and password strength.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "Pass@123"
}
```

**Success Response (201):**
```json
{
    "message": "User created successfully."
}
```

**Error Responses:**

**400 - Invalid Email:**
```json
{
    "error": "Validation failed.",
    "details": ["Invalid email format"]
}
```

**400 - Invalid Name:**
```json
{
    "error": "Validation failed.",
    "details": ["Full name must contain only alphabetic characters and spaces"]
}
```

**400 - Weak Password:**
```json
{
    "error": "Validation failed.",
    "details": ["Password must be at least 8 characters long"]
}
```

**400 - Duplicate Email:**
```json
{
    "error": "Validation failed.",
    "details": ["User with this email already exists"]
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/user/create \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "Pass@123"
  }'
```

---

### Get All Users

**Endpoint:** `GET /user/getAll`

**Description:** Retrieves all users with their details including hashed passwords.

**Success Response (200):**
```json
{
    "users": [
        {
            "fullName": "John Doe",
            "email": "john@example.com",
            "password": "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
        },
        {
            "fullName": "Jane Smith",
            "email": "jane@example.com",
            "password": "$2b$10$abcdefghijklmnopqrstuvw..."
        }
    ]
}
```

**Empty Database Response (200):**
```json
{
    "users": []
}
```

**cURL Example:**
```bash
curl http://localhost:3000/user/getAll
```

---

### Update User

**Endpoint:** `PUT /user/edit`

**Description:** Updates user's full name and/or password. Email cannot be updated and is used to identify the user.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body (Update Name):**
```json
{
    "email": "john@example.com",
    "fullName": "Jane Doe"
}
```

**Request Body (Update Password):**
```json
{
    "email": "john@example.com",
    "password": "NewPass@456"
}
```

**Request Body (Update Both):**
```json
{
    "email": "john@example.com",
    "fullName": "Jane Doe",
    "password": "NewPass@456"
}
```

**Success Response (200):**
```json
{
    "message": "User updated successfully."
}
```

**Error Responses:**

**404 - User Not Found:**
```json
{
    "error": "User not found."
}
```

**400 - Missing Email:**
```json
{
    "error": "Validation failed.",
    "details": ["Email is required to identify the user"]
}
```

**400 - No Fields to Update:**
```json
{
    "error": "Validation failed.",
    "details": ["At least one field (fullName or password) must be provided for update"]
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:3000/user/edit \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "fullName": "Jane Doe"
  }'
```

---

###  Delete User

**Endpoint:** `DELETE /user/delete`

**Description:** Deletes a user by email. Also deletes the associated profile image if it exists.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
    "message": "User deleted successfully."
}
```

**Error Responses:**

**404 - User Not Found:**
```json
{
    "error": "User not found."
}
```

**400 - Missing Email:**
```json
{
    "error": "Validation failed.",
    "details": ["Email is required to delete the user"]
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/user/delete \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Note:** When a user is deleted, their profile image is automatically removed from the `images/` folder.

---

###  Upload Image

**Endpoint:** `POST /user/uploadImage`

**Description:** Uploads a profile image for a user. Only one image per user is allowed.

**Request Type:** `multipart/form-data`

**Form Fields:**
- `email` (string, required): User's email address
- `image` (file, required): Image file (JPEG, PNG, or GIF)

**Success Response (201):**
```json
{
    "message": "Image uploaded successfully.",
    "filePath": "/images/john_1762125936640_photo.jpg"
}
```

**Error Responses:**

**400 - Image Already Exists:**
```json
{
    "error": "Image already exists for this user."
}
```

**400 - Invalid File Format:**
```json
{
    "error": "Invalid file format. Only JPEG, PNG, and GIF are allowed."
}
```

**400 - Missing Email:**
```json
{
    "error": "Email is required to upload image."
}
```

**400 - No File Uploaded:**
```json
{
    "error": "No image file uploaded."
}
```

**404 - User Not Found:**
```json
{
    "error": "User not found."
}
```

**400 - File Too Large:**
```json
{
    "error": "File size too large. Maximum size is 5MB."
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/user/uploadImage \
  -F "email=john@example.com" \
  -F "image=@/path/to/photo.jpg"
```

**Postman Instructions:**
1. Select POST method
2. Enter URL: `http://localhost:3000/user/uploadImage`
3. Go to Body tab
4. Select **form-data**
5. Add key `email` (Text) with value `john@example.com`
6. Add key `image` (File) and select your image file
7. Click Send

---

## Validation Rules

### Full Name Validation

**Rules:**
- Only alphabetic characters (A-Z, a-z) and spaces allowed
- Minimum 2 characters
- No numbers, special characters, or symbols

**Invalid Examples:**
-  "John123" (contains numbers)
-  "J@ne" (contains special character)
-  "A" (too short)
-  "John-Doe" (contains hyphen)
-  "John_Doe" (contains underscore)

**Regex Pattern:**
```javascript
/^[A-Za-z\s]{2,}$/
```

---

### Email Validation

**Rules:**
- Must follow standard email format
- Must be unique (no duplicate emails)
- Case-insensitive (stored as lowercase)

**Valid Examples:**
-  "john@example.com"
-  "user.name@domain.co.uk"
-  "test_user@email.com"
-  "admin@company.org"

**Invalid Examples:**
-  "invalid-email" (missing @)
-  "user@" (missing domain)
-  "@domain.com" (missing username)
-  "user @example.com" (contains space)
-  "user..name@example.com" (consecutive dots)

**Regex Pattern:**
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

---

### Password Validation

**Rules:**
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one digit (0-9)
- At least one special character (!@#$%^&*()_+-=[]{}|;:',.<>?/)

**Valid Examples:**
-  "Pass@123"
-  "SecureP@ssw0rd"
-  "MyP@ssword1"
-  "Strong#Pass99"

**Invalid Examples:**
-  "password" (no uppercase, no digit, no special char)
-  "Password123" (no special character)
-  "PASSWORD@" (no lowercase, no digit)
-  "Pass@" (too short)
-  "pass@123" (no uppercase)

**Validation Breakdown:**
```javascript
// Minimum 8 characters
password.length >= 8

// At least one uppercase
/[A-Z]/.test(password)

// At least one lowercase
/[a-z]/.test(password)

// At least one digit
/\d/.test(password)

// At least one special character
/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
```

---

### Image Upload Validation

**Accepted Formats:**
-  JPEG (.jpg, .jpeg)
-  PNG (.png)
-  GIF (.gif)

**Restrictions:**
- Maximum file size: 5MB
- One image per user
- File extension must match MIME type

**Valid Examples:**
-  photo.jpg
-  image.png
-  avatar.jpeg
-  animation.gif

**Invalid Examples:**
-  document.pdf (wrong format)
-  file.txt (wrong format)
-  image.bmp (wrong format)
-  photo.tiff (wrong format)
-  large_file.jpg (>5MB)

---

### File Descriptions

#### Core Files
- **server.js**: Main application entry point. Sets up Express, MongoDB connection, middleware, and routes.
- **swagger.js**: Configuration for Swagger UI and OpenAPI documentation.
- **.env**: Environment-specific configuration (port, database URI).

#### Models
- **User.js**: Mongoose schema defining user structure and database interactions.

#### Routes
- **userRoutes.js**: All API endpoints with request handling logic and Swagger annotations.

#### Middleware
- **upload.js**: Multer configuration for handling multipart form data and image uploads.

#### Utilities
- **validation.js**: Reusable validation functions for email, name, password, and images.

#### Directories
- **images/**: Storage for uploaded user profile pictures (excluded from git).
- **node_modules/**: npm dependencies (excluded from git).

---

### Testing with Postman

#### 1. Import Collection

1. Open Postman
2. Click **Import** button
3. Select `User_API_Postman_Collection.json`
4. All 30 test cases will be imported

#### 2. Set Environment (Optional)

Create a Postman environment:
- Variable: `base_url`
- Value: `http://localhost:3000`

#### 3. Run Individual Tests

Click on any request and click **Send**

#### 4. Run Entire Collection

1. Click on collection name
2. Click **Run** button
3. Click **Run User Management API**
4. Watch all tests execute

#### 5. Expected Results

All tests should pass with appropriate status codes:
-  201: Resource created
-  200: Success
-  400: Validation error
-  404: Not found

---

### Testing with Swagger

#### 1. Access Swagger UI

Start server and navigate to:
```
http://localhost:3000/api-docs
```

#### 2. Test Endpoints Interactively

1. Click on any endpoint to expand
2. Click **"Try it out"**
3. Enter test data
4. Click **"Execute"**
5. View response

#### 3. View Examples

Swagger provides:
- Request body schemas
- Response examples
- Validation rules
- Error scenarios

---


##  Security Features

### Password Security

#### bcrypt Hashing
- **Algorithm**: bcrypt with 10 salt rounds
- **Process**: Plain password → bcrypt hash → Database storage
- **Hash Example**: `$2b$10$N9qo8uLOickgx2ZMRZoMye...`

**Implementation:**
```javascript
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

**Benefits:**
- One-way hashing (cannot be reversed)
- Salt prevents rainbow table attacks
- Slow algorithm resists brute-force attacks
- Industry-standard security

#### Password Verification
```javascript
const match = await bcrypt.compare(plainPassword, hashedPassword);
```

---

### Input Validation

#### Server-Side Validation
All inputs validated before database operations:
- Email format checking
- Name pattern validation
- Password strength requirements
- File type verification

#### Prevents Common Attacks
-  SQL Injection: MongoDB uses parameterized queries
-  XSS: Input sanitization and validation
-  NoSQL Injection: Mongoose type casting
-  Path Traversal: File upload restrictions

---

### File Upload Security

#### File Type Validation
- **Whitelist approach**: Only JPEG, PNG, GIF allowed
- **MIME type checking**: Validates actual file content
- **Extension validation**: Double-checks file extension
- **Rejects**: PDF, executable files, scripts

#### File Size Limits
- Maximum: 5MB per file
- Prevents disk space exhaustion
- Configured in Multer middleware

#### Unique File Naming
```javascript
const filename = `${email}_${timestamp}_${originalname}`;
```
- Prevents file overwrites
- Tracks file ownership
- Enables easy cleanup

---

### Environment Variables

Sensitive data stored in `.env`:
- Database credentials
- API keys (if needed)
- Server configuration

**Never committed to Git:**
```gitignore
.env
```

---

### Error Handling

#### Detailed Error Messages
```json
{
    "error": "Validation failed.",
    "details": ["Invalid email format", "Password too weak"]
}
```

#### Does NOT Expose:
- Internal server errors
- Database structure
- File system paths
- Stack traces (in production)

---

##  Dependencies

### Production Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcrypt": "^5.1.1",
  "multer": "^1.4.5-lts.1",
  "dotenv": "^16.3.1",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.0"
}
```

#### Package Details

**express (^4.18.2)**
- Web application framework
- Handles HTTP requests/responses
- Routing and middleware support
- [Documentation](https://expressjs.com/)

**mongoose (^8.0.0)**
- MongoDB object modeling (ODM)
- Schema validation
- Query building
- [Documentation](https://mongoosejs.com/)

**bcrypt (^5.1.1)**
- Password hashing library
- Salt generation
- Secure password comparison
- [Documentation](https://www.npmjs.com/package/bcrypt)

**multer (^1.4.5-lts.1)**
- Multipart form data handling
- File upload processing
- Storage configuration
- [Documentation](https://www.npmjs.com/package/multer)

**dotenv (^16.3.1)**
- Environment variable management
- Configuration file loading
- Secure credential handling
- [Documentation](https://www.npmjs.com/package/dotenv)

**swagger-jsdoc (^6.2.8)**
- JSDoc to Swagger conversion
- API documentation generation
- OpenAPI specification
- [Documentation](https://www.npmjs.com/package/swagger-jsdoc)

**swagger-ui-express (^5.0.0)**
- Swagger UI hosting
- Interactive API documentation
- Try-it-out functionality
- [Documentation](https://www.npmjs.com/package/swagger-ui-express)

---

### Development Dependencies
```json
{
  "nodemon": "^3.0.1"
}
```

**nodemon (^3.0.1)**
- Auto-restart on file changes
- Development productivity tool
- Hot-reloading
- [Documentation](https://nodemon.io/)

---

### Installing Dependencies

**All dependencies:**
```bash
npm install
```

**Production only:**
```bash
npm install --production
```

**Update all:**
```bash
npm update
```

**Check for vulnerabilities:**
```bash
npm audit
npm audit fix
```

---

**Postman Setup:**
- Body → form-data
- Key: `email` (Text)
- Key: `image` (File) ← Important: Select "File" from dropdown

---

#### Issue 5: Validation Errors

**Error:**
```
Validation failed
```

**Check:**
- Full name: Only letters and spaces
- Email: Valid format (user@domain.com)
- Password: 8+ chars, uppercase, lowercase, digit, special char

**Test Your Data:**
- Name: `John Doe`  | `John123` 
- Email: `test@example.com`  | `invalid` 
- Password: `Pass@123`  | `password` 

---

#### Issue 6: Swagger Not Loading

**Error:**
```
Cannot GET /api-docs
```

**Solutions:**
1. Check if `swagger.js` exists
2. Verify import in `server.js`:
```javascript
   const { swaggerUi, specs } = require('./swagger');
```
3. Check route setup:
```javascript
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```
4. Restart server

---

#### Issue 7: CORS Errors

If accessing from frontend:

**Add CORS middleware in server.js:**
```javascript
const cors = require('cors');
app.use(cors());
```

**Install CORS:**
```bash
npm install cors
```

---

#### Issue 8: Images Not Saving

**Manual Fix:**
```bash
mkdir images
```

---

#### Issue 9: bcrypt Installation Error (Windows)

**Error:**
```
node-gyp rebuild failed
```

**Solution:**
```bash
npm install --global windows-build-tools
npm install bcrypt
```

---

#### Issue 10: Git Issues

**Error:**
```
fatal: not a git repository
```

**Solution:**
```bash
git init
```

**Undo last commit:**
```bash
git reset --soft HEAD~1
```

---

### Getting Help

If issues persist:

1. **Check Server Logs:** Look at console output for detailed errors
2. **MongoDB Logs:** Check MongoDB log files
3. **Postman Console:** View request/response details
4. **GitHub Issues:** Check if others have similar problems
5. **Contact Support:** Reach out to instructor/TA

---

##  API Documentation

### Swagger Interactive Documentation

#### Access
```
http://localhost:3000/api-docs
```

#### Features
- **Interactive Testing**: Try endpoints directly in browser
- **Request Schemas**: See exact data structures required
- **Response Examples**: View success and error responses
- **Validation Rules**: Understand input requirements
- **Copy cURL Commands**: Easy command-line testing

#### Using Swagger

1. **Navigate to Endpoint:**
   - Click on Users or Images section
   - Click on specific endpoint (e.g., POST /user/create)

2. **Try It Out:**
   - Click "Try it out" button
   - Modify request body
   - Click "Execute"

3. **View Response:**
   - See HTTP status code
   - View response body
   - Check response time

4. **Explore Schemas:**
   - Scroll to bottom
   - Click on "Schemas"
   - View data models

---

### Postman Collection

#### Using the Collection

1. **Import:**
   - Open Postman
   - Import `User_API_Postman_Collection.json`

2. **Run Individual Test:**
   - Click on any request
   - Click Send
   - View response

3. **Run All Tests:**
   - Click on collection
   - Click "Run"
   - Watch all tests execute

4. **Export Results:**
   - Save responses
   - Export test report

