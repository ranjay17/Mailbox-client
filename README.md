# Mailbox Client

### Signup Page
- Users can create a new account using **Email**, **Password**, and **Confirm Password**.
- All fields are **mandatory**.
- Client-side validation:
  - Empty field check
  - Password and Confirm Password match check
- Firebase Authentication API used for creating new users.
- On successful signup:
  - Shows a success alert
  - Logs `User has successfully signed up` in console.

  ### Login Page
- Users can login using **Email**, **Password**.
- All fields are **mandatory**.
- Client-side validation:
  - Empty field check
- Firebase Authentication API used for login.
- On successful login:
  - Shows a success alert
  - navigate to home page.

### ComposeMail Page
 - Users can create and send a new mail using To, Subject, and Mail Body fields.
 - All fields are mandatory.
 - Client-side validation:
    Checks if To, Subject, and Body are not empty.
    Email is stored in Firebase Realtime Database.

### Home Page
- Displays a welcome message.
- Provides two navigation buttons:
     Inbox
     Compose Mail
- Built using React-Bootstrap for clean UI.

### Inbox Page
- Displays all emails received by the logged-in user.
- Fetches mails using Firebase Realtime Database:
- inbox/<loggedInUserEmail>
- Shows mail details
- If no mails exist, shows "No mails found".
- Includes a Compose button to quickly create a new mail.


    