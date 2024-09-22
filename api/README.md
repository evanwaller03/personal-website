I will create WallerGPT. It's purpose is to respond to questions about my resume. What if a recruiter or really anyone wanted to know something about me but I wasn't available to chat? WallerGPT will be able to handle that for me. This is my 3rd or fourth time attempting this. I have tried so many times to train a model that does not hallucinate. I think this will be the first version that I can get correct. My new method consists of training a semantic search model on a corpus of facts about myself and then I will layer an optimal LLM over top of it in order to format a tailored response depending on the user's question. My desired ending product is a react website hosted on the google cloud so that anyone around the world with who knows the URL, "evanwaller.com", can access it and see what I have created. Ideally, I would also love to have another page on the site that details the recursiveness of the project... I don't know the math and processes behind this project, but I know that with the help of GPT, literally anything is possible in today's world and the barrier to entry to learn anything is having access to the internet and understanding how to ask GPT the RIGHT questions. This second page on the site will come with time. For now, my goal is make this professional. I want to have the correct project set up with proper documentation and processes in place so that when I need to make changes, it is relatively easy. I want to have a solid folder layout, I want a proper virtual environment set up, and I want to connect to my github. This is just the start, once I have this ready to go, then my goal is to download the correct packages into the virtual environment. Once these couple of steps are compelte, I wll then begin to build this in python. Before I start coding anything in react, I want to test this in the terminal and rather than having a GUI for user input, the program will take user input from the terminal, run it through a pre-trained semantic search model, then once the top 3 semantic searches are returned, it will be sent to an optimal OpenAI LLM to then be transformed into a response suitable for the user to gain a better understanding of me from the question they asked. After I think the model is trained properly and responding in a semi-correct (65%) pattern, I will start to build a local skeletal website for showcasing to friends who I want to demo this with. After the first local website is complete, I will continue to refine the model with potentially more data so that it responds even more accurately. Once even more accurate, I will deploy it to the web and showcase it as a formal page on my website, Evanwaller.com.

My prompt to GPT o-Preview below:
Building WallerGPT: A Resume-Answering Chatbot

I am developing WallerGPT, a chatbot designed to answer questions about my resume. The goal is to provide anyone—recruiters, potential collaborators, or anyone interested—an accurate, tailored response when I'm not available to chat. This is my third or fourth attempt to build this, and I’m confident this version will be the first successful one.

The key innovation this time is a new approach: training a semantic search model on a corpus of facts about myself and layering an optimal LLM on top to provide relevant, non-hallucinating answers. The final product will be a professional, React-based website hosted on Google Cloud, accessible globally via the URL "evanwaller.com."

The website will have one primary components:

1. WallerGPT\*\*: A chatbot capable of answering resume-related questions accurately.

My focus right now is on getting the project set up professionally:

- Solid Folder Layout\*\*: A clear project structure to ensure maintainability.
- Virtual Environment\*\*: Set up the environment correctly with the necessary packages.
- GitHub Integration\*\*: Seamlessly integrate version control to track changes and collaborate.

The project will begin in Python, with the initial testing done via the terminal before moving to React for user interaction. My process will involve:

1. Testing in Terminal\*\*: Instead of a GUI, user input will come from the terminal and be processed through a pre-trained semantic search model. The top 3 results will then be sent to an OpenAI LLM, which will format a user-friendly response.
2. Building a Local Website\*\*: Once the model reaches around 75% accuracy, I’ll create a local website to demo with friends.
3. Refining and Deploying\*\*: After refining the model with more data, I’ll deploy the website to "evanwaller.com."

Ultimately, WallerGPT will allow anyone to access accurate information about my professional background through a polished, scalable web application. With GPT, the barrier to entry for learning and building is simply knowing how to ask the right questions. I plan to leverage that fully to make WallerGPT a success.

Upload to git

1. git add .
2. git commit -m "message goes here"
3. git push -u origin main

Start local server:
uvicorn main:app --reload

Start Virtual Environment
source venv/bin/activate

Frontend details to remember:
Inside that directory, you can run several commands:

npm start
Starts the development server.

npm run build
Bundles the app into static files for production.

npm test
Starts the test runner.

npm run eject
Removes this tool and copies build dependencies, configuration files
and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

cd /Users/evanwaller/Desktop/GitHub Projects/WallerGPT_09_24/frontend
npm start
