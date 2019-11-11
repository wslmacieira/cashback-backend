const { Router } = require("express");

const User = require("./models/User");
const Compra = require("./models/Compra");

const routes = new Router();

routes.post("/sessions", async (req, res) => {
  const { email, senha } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      senha
    });
  }

  return res.json(user);
});

routes.post("/usuario", async (req, res) => {
  const { email, senha, cpf, nome } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "Usuario ja cadastrado" });
  }

  user = await User.create({
    email,
    senha,
    cpf,
    nome
  });

  return res.json(user);
});

routes.post("/compras", async (req, res) => {
  const { codigo, valor, cashback, date, status } = req.body;
  const { user_id } = req.headers;

  const user = await User.findById(user_id);

  if (!user) {
    return res.status(400).json({ message: "Usuario não existe" });
  }

  const compra = await Compra.create({
    user: user_id,
    codigo,
    valor,
    status,
    cashback,
    date
  });

  return res.json(compra);
});

routes.put("/compras/:id", async (req, res) => {
  Compra.findByIdAndUpdate(req.params.id, req.body, { new: true },
    (err, compra) => {
      if (err) return res.status(500).send(err);
        return res.send(compra);
    });
});

routes.delete("/compras/:id", async (req, res) => {
  Compra.findByIdAndRemove(req.params.id, (err, compra) => {
    if (err) return res.status(500).send(err);

    const response = {
      message: "Compra deletada",
      id: compra._id
    };
    return res.status(200).json({ message: "Compra deletada" });
  });
});

routes.get("/listar", async (req, res) => {
  const { user_id } = req.headers;

  const compras = await Compra.find({ user: user_id });

  return res.json(compras);
});

module.exports = routes;
