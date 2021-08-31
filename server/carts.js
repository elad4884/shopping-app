const Joi = require("joi");
const router = require("express").Router();
const Cart = require('./models/Cart');
const Product = require('./models/Product');

router.get("/", async (req, res) => {
  try{
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get("/:id", async (req, res) => {
    try{
        const cart = await Cart.findById(req.params.id);
        if(!cart)
          return res.status(404).json({message: "Cart with the given ID was not found."});
        res.json(cart);
      } catch (err) {
        res.status(500).json({message: err.message})
      }
});



router.post("/", async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const products = req.body.products;
    let counter = 0;
    products.forEach(async p => {
        const product = await Product.findById(p._id);
        if(!product)
            return res.status(404).send(`product with the ID ${p._id} does not exist`);
        counter++;
        if(counter === products.length){
            const cart = new Cart({
                products: req.body.products,
                time_stamp: req.body.time_stamp
            });
            try {
                const newCart = await cart.save();
                res.status(201).json(newCart);
            } catch (err) {
                res.status(400).json({message: err.message});
            }
        }
    })
    
});

router.put("/:id", async (req, res) => {
  const { error } = validateCart(req.body);
  if (error) return res.status(400).send(error.details[0].message);

    const products = req.body.products;
    let counter = 0;
    products.forEach(async p => {
        const product = await Product.findById(p._id);
        if(!product)
            return res.status(404).send(`product with the ID ${p._id} does not exist`);
        counter++;
        if(counter === products.length){
            try {
                const cart = await Cart.findByIdAndUpdate(req.params.id, 
                {
                    products: req.body.products,
                    time_stamp: req.body.time_stamp,
                })
                if(!cart)
                    return res.status(404).json({message: "Cart with the given ID was not found."});
                res.json(cart);
            } catch (err) {
                res.status(500).json({message: err.message})
            }
        }
    })
    
});

router.delete("/:id", async (req, res) => {
  try{
    const cart = await Cart.remove({_id: req.params.id});
    res.json(cart);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

function validateCart(product) {
  const schema = Joi.object({
    products: Joi.array().items(Joi.object({
        _id: Joi.string(),
        cost: Joi.number().min(0),
        amount: Joi.number().min(1)
    })),
    time_stamp: Joi.date().required()
  });
  return schema.validate(product);
}

module.exports = router;