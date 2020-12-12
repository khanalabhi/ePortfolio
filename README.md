ePortfolio
============

## Professional Self Assesment

After completing high school, I had started down the path of electrical engineering. Having always been interested in electronics and computers, I was very much interested in studying electrical engineering. After getting my associates degree in electrical engineering, however, I realized how much I enjoyed programming.  

Some of the most enjoyable classes I took while working towards my electrical engineering were java programming, c++ and even microcontroller programming in ARM assembly and c. This is when I realized that I want to pursue a career in computer science. Even before starting the computer science track at SNHU, I had about three years of professional experience in software development. Learning computer science on my own was a fun challenge – one that I took head on. However, even as a professional software developer – I yearned to learn more on the theoretical aspects of computer science. My career plans are thus far from conventional. As a mid-senior level software engineer, I plan to expand my knowledge of computer science and prepare myself for more senior roles; a plan that everything I learned throughout the courses I took at SNHU are sure to help carry out. 

Beyond the fundamentals of computer science, I have had the opportunity to work with a lot of amazing colleagues throughout my coursework. We learned to collaborate using GitHub and I have become very comfortable with using git-based version control system. Having performed code reviews as well as addressed pull requests from my peers, both in the professional setting as well as the educational one – I feel prepared to be able to apply this at a much higher level. As perhaps this report shows everyone, I have developed the skill set to interact with various stakeholders at different levels of technical experience as well. Finally, my deep understanding of the various dimensions of software development such as software engineering, algorithm and data structures, databases and security are portrayed well by the updates I have made to the artifact presented along with this report. 

The specifics of how I have shown my understanding on each of the topic were explained at great depths above. At a higher level, I wanted to choose a single artifact to display another ability I have – the ability to support software and not just create new pieces of software to highlight a particular skill set. As I have shown from the artifact, I have a good understanding of software engineering principles. Looking at the commit history of my artifact in the link supplied above – a modular and iterative process can be seen. I have also mentioned various enhancements that I would have liked to make. However, prioritization within the given time led to a polished artifact that holds enhancements I valued the most. All of this happened with collaborations of my professor – who mimicked a product owner in a professional setting. 

As far as algorithm and data structures are concerned, enhancements were made to the queries to me memory efficient. Instead of holding reference to all the columns from a database, for example, until rendering for the user – a projection is used to only keep the columns that are necessary. Similarly, connection for input output is closed when no longer needed – which can feel like a trivial oversight at first but can have big implications in production environment serving thousands of clients. Next, the database enhancements including but not limited to adding a user interface shows my ability to integrate industry standard solutions to supply a better customer experience. While the command line application would have sufficed, a basic expectation in the modern computing is to have a graphical user interface. Finally, to prove my understanding of security, I implemented an authentication and authorization system from scratch. Moreover, cleartext passwords were hashed as seen in the artifact instead of using them in a clear text setting. 

## Informal Code Review

The artifact used in this ePortfolio was obtained from a project in one of my classes. In order to showcase the various skills I had learned over the course of my program, I conducted an informal code review as presented below.

[![Watch the video](https://img.youtube.com/vi/hMCQJC65fUY/maxresdefault.jpg)](https://youtu.be/hMCQJC65fUY)

## About

The stock-market project is a NodeJS web application that listens to clients for http requests and processes them to query or modify stock market data that is available in the database. The database used in this application is MongoDB. The framework used for this web application is ExpressJs.

## Running the application

One of the main external dependencies of this web application is a connection to a MongoDB database. The first iteration of this web application currently assumes that localhost:27017 offers connection to MongoDB. This will be enhanced in later versions to rely upon command line arguments or environmental variables as needed.

Assuming this dependency is met, here are the general steps to get the web application up and running:
- `npm i` # install the node dependencies
- `npm start` # start the web application and listen to the default port of 3000