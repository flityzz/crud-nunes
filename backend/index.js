const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

//use json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//test api with error handling
app.get('/', (req, res, next) => {
  try {
    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    next(err);
  }
});


app.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// //get user by id
// app.get('/users/:id', async (req, res, next) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: Number(req.params.id) },
//     });
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// });

//create user
app.post('/products', async (req, res, next) => {
  
  try {
    const product = await prisma.product.create({
      data: {
        code: parseInt(req.body.code),
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price)
      },
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// //update user
// app.put('/users/:id', async (req, res, next) => {
//   try {
//     const user = await prisma.user.update({
//       where: { id: Number(req.params.id) },
//       data: { ...req.body },
//     });
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// });

// //delete user
// app.delete('/users/:id', async (req, res, next) => {
//   try {
//     const user = await prisma.user.delete({
//       where: { id: Number(req.params.id) },
//     });
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// });

//Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));