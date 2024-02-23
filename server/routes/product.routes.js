import express from 'express'
  import productCtrl from '../controllers/product.controller.js' 
  const router = express.Router()
  router.route('/api/products').post(productCtrl.create)
  router.route('/api/products').get(productCtrl.list)
  router.route('/api/products/published').get(productCtrl.listPublished);
  router.param('productId', productCtrl.productByID)
  router.route('/api/products/:productId').get(productCtrl.read)
  router.route('/api/products/:productId').put(productCtrl.update)
  router.route('/api/products/:productId').delete(productCtrl.remove)
  router.delete('/api/products', productCtrl.removeAll);
  export default router
