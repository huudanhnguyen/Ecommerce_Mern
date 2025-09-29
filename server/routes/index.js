const userRouter = require('./user');
const productRouter = require('./product');
const insertRouter = require('./insert');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('../middlewares/errHandler');

const initRoutes = (app) => {
    // Auth + User management
    app.use('/api/user', userRouter);

    // User profile (riêng biệt để tránh trùng route /:id)
    app.use('/api/user/profile', require('./userProfile'));

    app.use('/api/product', productRouter);
    app.use('/api/product-categories', require('./productCategory'));
    app.use('/api/blog-categories', require('./blogCategory'));
    app.use('/api/blog', require('./blog'));
    app.use('/api/slider', require('./slider'));
    app.use('/api/brand', require('./brand'));
    app.use('/api/coupon', require('./coupon'));
    app.use('/api/address', require('./address'));
    app.use('/api/order', require('./order'));
    app.use('/api/cart', require('./cart'));
    app.use('/api/insert', insertRouter);

    app.use(notFound);
    app.use(errorHandler); // Middleware xử lý lỗi cuối cùng
};

module.exports = initRoutes;
