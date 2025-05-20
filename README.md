# Main Project Roomie (professional version): 
Thanks Allan for the deployment (see repo for more details)
Deployed here 👉 [Roo-Me Live App](https://roo-me-nine.vercel.app/)

Emergency RoomieLite here 👉 [RooMie Lite App](https://roomielite.onrender.com/)

# 🐰 Roo-Me: The All-You-Can-Eat Roomie Hunter
A testing app to integrate teammates' other project ideas, and data entries.
**Roo-Me** is a chaotic, causual, and fun take on roommate matching—designed by a dream team of tinkerers, designers, and low-key trolls. Think: Tinder meets Tarot, with a sprinkle of semi-working AI magic and a bunny filter.

> 🙌 “Thanks God it finally worked!”  
> — [Will Taka on LinkedIn](https://www.linkedin.com/posts/willtaka_thanks-god-it-finally-worked-last-activity-7325425581695590401-0GHR)


# AllYouCanEatRoomieHunter 🍜🏹

> A quirky, clever civilization simulator for RoomieHunters in a pixelated universe.

🌟 **Milestone**  
At **10:28 PM, May 6th 2025**, our first fully functional app went live at:  
🔗 [https://allyoucaneatroomiehunter.onrender.com](https://allyoucaneatroomiehunter.onrender.com)

Built with love, sweat, and a slightly obsessive digital soul.  
Powered by Flask, Render, and cosmic courage.

---

---

## 🌟 What It Does

An experimental multi-feature app pulling ideas from across the team:

### 🧠 Core Features

1. **🐇🐈 AI Face Reading + Cat/Bunny Filter**
   - Webcam input + cat/bunny face filter.
   - Simulated AI face-reading (recycled from an AI tarot app).
   - Originally aimed for cartoon webcam output using MediaPipe (didn't work 😞).

2. **🔥 Tinder-style Matching System**
   - Swipeable profiles from a 100+ user database (names & ages only for privacy).
   - Match algorithm returns your top 3 based on input.
   - Dynamic updates via “Yes/No” swipe logic.

3. **🎬 Movie Recommendations**
   - Suggests roommate-matching films.
   - Potential Tableau integration in the future.

4. **🤖 Hugging Face ChatBot**
   - Integrated chat using Hugging Face models.
   - Some bots work, some... don’t. 🤡

5. **🔮 AI Tarot Card Fortune Teller**
   - Fortune telling with a limited tarot deck.
   - Gives fake-real vibes. You’ll get over it.

---
### 💡 Built from multiple teammate ideas:
- Responsive web design
- Database viz
- Film suggestions
- Diagram tools

---

# DatingDisguisedAsRoomiesFinder
 Deep Fake Roommates matching app for ex-craigslist-goers 
 # Dating app Disguised As Roomies Finder
 # Dating Disguised As Roomies Finder - Design Document
 
 **Deep Fake Roommates Matching App for Ex-Craigslist Goers**
 
 Welcome to the *Dating Disguised As Roomies Finder*, an innovative app aimed at helping people find their perfect roommates in a modern, Tinder-like experience. For renters and seekers looking to find compatible living arrangements, we provide a fun, yet practical solution by integrating deep fake technology to match people who not only fit the ideal lifestyle but also share common interests.
 
 ---
 
 ## [Link to Full Design Document](https://docs.google.com/document/d/1JhkX5pgenM55H9VziPRYVcWF_5A9sfxxXc6NuwBBhNA/edit?tab=t.0)
 
 ---
 
 ## Table of Contents
 
 1. [Overview](#overview)
 2. [Key Features](#key-features)
 3. [System Design](#system-design)
     - [Diagrams](#diagrams)
     - [App Routines](#app-routines)
     - [Datasets](#datasets)
 4. [Roommate Matching Logic](#roommate-matching-logic)
 5. [Next Steps](#next-steps)
 
 ---
 
 ## Overview
 
 The **Deep Fake Roommates** app is designed to cater to individuals transitioning from platforms like Craigslist to a more modern, user-friendly, and personalized roommate search tool. The core concept of the app is to match users based on personality traits, preferences, lifestyle choices, and housing needs. Deep fake technology can be used for fun profile pictures and to enhance the matching algorithm based on users’ preferences and interaction styles.
 
 ---
 
 ## Key Features
 
 - **Profile Matching**: Matches individuals based on shared interests, lifestyles, budgets, and location preferences.
 - **Deep Fake Technology**: Use AI-generated images for fun, creative profile pictures, or avatars for enhanced user engagement.
 - **Swipe-to-Match**: Similar to Tinder, users swipe left to reject or right to accept potential roommates.
 - **In-App Messaging**: Users can chat with potential roommates before deciding to meet in person.
 - **Location-Based Searching**: Matches users based on geographic proximity.
 - **Room Listings & Search**: Users can list available rooms and apartments and search for available places based on their preferences.
 
 ---
 
 ## System Design
 
 ### Diagrams
 
 Here’s an overview of the system design for **Dating Disguised As Roomies Finder**:
 
 #### **1. Roommate Matching System Diagram**
 
 This diagram shows the key components involved in matching potential roommates based on user profiles, preferences, and location.
 '''sql
 +-------------------+       +-------------------+
 |  User Profile     | <---> |  Preferences/     |
 |  Data (Location,  |       |  Compatibility    |
 |  Budget, Likes)   |       |  Score Calculators|
 +-------------------+       +-------------------+
         |                           |
         v                           v
 +-------------------+       +-------------------+
 |  Matchmaking      |       |   Deep Fake AI    |
 |  Algorithm        | <---> |   Profile Image   |
 +-------------------+       +-------------------+
         |
         v
 +-------------------+
 |  Roommate Matches |
 +-------------------+
 
 '''
 
 #### **2. User Journey Flow Diagram**
 
 This diagram illustrates the user journey, from signing up to finding a roommate.
 '''sql
 
 
 +-----------------------+
 |  Sign Up / Login      |
 +-----------------------+
         |
         v
 +-----------------------+
 |  Complete Profile     |
 |  (Personal Details)   |
 +-----------------------+
         |
         v
 +-----------------------+
 |  Set Preferences      |
 |  (Budget, Lifestyle)  |
 +-----------------------+
         |
         v
 +-----------------------+
 |  Swipe Through Matches|
 +-----------------------+
         |
         v
 +-----------------------+
 |  Match and Chat       |
 +-----------------------+
 
 '''
 
 ---
 
 ### App Routines
 
 **1. User Registration Routine**
 - The user will sign up with an email, phone number, or social media account.
 - Upon registration, the user is prompted to complete their profile (personal information, budget, preferences, etc.).
 
 **2. Profile Matching Routine**
 - A user's preferences (budget, location, personality, etc.) will be analyzed and matched against others in the database.
 - The algorithm calculates a compatibility score, which is used to rank roommate suggestions.
 
 **3. Swipe-to-Match Routine**
 - Users can swipe through potential roommates, similar to Tinder’s swiping mechanic.
 - If two users swipe right (accept), a match is made, and they can begin chatting.
 
 **4. Messaging Routine**
 - Once matched, users can message each other to discuss the living situation, schedule meetings, and further assess compatibility.
 
 **5. Deep Fake Profile Generation Routine**
 - Users have the option to use a deep fake-generated image (based on AI technology) for their profile picture.
 - The deep fake technology allows for fun, creative avatars or images that represent the user’s personality or interests.
 
 ---
 
 ### Datasets
 
 To enable smooth matching and enhance user experience, we require the following datasets:
 
 - **User Profiles**: Data including location, budget, lifestyle preferences, and personal details.
     - Sample Dataset:
     ```json
     {
       "user_id": 123,
       "location": "San Francisco",
       "budget": 1500,
       "preferences": ["clean", "night owl", "pets"],
       "personality": "outgoing"
     }
     ```
 
 - **Room Listings**: Data about available rooms and apartments (price, location, amenities).
     - Sample Dataset:
     ```json
     {
       "room_id": 456,
       "location": "San Francisco",
       "price": 1200,
       "amenities": ["wifi", "laundry", "parking"],
       "available_from": "2023-05-01"
     }
     ```
 
 - **User Matching Preferences**: Preferences for roommate matching (likes, dislikes, lifestyle).
     - Sample Dataset:
     ```json
     {
       "user_id": 123,
       "ideal_roommate": {
         "budget": 1300,
         "lifestyle": "quiet",
         "cleanliness": "high",
         "pet_preference": "none"
       }
     }
     ```
 
 - **Swipe Data**: Tracks swipes (right/left) for users to help calculate compatibility scores.
     - Sample Dataset:
     ```json
     {
       "user_id": 123,
       "swiped_right": [124, 125, 126],
       "swiped_left": [127, 128]
     }
     ```
 
 ---
 
 ## Roommate Matching Logic
 
 The roommate matching logic works through a scoring system based on user preferences and profile data.
 
 ### **1. Compatibility Scoring**
 - Compatibility is based on shared attributes such as cleanliness, lifestyle, budget, and pet preferences.
 - Each attribute is assigned a weight, and the system calculates an overall compatibility score between two users.
 
 ### **2. Deep Fake Profile Matching**
 - The deep fake profile image can be analyzed using facial recognition or aesthetic preferences to match users based on appearance or style preferences.
 
 ---
 
 ## Next Steps
 
 To turn this concept into a fully functioning app, the following tasks are next:
 
 1. **Prototype Development**: Start by building the front-end prototype, which includes the profile page, swipe functionality, and messaging system.
 2. **Algorithm Implementation**: Implement the roommate matching algorithm, including the scoring system and profile data parsing.
 3. **AI Integration**: Integrate deep fake technology to allow users to generate or upload creative profile images.
 4. **Testing**: Conduct user testing to refine the app's features and improve the matching process.
 5. **Deployment**: Deploy the app on mobile platforms (iOS/Android) and web.
 
 ---
 
 Feel free to copy the structure above, modify the data, or add specific sections as needed. This document should help guide the development of your **Dating Disguised As Roomies Finder** app. Let me know if you need further adjustments!
