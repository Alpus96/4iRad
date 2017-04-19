
{

 "getUserById": 
  "SELECT * FROM users where users.id=?",

  "getUserByMail":
  "SELECT * FROM users where users.Mail=?",

  "getAllUsers":
  "SELECT * FROM users",

  "addUsers":
  "INSERT INTO users SET ?"


}