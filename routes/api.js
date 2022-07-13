const express = require('express');
const router = express.Router();
const products = require('../modules/products');

router.get('/search/:brand', (req, res) => {
  const brand = req.params.brand.toUpperCase();
  const result = products.filter((elem) => elem.name.includes(brand));

  res.json({ result }).status(200).end();
});

router.get('/search/:brand/:color', (req, res) => {
  const brand = req.params.brand.toUpperCase();
  const color = req.params.color.toLowerCase();
  const result = products.filter((elem) => elem.name.includes(brand) && elem.color === color);

  res.json({ result }).status(200).end();
});

router.get('/search/:brand/:color/:price', (req, res) => {
  const brand = req.params.brand.toUpperCase();
  const color = req.params.color.toLowerCase();
  const price = req.params.price.toLowerCase();
  const result = products.filter((elem) => elem.name.includes(brand) && elem.color === color && elem.price < price);

  res.json({ result }).status(200).end();
});


router.get('/search', (req, res) => {
  const { brand, color, price } = req.query;
  const result = products.filter((elem) => {
    // if (brand && color && price)
    //   return elem.name.includes(brand.toUpperCase()) && elem.color === color.toLowerCase() && elem.price < price;
    // else if (brand && color && !price) return elem.name.includes(brand.toUpperCase()) && elem.color === color.toLowerCase();
    // else if (brand && !color && price) return elem.name.includes(brand.toUpperCase()) && elem.price < price;
    // else if (!brand && color && price) return elem.color === color.toLowerCase() && elem.price < price;
    // else if (!brand && !color && price) return elem.price < price;
    // else if (!brand && color && !price) return elem.color === color.toLowerCase();
    // else return elem.name.includes(brand.toUpperCase());

    return (
      brand && color && price
        ? elem.name.includes(brand.toUpperCase()) && elem.color === color.toLowerCase() && elem.price < price
        : brand && color && !price
          ? elem.name.includes(brand.toUpperCase()) && elem.color === color.toLowerCase()
          : brand && !color && price
            ? elem.name.includes(brand.toUpperCase()) && elem.price < price
            : !brand && color && price
              ? elem.color === color.toLowerCase() && elem.price < price
              : !brand && !color && price
                ? elem.price < price
                : !brand && color && !price
                  ? elem.color === color.toLowerCase()
                  : elem.name.includes(brand.toUpperCase())
    );
  });
  result.length
    ? res.json({ result }).status(200).end()
    : res.json({ error: 'No existen resultados' }).status(404).end();
});

module.exports = router;