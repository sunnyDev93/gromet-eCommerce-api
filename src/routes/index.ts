import {Router} from 'express';

import authRoute from './auth.route';
import filesRoute from './files.route';
import booksRoute from './books.route';
import productsRoute from './product.route';
import articlesRoute from './article.route';
import ordersRoute from './order.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/files', filesRoute);
router.use('/books', booksRoute);
router.use('/articles', articlesRoute);
router.use('/orders', ordersRoute);
router.use('/prod', productsRoute);

export default router;
