// routes/user.js
const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const upload = require("../config/cloudinary.config");

// ================= AUTH =================
router.post("/register", ctrls.register);
router.get("/finalRegister/:token", ctrls.finalRegister);

router.post("/login", ctrls.login);
router.get("/profile", verifyToken, ctrls.getUserProfile);

router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);

// ================= PASSWORD =================
router.get("/forgot-password", ctrls.forgotPassword);
router.put("/reset-password/:token", ctrls.resetPassword);

// ================= CART =================
router.get("/cart", verifyToken, ctrls.getCart);
router.post("/cart", verifyToken, ctrls.addToCart);
router.put("/cart", verifyToken, ctrls.updateCart);
router.delete("/cart", verifyToken, ctrls.removeFromCart);

// ================= WISHLIST =================
router.post("/wishlist", verifyToken, ctrls.toggleWishlist);
router.post("/wishlist/add", verifyToken, ctrls.addToWishlist);
router.get("/wishlist", verifyToken, ctrls.getWishlist);
router.delete("/wishlist", verifyToken, ctrls.removeFromWishlist);

// ================= USER MANAGEMENT =================
router.get("/", [verifyToken, isAdmin], ctrls.getUsers);
router.delete("/:id", [verifyToken, isAdmin], ctrls.deleteUser);
router.put("/:id", verifyToken, ctrls.updateUser);
router.put("/:id/admin", [verifyToken, isAdmin], ctrls.updateUserbyAdmin);

// ================= ADMIN USER MANAGEMENT =================
router.get("/admin/users", [verifyToken, isAdmin], ctrls.getAllUsersAdmin);
router.get("/admin/:userId", [verifyToken, isAdmin], ctrls.getUserByIdAdmin);
router.post("/admin/create", [verifyToken, isAdmin, upload.single("avatar")], ctrls.createUserAdmin);
router.put("/admin/:userId", [verifyToken, isAdmin, upload.single("avatar")], ctrls.updateUserAdmin);
router.delete("/admin/:userId", [verifyToken, isAdmin], ctrls.deleteUserAdmin);
router.put("/admin/:userId/toggle-block", [verifyToken, isAdmin], ctrls.toggleBlockUserAdmin);

module.exports = router;
