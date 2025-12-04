const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, validate } = require("../model/user");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.status(409).send({ message: "User Already Exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashedPassword }).save();

    res.status(201).send({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
