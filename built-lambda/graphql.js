(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./graphql.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../config/keys.js":
/*!*************************!*\
  !*** ../config/keys.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./keys_dev */ "../config/keys_dev.js");
}

/***/ }),

/***/ "../config/keys_dev.js":
/*!*****************************!*\
  !*** ../config/keys_dev.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  MONGO_URI: "mongodb://myiu:mikeyiu1@ds153766.mlab.com:53766/notes-oncall",
  SECRET: "secret"
};

/***/ }),

/***/ "../connectors/jwt.js":
/*!****************************!*\
  !*** ../connectors/jwt.js ***!
  \****************************/
/*! exports provided: createToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createToken", function() { return createToken; });
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const createToken = async (user, secret, expiresIn) => {
  const {
    id,
    email
  } = user;
  return await jwt.sign({
    id,
    email
  }, secret, {
    algorithm: "HS256",
    expiresIn: "7d"
  });
};



/***/ }),

/***/ "../models/Note.js":
/*!*************************!*\
  !*** ../models/Note.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const Schema = mongoose.Schema; //Create Schema

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
NoteSchema.pre('findOneAndUpdate', function () {
  console.log('middleware triggered');
  this.update({}, {
    $set: {
      updated_at: new Date()
    }
  });
});
module.exports = mongoose.model("note", NoteSchema);

/***/ }),

/***/ "../models/User.js":
/*!*************************!*\
  !*** ../models/User.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const Schema = mongoose.Schema; //Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
UserSchema.pre('findOneAndUpdate', function () {
  this.update({}, {
    $set: {
      updated_at: new Date()
    }
  });
});
module.exports = mongoose.model("users", UserSchema);

/***/ }),

/***/ "../models/index.js":
/*!**************************!*\
  !*** ../models/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User */ "../models/User.js");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_User__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "../models/Note.js");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Note__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  User: (_User__WEBPACK_IMPORTED_MODULE_0___default()),
  Note: (_Note__WEBPACK_IMPORTED_MODULE_1___default())
});

/***/ }),

/***/ "../resolvers/authorization.js":
/*!*************************************!*\
  !*** ../resolvers/authorization.js ***!
  \*************************************/
/*! exports provided: isAuthenticated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAuthenticated", function() { return isAuthenticated; });
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__);

 // method to check if logged in

const isAuthenticated = (parent, args, {
  me
}) => me ? graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__["skip"] : new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["ForbiddenError"]("Not authenticated as user");

/***/ }),

/***/ "../resolvers/index.js":
/*!*****************************!*\
  !*** ../resolvers/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_iso_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-iso-date */ "graphql-iso-date");
/* harmony import */ var graphql_iso_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_iso_date__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./note */ "../resolvers/note.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ "../resolvers/user.js");



const customScalarResolver = {
  Date: graphql_iso_date__WEBPACK_IMPORTED_MODULE_0__["GraphQLDateTime"]
};
/* harmony default export */ __webpack_exports__["default"] = ([customScalarResolver, _user__WEBPACK_IMPORTED_MODULE_2__["default"], _note__WEBPACK_IMPORTED_MODULE_1__["default"]]);

/***/ }),

/***/ "../resolvers/note.js":
/*!****************************!*\
  !*** ../resolvers/note.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization */ "../resolvers/authorization.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    notes: async (parent, args, {
      me,
      models
    }, info) => {
      const notes = await models.Note.find({
        user: me.id
      }).sort({
        updated_at: -1
      });
      return notes.filter(note => note.title.includes(args.filter) || note.body.includes(args.filter)); // }
      // return models.Note.find({ user: me.id }).sort({ updated_at: -1 });
    },
    note: async (parent, args, {
      models
    }, info) => {
      const note = models.Note.findById(args.id);
      return note;
    }
  },
  Mutation: {
    createNote: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, args, {
      me,
      models
    }, info) => {
      const {
        title,
        body
      } = args; // const newNote = new models.Note({
      //   title,
      //   body,
      //   user: me.id,
      // })
      // newNote.save((err) => {
      //   if (err) throw new Error("Couldnt add post")
      // })

      const newNote = await models.Note.create({
        title,
        body,
        user: me.id
      });
      return newNote;
    }),
    editNote: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, args, {
      me,
      models
    }, info) => {
      // const editedNote = await models.Note.updateOne({ _id: args.id }, { $set: { args } }, { new: true })
      const editedNote = await models.Note.findByIdAndUpdate(args.id, args, {
        new: true,
        'upsert': true
      });
      return editedNote;
    }),
    deleteNote: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, args, {
      me,
      models
    }, info) => {
      const note = await models.Note.findById(args.id);

      if (!note) {
        throw new Error("Note not found");
      }

      console.log(note);

      if (note.user.toString() !== me.id) {
        throw new Error("User not authorized");
      }

      note.remove().then(note).catch(err => {
        console.log(err);
        throw new Error("Note not found");
      });
      return note.id;
    })
  }
});

/***/ }),

/***/ "../resolvers/user.js":
/*!****************************!*\
  !*** ../resolvers/user.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _connectors_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../connectors/jwt */ "../connectors/jwt.js");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorization */ "../resolvers/authorization.js");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__);






const validateRegisterInput = __webpack_require__(/*! ./../validation/register */ "../validation/register.js");

