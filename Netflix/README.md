# Netflix GPT

- Create React App
- Configured TailwindCSS 
- Header
- Routing of App
- Login Form
- Sign up Form
- Form Validation
- useRef Hook
- Firebase Setup
- Deploying our app to production
- Create SignUp User Account
- Implement Sign In user Api
- Created Redux Store with userSlice
- Implemented Sign out 
- Update Profile
- BugFix: Sign up user displayName and profile picture update
- BugFix: if the user is not logged in Redirect /browse to Login Page and vice-versa
- Unsubscibed to the onAuthStateChanged callback
- Add hardcoded values to the constants file
- Regiter TMDB API & create an app & get access token
- Get Data from TMDB now playing movies list API
- Custom Hook for Now Playing Movies
- Create movieSlice
- Update Store with movies Data
- Planning for MainContauiner & secondary container
- Fetch Data for Trailer Video
- Update Store with Trailer Video Data
- Embedded the Yotube video and make it autoplay and mute
- Tailwind Classes to make Main Container look awesome
- Build Secondary Component
- Build Movie List
- build Movie Card
- TMDB Image CDN URL
- Made the Browsre page amazing with Tailwind CSS
- usePopularMovies Custom hook
- GPT Search Page
- GPT Search Bar
- (BONUS) Multi-language Feature in our App)
- Get Open AI Api Key 
- Gpt Search API Call
- fetched gptMoviesSuggestions from TMDB
- created gptSlice added data
- Resused Movie List component to make movie suggestion container
- Memoization
- Added .env file
- Adding .env file to gitignore
- Made our Site Responsive

# Features
- Login/Sign Up
    - Sign In /Sign up Form
    - redirect to Browse Page
- Browse (after authentication)
    - Header
    - Main Movie
        - Tailer in Background
        - Title & Description
        - MovieSuggestions
            - MovieLists * N 
- NetflixGPT
    - Search Bar
    - Movie Suggestions



# Project Setup
- Before starting the project please add .env file and add TMDB and OPENAI KEY into it.


HOW ITS HAPPENING THE API CALLS
--> WE CALL THE NOW PLAYING MOVIES API--> THEN WE CHOOSE FIRST MOVIE TO GET THE TRAILER--> THEN WE PASS THE MOVIEID AS PROPS TO THE VIDEOBACKGROUND COMPONENT--> THEN BY UISING ID WE GET THAT VIDEOS OF THAT MOVIE THROUGH THE API--> THEN WE GET THE TRAILER KEY FROM THIS API--> THEN WE USE THAT KEY AND PASS TO THE YOUTUBE URL DYNAMICALLY

WHY WE USING REDUX?
 -> WE CREATE SLICE COMPONENET, THEN WE ADD SOMEFUNCTIONS
 -> LATER WE ADD THAT FUNCTIONS TO THE APPSTORE
 -> THEN WE DISPATCH THE ACTIONS INTO THE SLICE THROUGH THE FUCNTION(LIKE API DATA INTO THE REDUX STORE, WATCH IT YOU CAN UNDERSTAND EASILY)
 -> THE TO USE THAT DATA, WE USE USEDISPATCH FUNCTION() THEN WE CAN USE IT VIA VIARIABLE
 