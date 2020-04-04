const User = require("../model/User");
module.exports = {
  create: async (req, res) => {
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) return res.status(500).send("Email already exist");
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user
      .save()
      .then((doc) => {
        res.send({ doc });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getData: async (req, res) => {
    try {
      const data = await User.find({});
      res.status(200).send({ data });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findOneAndDelete({ _id: req.body.id }).then((doc) => {
        res
          .status(200)
          .send("deleted Successfully:" + JSON.stringify(doc.name));
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (req.body.password === user.password) {
          const payload = {
            _id: user.id,
            name: user.name,
            email: user.email,
          };
          res.send(payload);
        } else {
          res.send("password not matched");
        }
      } else {
        res.send("user not available");
      }
    } catch (err) {
      res.send("something went Wrong" + err);
    }
  },
};
