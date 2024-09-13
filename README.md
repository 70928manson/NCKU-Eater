# NCKU Eater 2.0

**NCKU Eater 2.0** is a food recommendation app designed to help users easily discover local dining options in Tainan.

Users can click the "Lottery" button to receive a random food recommendation, making it ideal for those who struggle with decision-making.  
It offers filters for vegetarian, beef soup options allows users to save their favorite restaurants to a "Favorites" list.  

### Tech Stack
1. Built with **Next.js** to enhance performance and user experience.
2. Implements multiple authentication methods using **next-auth**, including Credentials and OAuth (GitHub, Google).
3. Validates login and registration forms using **react-hook-form** and **zod**.
4. Protects against XSS attacks by using  **DOMPurify** to sanitize user-generated content.
5. Utilizes **TypeScript** for type definitions, improving code maintainability and security.
6. Manages global application state with **Redux (RTK)** to streamline state management.
7. Designs the user interface with **Shadcn/ui** and **Tailwind CSS**.
8. Stores user data in **MongoDB**. 
9. Integrates Google Sheets API as a restaurant database, allowing for easy online editing and updating of restaurant information to ensure real-time accuracy and accessibility.

### Main Features

1. Randomly recommends Tainan food options.
2. Filters restaurants offering vegetarian or beef soup options.
3. Allows users to save restaurants to "Favorites."


Test Account

- Email: test@test.com
- Password: test1234


## Getting Started

Follow these steps to clone and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/70928manson/NCKU-food-draw.git
cd ncku-eater-2.0
```

### 2. Set Up Environment Variables

Create a .env file in the root directory of the project. Use the provided .env.example file as a reference to fill in the required environment variables.


```bash
cp .env.example .env
```

Open the .env file and configure the necessary environment variables, such as database credentials, OAuth client secrets, and any other configuration needed for the application.

For this repository, the enviroment vaiables is for mongodb, next-auth (basic, google and github provider), google sheet api 

### 3. Configure OAuth Redirect Url

#### Github:  
Go to Github Develop Setting, register your OAuth Apps, and set up the callback URL to match your local development environment
  
http://localhost:3000/ or http://127.0.0.1:3000/


#### Google:  

Go to [Google Cloud Console](https://cloud.google.com/cloud-console?hl=zh-tw) build new repo, and search "Enabled APIs & Services" register OAuth,  set up the callback URL

http://localhost:3000/api/auth/callback/google

### 4. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 5. Start the Development Server

Start the development server with:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to see the application in action.


### Additional Notes

- Ensure you have Node.js and npm installed. If not, you can download and install them from Node.js official website.

- For further configuration details or troubleshooting, refer to the specific provider's documentation for OAuth setup, you can also contact me or create an issue.
