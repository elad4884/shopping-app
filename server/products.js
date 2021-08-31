const Joi = require("joi");
const router = require("express").Router();
const Product = require('./models/Product');

router.get("/", async (req, res) => {
  try{
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});


router.get("/:id", async (req, res) => {
    try{
      const product = await Product.findById(req.params.id);
      if(!product)
        return res.status(404).json({message: "Product with the given ID was not found."});
      res.json(product);
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, 
      {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
      }, {new: true})
      if(!product)
        return res.status(404).json({message: "Product with the given ID was not found."});
      res.json(product);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.delete("/:id", async (req, res) => {
  try{
    const product = await Product.remove({_id: req.params.id});
    res.json(product);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required()
  });

  return schema.validate(product);
}

module.exports = router;