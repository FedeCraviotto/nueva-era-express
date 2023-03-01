const { validationResult } = require("../middlewares/registerValidator");
const bcrypt = require("bcryptjs");

const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op;
let provinces = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Corrientes",
  "Entre Rios",
  " Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquen",
  "Rio Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucuman",
];

const usersController = {
  login: (req, res) => {

    return res.render("users/login", { title: "Login" });
  },
  loginProcess: async (req, res) => {

    const { username, password, recordarUsuario } = req.body;
    let userToLogin;
    try {
      userToLogin = await db.User.findOne({
        where: { email: username },
      });
    } catch (error) {
      throw new Error("Hubo un error al conectarse a la db");
    }


    if (userToLogin) {
      const pwdMatch = bcrypt.compareSync(password, userToLogin.password);
      if (pwdMatch) {

        delete userToLogin.password;

        req.session.userLogged = userToLogin;
   
        if (recordarUsuario) {
          res.cookie("userEmail", req.body.username, {
            maxAge: 1000 * 60 * 30,
          });
        }

        return res.redirect("/");
      } else {
        return res.render("users/login", {
          title: "Login",
          errors: {
            email: {
              msg: "Las credenciales son invalidas",
            },
          },
        });
      }
    } else if (!userToLogin && username.trim() === "") {
      return res.render("users/login", {
        title: "Login",
        errors: {
          email: {
            msg: "Ingresa tu nombre de usuario",
          },
        },
      });
    } else {
      return res.render("users/login", {
        title: "Login",
        errors: {
          email: {
            msg: "No se encontro el email en la base de datos",
          },
        },
      });
    }
  },

  register: (req, res) => {
    return res.render("users/register", { title: "Register", provinces });
  },

  processRegister: async (req, res) => {
    const results = validationResult(req);
    if (results.errors.length > 0) {
      if (req.file && req.file.filename) {
        fs.unlinkSync(`./public/images/users/${req.file.filename}`);
      }
      return res.render("users/register", {
        title: "Register",
        provinces,
        errors: results.mapped(),
        oldData: req.body,
      });
    }

    try {
      const userInDb = await db.User.findAll({
        where: { email: req.body.email },
      });
      if (userInDb.length > 0) {
        return res.render("users/register", {
          title: "Register",
          errors: { email: { msg: "Este email ya esta registrado" } },
          oldData: req.body,
        });
      }

      const userToCreate = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar:
          req.file && req.file.filename ? req.file.filename : "default.jpg",
      };

      db.User.create(userToCreate)
        .then((user) => {
          db.User.update(
            {
              detail: `/api/users/${user.id}`,
            },
            {
              where: { id: user.id },
            }
          );
          return res.redirect("/users/login");
        })
        .catch((err) => {
          res.status(500).json({
            message:"occurio un error durante la creacion del usuario, intente mas tarde",
            error: err,
          });
        });
    } catch (error) {
        res.status(500).json({
            message: "occurio un error durante la creacion del usuario, intente mas tarde",
            error: err,
          });
    }
  },

  userProfile: (req, res) => {
    return res.render("users/userProfile", {
      title: "Profile",
      user: req.session.userLogged,
    });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    // req.session.destroy();
    // adapting to cookie-session
    req.session = null;
    return res.redirect("/");
  },

  edit: (req, res) => {
    return res.render("users/editUser", {
      userToEdit: req.session.userLogged,
      title: "Edit User",
    });
  },

  update: async (req, res) => {
    const userEdits = req.body;
    const userLogged = req.session.userLogged;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/editUser", {
        title: "Edit User",
        userToEdit: userLogged,
        errors: errors.mapped(),
      });
    } else {

      try {
        await db.User.update(
          {
            first_name: userEdits.first_name,
            last_name: userEdits.last_name,
            email: userEdits.email,
            avatar: req.file ? req.file.filename : userLogged.avatar,
          },
          {
            where: { id: req.params.id },
          }
        );

        if (req.file && userLogged.avatar != "default.jpg") {
          fs.unlinkSync("./public/images/users/" + userLogged.avatar);
        }

        req.session.userLogged = {
          ...userLogged,
          ...userEdits,
          avatar: req.file ? req.file.filename : userLogged.avatar,
        };

        return res.redirect("/");
      } catch (error) {
        throw new Error(
          "Ocurrio un problema al actualizar la informacion, intente nuevamente mas tarde"
        );
      }
    }
  },
  confirmDelete: async (req, res) => {
    const userToDelete = await db.User.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.render("users/deleteUser", {
      userToDelete,
      title: "Confirm delete",
    });
  },
  delete: async (req, res) => {
    const userLogged = req.session.userLogged;

    try {
      await db.User.destroy({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (userLogged.avatar != "default.jpg") {
        fs.unlinkSync("./public/images/users/" + userLogged.avatar);
      }
      req.session.destroy();
      res.clearCookie("userEmail");
      return res.redirect("/");
    } catch (error) {
      throw new Error(
        "Ocurrio un error al intentar eliminar la cuenta, por favor intente nuevamente"
      );
    }

  },
};
module.exports = usersController;
