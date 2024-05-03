const { hash } = require("bcrypt");
const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
  async getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }
  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.status(200).send(users);
  }

  async store(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hashPassword(body.password),
        },
      });
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.find((user) => user.id === parseInt(id));

      if (user === undefined) {
        return res.status(404).send("User not found");
      }

      return res.status(200).send(user);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        status: "Error",
        message: "Internal server error",
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (user === undefined) {
        return res.status(404).send(" ID not found.");
      }

      await prisma.user.update({
        where: { id },
        data: body,
      });

      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }
  }
  async destroy(req, res) {
    try {
      const id = parseInt(req.params.id);

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      await prisma.user.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
}

module.exports = new UsersController();
