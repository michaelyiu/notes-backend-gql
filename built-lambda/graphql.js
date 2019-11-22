!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var i in e)t.d(n,i,function(r){return e[r]}.bind(null,i));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=14)}([function(e,r){e.exports=require("apollo-server-lambda")},function(e,r){e.exports=require("graphql-resolvers")},function(e,r){e.exports=require("mongoose")},function(e,r,t){e.exports=t(13)},function(e,r){e.exports=require("jsonwebtoken")},function(e,r){e.exports=require("bcryptjs")},function(e,r){e.exports=require("lodash")},function(e,r){e.exports=require("validator")},function(e,r,t){const n=t(2),i=new(0,n.Schema)({name:{type:String,required:!0},email:{type:String,required:!0},password:{type:String,required:!0},date:{type:Date,default:Date.now}});e.exports=n.model("users",i)},function(e,r,t){const n=t(2),i=n.Schema,o=new i({user:{type:i.Types.ObjectId,ref:"users"},title:{type:String,required:!0},body:{type:String,required:!0},date:{type:Date,default:Date.now}});e.exports=n.model("note",o)},function(e,r){e.exports=require("graphql-iso-date")},function(e,r,t){const n=t(6),i=t(7);e.exports=function(e){let r={};return e.name=n.isEmpty(e.name)?"":e.name,e.email=n.isEmpty(e.email)?"":e.email,e.password=n.isEmpty(e.password)?"":e.password,e.password2=n.isEmpty(e.password2)?"":e.password2,i.isLength(e.name,{min:2,max:30})||(r.name="Name must be between 2 and 30 characters"),i.isEmpty(e.name)&&(r.name="Name field is required"),i.isEmpty(e.email)&&(r.email="Email field is required"),i.isEmail(e.email)||(r.email="Email is invalid"),i.isEmpty(e.password)&&(r.password="Password field is required"),i.isLength(e.password,{min:6,max:30})||(r.password="Password must be at least 6 characters"),i.isEmpty(e.password2)&&(r.password2="Confirm Password field is required"),i.equals(e.password,e.password2)||(r.password2="Passwords must match"),{errors:r,isValid:n.isEmpty(r)}}},function(e,r,t){const n=t(6),i=t(7);e.exports=function(e){let r={};return e.email=n.isEmpty(e.email)?"":e.email,e.password=n.isEmpty(e.password)?"":e.password,i.isEmail(e.email)||(r.email="Email is invalid"),i.isEmpty(e.email)&&(r.email="Email field is required"),i.isEmpty(e.password)&&(r.password="Password field is required"),{errors:r,isValid:n.isEmpty(r)}}},function(e,r){e.exports={MONGO_URI:process.env.MONGODB_URI,SECRET:process.env.SECRET}},function(e,r,t){"use strict";t.r(r);var n=t(0),i=t(2),o=t.n(i),s=t(4),a=t.n(s),d=t(8),l=t.n(d),u=t(9),m=t.n(u),c={User:l.a,Note:m.a},p=t(10),f=t(1);const y=(e,r,{me:t})=>t?f.skip:new n.ForbiddenError("Not authenticated as user");var w={Query:{notes:async(e,r,{models:t},n)=>t.Note.find().sort({date:-1}),note:async(e,r,{models:t},n)=>{return t.Note.findById(r.id)}},Mutation:{createNote:Object(f.combineResolvers)(y,async(e,r,{me:t,models:n},i)=>{const{title:o,body:s}=r;return await n.Note.create({title:o,body:s,user:t.id})}),deleteNote:Object(f.combineResolvers)(y,async(e,r,{me:t,models:n},i)=>{const o=await n.Note.findById(r.id);if(o.user.toString()!==t.id)throw new Error("User not authorized");return o.remove().then(o).catch(e=>{throw new Error("Note not found")}),!0})}},g=t(5),S=t.n(g);const h=t(4),E=t(11),b=t(12);var v={Query:{hello:()=>"Hello",users:Object(f.combineResolvers)(y,async(e,r,{models:t,me:n},i)=>t.User.find({})),user:Object(f.combineResolvers)(y,async(e,{email:r},{models:t,me:n},i)=>t.User.findOne({email:r}))},Mutation:{signUp:async(e,r,{models:t},i)=>{const{errors:o,isValid:s}=E(r);if(!s)throw new n.UserInputError("Login failed!",{errors:o});const{email:a,password:d,name:l}=r,u=await S.a.hash(d,10);if(await t.User.findOne({email:a}).then())throw o.email="User with that email already exists",new n.UserInputError("Sign up failed!",{errors:o});return t.User.create({email:a,password:u,name:l})},signIn:async(e,r,{models:t,secret:i,me:o},s)=>{const{errors:a,isValid:d}=b(r);if(!d)throw new n.UserInputError("Login failed!",{errors:a});const{email:l}=r,u=await t.User.findOne({email:l}).then(async e=>{if(!e)throw a.email="User not found",new n.UserInputError("Login failed!",{errors:a});if(!await S.a.compare(r.password,e.password))throw new n.AuthenticationError("Invalid login/password!");return e}),m=await(async(e,r,t)=>{const{id:n,email:i}=e;return await h.sign({id:n,email:i},r,{algorithm:"HS256",expiresIn:"7d"})})(u,i);return{email:u.email,token:m}}}};var x=[{Date:p.GraphQLDateTime},v,w],q=n.gql`
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
    avatar: String
    date: String
  }
`,U=n.gql`
  extend type Query {
    note(id: ID!): Note
    notes: [Note]
  }

  extend type Mutation {
    createNote(
      title: String!
      body: String!
    ): Note

    deleteNote(id: ID!): Boolean
  }

  type Note {
    id: ID!
    title: String!
    body: String!
    user: String
    date: Date
  }
`;var N=[n.gql`
  scalar Date
  
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`,q,U],O=t(3),I=t.n(O);const j=new n.ApolloServer({typeDefs:N,resolvers:x,context:async({event:e,context:r})=>{const t=await(async e=>{if(e)try{return await a.a.verify(e,I.a.SECRET,{algorithm:["HS256"]})}catch(e){throw new n.AuthenticationError("Your Session expired. Sign in again.")}})(e.headers.authorization);return{models:c,me:t,secret:I.a.SECRET}}}),D=I.a.MONGO_URI;console.log(D),o.a.connect(D,{useNewUrlParser:!0,useFindAndModify:!1,useUnifiedTopology:!0}).then(()=>console.log("MongoDB Connected")).catch(e=>console.log(e)),exports.handler=j.createHandler({cors:{origin:"*",credentials:!0}})}]));