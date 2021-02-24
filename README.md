# The Underline Front End

## Project setup

Git - You may already have this installed but if you arent sure just go ahead and install it. Git is for managing code when collaborating.

https://git-scm.com/downloads

NPM - NPM is a javascript package manager that allows us to download all the other libraries we need. 

https://nodejs.org/en/ (either download option is fine but I would recommend what npm recommends.)

Run this command after you have the two prior installed.
```
npm install yarn
```

Run this command once your terminal is pointing to a directory where you would like the project's code to be.
```
git clone https://github.com/SparkDevTeams/underline-frontend.git
```

cd into the project's directory and run this command to install all dependencies the project needs.

```
yarn install
```

Run this command to start a server that will run and live build the application.

```
yarn serve
```

After running this command, the command line tab will be used for the server process. It should also give you a local host link, and if you go to that link in your browser you will see the current build of the application.

# What browser and text editor/IDE should I use?

For front end development, the **Firefox developer edition browser** is best. it is designed for front end development and has the best tools of all browsers for debugging and managing issues.

https://www.mozilla.org/en-US/firefox/developer/

As for what should you use to write code, I would suggest **Visual Studio Code**. Although there are many ways to write code and VSCode is not the best for all circumstances, its the best for Front End development. It has a great plugin ecosystem which add a lot of utility for development (Eg. built in color picker, plugins for JS libraries, code snippets etc)

https://code.visualstudio.com/download

# Is there any other software I would need to develop for this project?

Yes! There are a few minor extensions that will make a big diference. The **Vue extension for firefox** helps a ton with vue development.

https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/



There are also many extensions I would recommend for VSCode. You can search and download these extensions all from within the editor, in the extensions tab.

> Name: Auto Close Tag
> Id: formulahendry.auto-close-tag
> Description: Automatically add HTML/XML close tag, same as Visual Studio IDE or Sublime Text
> Version: 0.5.10
> Publisher: Jun Han
> VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag

> Name: Auto Rename Tag
> Id: formulahendry.auto-rename-tag
> Description: Auto rename paired HTML/XML tag
> Version: 0.1.6
> Publisher: Jun Han
> VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag

> Name: Highlight Matching Tag
> Id: vincaslt.highlight-matching-tag
> Description: Highlights matching closing and opening tags
> Version: 0.10.0
> Publisher: vincaslt
> VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag

> Name: Kite AutoComplete AI Code: Python, Java, Go, PHP, C/C#/C++, Javascript, HTML/CSS, Typescript, React, Ruby, Scala, Kotlin, Bash, Vue, React
> Id: kiteco.kite
> Description: AI code completions for all languages, intellisense, code snippets, code signatures, and cursor-following documentation for VS Code. Kite supports .js .jsx .vue .tsx .ts .css .html .less .c .cc .cpp .cs .h .hpp .m .scala .java .kt .py .go .php .rb and .sh filetypes.
> Version: 0.138.0
> Publisher: Kite
> VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=kiteco.kite

> Name: Vetur
> Id: octref.vetur
> Description: Vue tooling for VS Code
> Version: 0.31.3
> Publisher: Pine Wu
> VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=octref.vetur

> Name: vue
> Id: jcbuisson.vue
> Description: Syntax Highlight for Vue.js
> Version: 0.1.5
> Publisher: jcbuisson
> VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=jcbuisson.vue

# What technologies do I have to know or learn?

For web development, there are 3 core technologies that are ubiquitous and not going anywhere.

- **Javascript**: The programming language that powers web pages in the browser
- **HTML**: A markup language that feels more like biology than coding, its markup code directly translates into a hierarchy of visual elements.
- **CSS**: A stylig language that goes hand in hand with HTML. It allows you to change the style of elements in your HTML (Eg. Color, size, position).

These are deceptively simple tools that allow for very powerful applications. However, in software development, the ecosystem moves so fast that there are more tools for developers to use on top of the big 3 listed above.

- **Vue**: A javascript library/framework that enables quicker development for web apps. Somewhat similar to react but with a more minimal and simpler approach.

- **JQuery**: A javascript library that is more of an extension of javascript. It adds some simple syntax for things you do often in JS. This isnt something used much for this project or that you need to learn much about, but is good to be aware of and may show its face.

- **SCSS**: Css with super powers, if you know css this takes about 20 mins to learn and makes styling much simpler and convinient. It mirrors the hiercharchical nature of HTML, which makes a world of difference.

     > Note: You dont need to download these technologies from a website, they are different languages and libraries. You download them with a **package manager**. When you put yarn install in the command line, these are all installed.

# Side Note: Code Standards

I'm not enforcing any code standards as I think the functionality of your code, learning, and completing the web app are higher priorities. However, good coding practices are something that is necessary to understand when working with teams and would also greatly benefit you and the clarity of your code.

The most important thing to get right for JS and code standards is variable and method names.

Names of variables and methods use a formatting called camel case.(Eg. myVariable, animationSpeed, userLoginCredentials)

As for what you actually name the variables and methods, it should be as **simple, concise, and descriptive** as possible. Naming is a skill you get good at. Question your choice of name often and dont be afraid to change a variables name if it makes your code more readable and make more sense.

Comments should be rarely used. Your code should speak for itself. If theres some wordy code or boilerplate that you must use because of a library, use a comment if you think others will have no clue why you wrote that code.

# Side Note: Design Philosophy

Similar to the section above, this is something nice that I would like you guys to pick up.

Good design is:

- Simple and intuitive
- Efficient and functional
- Consistent in many dimensions
- Pretty

Something being pretty is obviously subjective but there are many things you can do to that are necesarry to keep things from being ugly. Using white space to seperate things, using font weight and font size to indicate importance and hierarchy, limiting color choices to a simple small color pallete.
