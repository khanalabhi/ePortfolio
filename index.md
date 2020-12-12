ePortfolio
============

## Professional Self Assesment

After completing high school, I had started down the path of electrical engineering. Having always been interested in electronics and computers, I was very much interested in studying electrical engineering. After getting my associates degree in electrical engineering, however, I realized how much I enjoyed programming.  

Some of the most enjoyable classes I took while working towards my electrical engineering were java programming, c++ and even microcontroller programming in ARM assembly and c. This is when I realized that I want to pursue a career in computer science. Even before starting the computer science track at SNHU, I had about three years of professional experience in software development. Learning computer science on my own was a fun challenge – one that I took head on. However, even as a professional software developer – I yearned to learn more on the theoretical aspects of computer science. My career plans are thus far from conventional. As a mid-senior level software engineer, I plan to expand my knowledge of computer science and prepare myself for more senior roles; a plan that everything I learned throughout the courses I took at SNHU are sure to help carry out. 

Beyond the fundamentals of computer science, I have had the opportunity to work with a lot of amazing colleagues throughout my coursework. We learned to collaborate using GitHub and I have become very comfortable with using git-based version control system. Having performed code reviews as well as addressed pull requests from my peers, both in the professional setting as well as the educational one – I feel prepared to be able to apply this at a much higher level. As perhaps this report shows everyone, I have developed the skill set to interact with various stakeholders at different levels of technical experience as well. Finally, my deep understanding of the various dimensions of software development such as software engineering, algorithm and data structures, databases and security are portrayed well by the updates I have made to the artifact presented along with this report. 

The specifics of how I have shown my understanding on each of the topic are explained at great depths bleow. At a higher level, I wanted to choose a single artifact to display another ability I have – the ability to support software and not just create new pieces of software to highlight a particular skill set. As I have shown from the artifact, I have a good understanding of software engineering principles. Looking at the commit history of my artifact in the link supplied above – a modular and iterative process can be seen. I will also mention various enhancements that I would have liked to make. However, prioritization within the given time led to a polished artifact that holds enhancements I valued the most. All of this happened with collaborations of my professor – who mimicked a product owner in a professional setting. 

As far as algorithm and data structures are concerned, enhancements were made to the queries to me memory efficient. Instead of holding reference to all the columns from a database, for example, until rendering for the user – a projection is used to only keep the columns that are necessary. Similarly, connection for input output is closed when no longer needed – which can feel like a trivial oversight at first but can have big implications in production environment serving thousands of clients. Next, the database enhancements including but not limited to adding a user interface shows my ability to integrate industry standard solutions to supply a better customer experience. While the command line application would have sufficed, a basic expectation in the modern computing is to have a graphical user interface. Finally, to prove my understanding of security, I implemented an authentication and authorization system from scratch. Moreover, cleartext passwords were hashed as seen in the artifact instead of using them in a clear text setting. 

## Informal Code Review

The artifact used in this ePortfolio was obtained from a project in one of my classes. In order to showcase the various skills I had learned over the course of my program, I conducted an informal code review as presented below.

