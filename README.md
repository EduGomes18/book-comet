# Book Comet!

This project was made for a enterview test, i build a backend 100% in node js, only using express with some babel modules for new es6 sintax and also functional programming. The frontend its in Angular with full authentication flux and basic CRUD based in the api methods.

## The Back end

Use nodejs 14.v+ to run it fluid 

```bash
cd ./backend && npm install && npm run dev
```

## Usage

You can import the json in insomnia and have all the api methods configured to run:
*Books*, *Authors*, *Inventories* and *Authentication*.
The most interesting part of the Backend is that i build a ORM with JSON based database, reusing all the methods to all the CRUDS, they work with most part of database languages methods like, order by, limit, offset(page), where clause etc.. 

*The Insomnia Requests*
![alt text](https://github.com/EduGomes18/book-comet/blob/main/gifs/insomnia.png?raw=true "Insomnia")


## The Frontend

I build the frontend only with Angular 13 build in methods, the layout used its just for funny (build by myself hehe), for testing you can create your account in */register* or login in */login*, you will be redirected to dashboard page authenticated, and there you can create Books and play around with Inventory and Authors.

```bash
cd ./frontend && npm install && npm start
```

### Next you can see some Gifs for the flow.. Thak you all!

*Register Flux*

![alt text](https://github.com/EduGomes18/book-comet/blob/main/gifs/register.gif?raw=true "Register flux")

*Create Author*

![alt text](https://github.com/EduGomes18/book-comet/blob/main/gifs/create-author.gif?raw=true "Create Author")

*Form Validations*

![alt text](https://github.com/EduGomes18/book-comet/blob/main/gifs/Form-validations.gif?raw=true "Form Validations")


*Finally Create Book*

![alt text](https://github.com/EduGomes18/book-comet/blob/main/gifs/create-book.gif?raw=true "Create Book")


*Inventory Flow. Blocking delete when its positive.*

![alt text](https://github.com/EduGomes18/book-comet/blob/main/gifs/cant-remove.gif?raw=true "Inventory")


*Nice pagination and searching haha.*

![alt text](https://github.com/EduGomes18/book-comet/blob/main/gifs/pagination.gif?raw=true "Pagination")


*Logout and Login.*

![alt text](https://github.com/EduGomes18/book-comet/blob/main/gifs/login-flow.gif?raw=true "Logout Login")



## License
[MIT](https://choosealicense.com/licenses/mit/)
