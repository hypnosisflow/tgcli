# TG Scrapper 
Tool for scrapping data from Telegram group chat. 

## Techs
Vite, React, Context API, Express, ElephantSQL, TailwindCSS, Telegram\Bot API, Chat-GPT API.

## Run

Backend: 
``
    cd server
    npm install 
    npm run start
``


Frontend: 
``
    cd client
    npm install 
    npm run dev
``

## Usage
Easy as one-two-three flow gives you histroy of certain group chat.
Follow these steps: 
    * Request history of group chat by ID (with prefix '-').
    * Filter list and send it to dashboard where you can preview and make changes boefore saving.
    * After sending to database, you can visit 'database' page for data presentation. 

Experemental feature: 
    * Analyze users messages for positive/negative/neutral content with help of Chat-GPT.

## About 
The main goal is to ingtegrate elements of gamification in thematical communities chats. 
Project works in pair with Telegram Bot, which can registrate user in live events and notify about any updates. 