[![Watch the video](https://img.youtube.com/vi/hMCQJC65fUY/maxresdefault.jpg)](https://youtu.be/hMCQJC65fUY)

## Artifact Updates
### Software design and Engineering.
This artifact was selected – specifically for the software design and engineering part of the capstone to highlight my ability to port a complex application to a new programming language. From a software design and engineering perspective, the artifact was improved by using the DeFacto programming language of the web – JavaScript instead of python. Some added benefits of this would be the ability to further enhance the ecosystem by using a complete JavaScript based stack such as MongoDB Express Angular NodeJS [MEAN], or MongoDB Express React NodeJS [MERN]. 

#### Alignment with Course Objective.
There are no added updates on the outcome coverage plans since with the porting process, I will be meeting the course aim. Specifically, the outcome of “design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts” shall be achieved with this artifact. 

#### Enhancing and Modifying the Artifact.
The enhancement and modification of the artifact was a rather rewarding process. While there were a few challenges, the learnings certainly outweighed some challenges that were faced. Some of the immediate learnings were as follows: 

- [x] Use environment variables for configuration like PORT numbers
- [x] Use a templating engine – Jade – already being used which would make creating web interfaces much less cumbersome compared to writing the html syntax.  
- [x] Keep things asynchronous with callback functions

There were, however, a few challenges that were eventually overcome: 
- [x] Connecting to the database was relatively easy. However, the use of callback functions made it difficult to port the imperative style code in python to the callback driven approach on NodeJS. 
- [x] The first structure of the project took a little bit of getting used to compared to the two files that I wrote by myself in python. The huge benefit of being able to navigate the project, however, is that it is a standard that most ExpressJS developers follow – making it easier for me to adapt to industry standard code like shown below.

```js
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) {
    console.error(err);
  } else {
    clientRef = client;
    // register a middleware to attach db connection to the request
    app.use(function (req, res, next) {
      req.db = client.db('market');
      next();
    });

    // register the market router
    app.use('/market', marketRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
});
```

### Algorithm and Data Structure.
This artifact was selected – specifically for the algorithm and data structure part of the capstone to display my ability to add increased complexity to a software in an iterative manner. From an algorithm and data structure perspective, the artifact was improved by adding authentication to authenticate the client making the request to the server. Furthermore, certain restricted requests that change the database have an added layer of authorization that kicks in on top of the authentication layer. Beyond these major goals, the identified improvements during the code review such as closing the database connection when the webserver closes were also added to the artifact. 

#### Alignment with Course Objective.
Specifically, the course goal of “Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design choices” will be showed with the changes to the artifact. 

#### Enhancing and Modifying the Artifact.

The first thing that I did was research authentication and authorization. While I had a decent idea of what needed to be done, I wanted to find some examples of this flow. Since NodeJS is a mature framework at this point, I was able to find one PassportJS library to help with authentication. Not only would it help with local accounts restricted to the webapp, but it would even allow oauth – connecting to third party services like google, Facebook, etc. For authentication on NodeJS. The following are some of the major updates of the modification and enhancement. 

- [x] Implement a custom authentication and authorization system
- [x] Stub the authentication with hardcoded accounts so that it runs with empty database
- [x] Even though the password is hardcoded, incorporate hashing to avoid storing cleartext password
- [x] Close db connection when the application ends
```js
process.on('SIGINT', function () {
  if (clientRef) {
    console.log('closing mongo client...');
    clientRef.close();
  }
  process.exit();
});
```
- [] In a production environment use TLS for security

### Database.
This artifact was selected – specifically for the database part of the capstone to highlight my ability to use well-founded and innovative techniques around database. From a database perspective, the artifact was improved by firstly implementing the database driver for MongoDB in its native JavaScript interface. Next, instead of relying on command line curl scripts to interact with the web application, html interface was also added to the web application. 

#### Alignment with Course Objective.
There are no added updates on the outcome coverage plans since making the enhancements discussed in the code review and summarized above captures everything needed from a course goal standpoint. Specifically, the course goal of “Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals” will be showed with the changes to the artifact. 

### Enhancing and Modifying the Artifact.
As mentioned above, the first thing that I needed to do was to get the data from the old project, which was on CODIO, loaded on a local MongoDB instance. Furthermore, it would be beneficial to add a straightforward way to import the data for anyone wanting to try it. Next, the shell repository that did not do anything needed to be wired with the actual database as well. Finally, a user interface needed to be added as well. There were a lot of things I learned from this process. 
[x] - Use `mongoimport` tool to importing json files to MongoDB databases
[x] - Investigate the use of async await API. Decided not to use it to be more compatible with older version of node 
[x] - Use jade heirarchy to minimize repeated UI code

There were a few challenges as well. Specifically, around not overdoing what I had scoped out for the final project.
- While the MongoDB driver was a lot more natural, it was surprising to see that the functions were not named the same between MongoDB and pymongo
- Callback functions made error handling more difficult as well
- While Jade was amazing, it was yet another new thing to learn – which took some time
- I had hoped to basically get the final project scope completed by now but that was a little too ambitious