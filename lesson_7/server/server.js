const express = require('express');
const fs = require('fs');
const app = express();
const moment = require('moment');

app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./public')); // запросы в корень нашего сайт отдают содержимое public

app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

app.get('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

app.post('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // добавляем новый товар
      cart.contents.push(req.body);
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
  fs.readFile('./server/db/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data);
      const event = {
        action: "добавлено",
        name: `${req.body.product_name}`,
        time: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
      }
      const stats = JSON.parse(data);
      stats.push(event);
      fs.writeFile('./server/db/stats.json', JSON.stringify(stats), (err) => {
        if (err) {
          console.log(err);
        }
      })
    }
  })
});

app.put('/api/cart/:id', (req, res) => { // /api/cart/56264
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      // изменяем количество
      find.quantity += req.body.quantity;
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});

app.delete('/api/cart/:id', (req, res) => { // /api/cart/56264
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      // удалить товар из объекта
      cart.contents.splice(cart.contents.indexOf(find), 1);
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
  fs.readFile('./server/db/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const event = {
        action: "удалено",
        name: `${req.body.product_name}`,
        time: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
      }
      const stats = JSON.parse(data);
      stats.push(event);
      fs.writeFile('./server/db/stats.json', JSON.stringify(stats), (err) => {
        if (err) {
          console.log(err);
        }
      })
    }
  })
});






const port = 5555;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