const validateLoginInput = __webpack_require__(/*! ./../validation/login */ "../validation/login.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    hello: () => {
      return "Hello";
    },
    users: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_3__["isAuthenticated"], async (parent, args, {
      models,
      me
    }, info) => {
      // auth check for every query and mutation except for the signup mutation
      return models.User.find({});
    }),
    user: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_3__["isAuthenticated"], async (parent, {
      email
    }, {
      models,
      me
    }, info) => {
      // auth check for every query and mutation except for the signup mutation
      return models.User.findOne({
        email
      });
    })
  },
  Mutation: {
    signUp: async (parent, args, {
      models
    }, info) => {
      const {
        errors,
        isValid
      } = validateRegisterInput(args);

      if (!isValid) {
        throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__["UserInputError"]("Login failed!", {
          errors
        });
      }

      const {
        email,
        password,
        name
      } = args;
      const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.hash(password, 10);
      const checkIfExists = await models.User.findOne({
        email
      }).then();

      if (checkIfExists) {
        errors.email = "User with that email already exists";
        throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__["UserInputError"]("Sign up failed!", {
          errors
        });
      } else {
        const newUser = models.User.create({
          // id,
          email,
          password: hashedPassword,
          name
        });
        return newUser;
      }
    },
    signIn: async (parent, args, {
      models,
      secret,
      me
    }, info) => {
      const {
        errors,
        isValid
      } = validateLoginInput(args);

      if (!isValid) {
        throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__["UserInputError"]("Login failed!", {
          errors
        });
      }

      const {
        email
      } = args;
      const user = await models.User.findOne({
        email
      }).then(async user => {
        if (!user) {
          errors.email = "User not found";
          throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__["UserInputError"]("Login failed!", {
            errors
          });
        }

        const passwordIsValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.compare(args.password, user.password);

        if (!passwordIsValid) {
          throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__["AuthenticationError"]("Invalid login/password!");
        }

        return user;
      });
      const token = await Object(_connectors_jwt__WEBPACK_IMPORTED_MODULE_1__["createToken"])(user, secret);
      return {
        email: user.email,
        token
      };
    }
  }
});

/***/ }),

/***/ "../schema/index.js":
/*!**************************!*\
  !*** ../schema/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "../schema/user.js");
/* harmony import */ var _note__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./note */ "../schema/note.js");



const linkSchema = apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  scalar Date
  
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`; //schema stitch

/* harmony default export */ __webpack_exports__["default"] = ([linkSchema, _user__WEBPACK_IMPORTED_MODULE_1__["default"], _note__WEBPACK_IMPORTED_MODULE_2__["default"]]);

/***/ }),

/***/ "../schema/note.js":
/*!*************************!*\
  !*** ../schema/note.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  extend type Query {
    note(id: ID!): Note
    notes(filter: String): [Note]
  }

  extend type Mutation {
    createNote(
      title: String!
      body: String!
    ): Note

    editNote(
      id: ID!
      title: String!
      body: String!
    ): Note

    deleteNote(id: ID!): ID
  }

  type Note {
    id: ID!
    title: String!
    body: String!
    user: String
    created_at: Date
    updated_at: Date
  }
`);

/***/ }),

/***/ "../schema/user.js":
/*!*************************!*\
  !*** ../schema/user.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  extend type Query {
    hello: String
    user(email: String!): User
    users: [User]
    me: User
  }

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      password2: String!
      name: String!
    ): User!

    signIn(email: String!, password: String!): Token!
  }

  type Token {
    id: String!
    name: String!
    email: String!
    token: String!
  }

  type User {
    name: String!
    email: String!
    created_at: Date
    updated_at: Date
  }
`);

/***/ }),

/***/ "../validation/login.js":
/*!******************************!*\
  !*** ../validation/login.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const _ = __webpack_require__(/*! lodash */ "lodash");

const Validator = __webpack_require__(/*! validator */ "validator");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !_.isEmpty(data.email) ? data.email : '';
  data.password = !_.isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};

/***/ }),

/***/ "../validation/register.js":
/*!*********************************!*\
  !*** ../validation/register.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const _ = __webpack_require__(/*! lodash */ "lodash");

const Validator = __webpack_require__(/*! validator */ "validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !_.isEmpty(data.name) ? data.name : '';
  data.email = !_.isEmpty(data.email) ? data.email : '';
  data.password = !_.isEmpty(data.password) ? data.password : '';
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, {
    min: 2,
    max: 30
  })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, {
    min: 6,
    max: 30
  })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};

/***/ }),

/***/ "./graphql.js":
/*!********************!*\
  !*** ./graphql.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models */ "../models/index.js");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../resolvers */ "../resolvers/index.js");
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../schema */ "../schema/index.js");
/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/keys */ "../config/keys.js");
/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_config_keys__WEBPACK_IMPORTED_MODULE_6__);






 //validate jwt then set me in graphql server context

const getMe = async token => {
  if (token) {
    try {
      const user = await jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.verify(token, _config_keys__WEBPACK_IMPORTED_MODULE_6___default.a.SECRET, {
        algorithm: ["HS256"]
      });
      return user;
    } catch (e) {
      throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["AuthenticationError"]("Your Session expired. Sign in again.");
    }
  }
};

const server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"]({
  typeDefs: _schema__WEBPACK_IMPORTED_MODULE_5__["default"],
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_4__["default"],
  //set context with things you would want to use across some/most/all resolvers
  context: async ({
    event,
    context
  }) => {
    const user = await getMe(event.headers.authorization);
    return {
      models: _models__WEBPACK_IMPORTED_MODULE_3__["default"],
      me: user,
      secret: _config_keys__WEBPACK_IMPORTED_MODULE_6___default.a.SECRET
    };
  }
}); //connect mongo dbs

const db = _config_keys__WEBPACK_IMPORTED_MODULE_6___default.a.MONGO_URI;
console.log(db);
mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));
exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
});

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "graphql-iso-date":
/*!***********************************!*\
  !*** external "graphql-iso-date" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-iso-date");

/***/ }),

/***/ "graphql-resolvers":
/*!************************************!*\
  !*** external "graphql-resolvers" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-resolvers");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })

/******/ })));