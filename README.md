# PostMark
A small Node.js program to convert Postman collections to Markdown friendly syntax. PostMark takes a collection of API routes from Postman and converts it into Markdown friendly syntax ready to be added to a GitHub README.md file. For our first stage we are using GitHub Flavored Markdown, hopefully adding others if time permits.

Since documentation is incredibly important when hosting a project on GitHub we believe that this will help developers very easily show the routes used in their APIs. This should save the developer time, make using a project easier for users and improve readability of documentation.

We hope to make PostMark an installable NodeJS package and eventually a serverless function that any user can pass a JSON-based Postman collection to and recieve back Markdown syntax.

## Problem Domain : Auto-generating documentation for JSON.
App takes JSON file as input and outputs the documentation template in .md format.

#### Why behind the project:
- Manual process is repetitive
- It is also error prone
- Not a motivating or creative task!

#### What problems it solves:
- Eliminates painstaking manual process
- Minimizes errors in manual copying

![Problem-Domain](./assets/Problem_Domain.jpg)

## Whiteboard/UML

![Whiteboard/UML](./assets/PostMark_Board.jpg)

## Requirements

- [Requirements](./requirements.md)

## Resources/Links

### Node.js
- [CLI](https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/)
- [fs](https://nodejs.org/api/fs.html#fs_class_fs_dir)
- [prompt](https://github.com/flatiron/prompt)
- [fs](https://stackoverflow.com/questions/42972785/what-is-the-current-directory-used-by-fs-module-functions)
- [fs](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)


### Markdown Features in GitHub
- [Markdown](https://guides.github.com/features/mastering-markdown/)

### Postman V2.1 Collection Schema
- [Postman Collection](https://schema.getpostman.com/json/collection/v2.1.0/collection.json)

### NPM Publish
- [npm publish](https://medium.com/the-andela-way/build-and-publish-your-first-npm-package-a4daf0e2431)
- [npm publish](https://stackoverflow.com/questions/22343420/npm-not-creating-bin-directory)
- [npm publish](https://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm)


## Authors

Andre Olivier Martin - @Doktor-Doom

Jeremy Penning - @pixeljava

Sowmya Billakanti - @SowmyaBillakanti

Tahmina Ringer - @tahminaringer