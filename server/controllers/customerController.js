const Customer = require('../models/Customer');

const customerController = {
  getAllCustomers: (req, res) => {
    Customer.getAll((err, customers) => {
      if (err) return res.status(500).json({ error: err });
      res.json(customers);
    });
  },
  getCustomerById: (req, res) => {
    const id = req.params.id;
    Customer.getById(id, (err, customer) => {
      if (err) return res.status(500).json({ error: err });
      res.json(customer);
    });
  },
  createCustomer: (req, res) => {
    const customer = req.body;
    Customer.create(customer, (err, customerId) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: customerId });
    });
  },
  updateCustomer: (req, res) => {
    const id = req.params.id;
    const customer = req.body;
    Customer.update(id, customer, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  },
  deleteCustomer: (req, res) => {
    const id = req.params.id;
    Customer.delete(id, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  }
};

module.exports = customerController;
