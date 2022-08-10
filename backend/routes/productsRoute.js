const express = require('express');
const { createProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct } = require('../controllers/productsController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(getAllProducts);

router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"),  createProduct);

router.route('/product/:id').get(getProductDetails).put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;