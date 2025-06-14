# NCKU Eater 2.0

**NCKU Eater 2.0** is a food recommendation app that simplifies the process of discovering local dining options in Tainan.

### Features

1. **Random Food Recommendations**: Click the "Lottery" button to receive a random food suggestion, perfect for indecisive users.
2. **Advanced Filter**s: Easily filter restaurants by vegetarian options or Tainan's famous beef soup.
3. **Favorites Management**: Save your favorite restaurants to a personalized "Favorites" list for quick access.

### Tech Stack

1. Built with **Next.js 14** to enhance performance and user experience.
2. Implements multiple authentication methods using **next-auth**, including Credentials and OAuth (GitHub, Google).
3. Validates login and registration forms using **react-hook-form** and **zod**.
4. Protects against XSS attacks by using **DOMPurify** to sanitize user-generated content.
5. Utilizes **TypeScript** for type definitions, improving code maintainability and security.
6. Utilizes **Redux Toolkit (RTK)** to efficiently manage and streamline global application state.
7. Designs the user interface with **Shadcn/ui** and **Tailwind CSS**.
8. Stores user data in **MongoDB** Atlas.
9. Integrates Google Sheets API as a restaurant database, allowing for easy online editing and updating of restaurant information to ensure real-time accuracy and accessibility.

You can use the following test account to access the demo website:

```
Test Account:

- Email: test@test.com
- Password: test1234
```

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

For this repository, the environment variables is for mongodb, next-auth (basic, google and github provider), google sheet api

### 3. Configure OAuth Redirect Url

#### Github:

Go to Github Develop Setting, register your OAuth Apps, and set up the callback URL to match your local development environment

```
http://localhost:3000/
```

or

```
http://127.0.0.1:3000/
```

#### Google:

Go to [Google Cloud Console](https://cloud.google.com/cloud-console?hl=zh-tw) build new repo, and search "Enabled APIs & Services" register OAuth, set up the callback URL

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

Visit http://localhost:3000 to view the application in action.

### Additional Notes

- Ensure you have Node.js and npm installed. If not, you can download and install them from Node.js official website.

- For detailed configuration or troubleshooting, refer to the OAuth provider's documentation. If you encounter any issues, feel free to contact me or open an issue in the repository.

### Store Data

The Google Sheet for managing store data can be found at the following link:

- [Store Data Google Sheet](https://docs.google.com/spreadsheets/d/1NXi4UpfRAPiEKp6tNBejs2CgBAxpozYaN9xWlQEmQ9M/edit?gid=0#gid=0)

You are welcome to edit or add new entries to the sheet. Your contributions are greatly appreciated!
