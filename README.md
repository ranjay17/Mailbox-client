### Mailbox Client

A modern Gmail-like mailbox application built using React, Redux Toolkit, React Router, Firebase Authentication, and Firebase Realtime Database.

This app allows users to send, receive, read, and delete emails in a clean UI with real-time updates.

🚀 Features
🔐 Authentication

✔ User Signup & Login using Firebase Authentication

✔ Secure session handling

✔ Redirect based on auth state

✉️ Email Functionality

✔ Compose & Send Emails

✔ Store emails in Firebase Realtime Database

✔ Separate Inbox and Sent sections

✔ Each email includes:

Sender

Receiver

Subject

Message

Timestamp

📥 Inbox

✔ Real-time inbox updates (polling every 2 seconds)

✔ Unread mail indicator

✔ Automatically marks mail as read when opened

✔ Delete email from inbox

📤 Sent Mail

✔ View all emails sent by the logged-in user

✔ View mail details page

👁️ Mail Viewer

✔ Click on any mail to open full details

✔ Displays subject, content, sender and time

✔ Updates unread → read instantly

🧭 Navigation

✔ Built using React Router v6

✔ Protected routes for authenticated users

✔ Clean & simple UI layout

🗃️ State Management

✔ Managed globally using Redux Toolkit

✔ Centralized slices: Auth, Mailbox

✔ Optimized state updates for performance

🔄 Real-time Sync

✔ Polling every 2 seconds fetches new mails

✔ Efficient mailbox refresh system