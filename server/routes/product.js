const router = require("express").Router();
const ctrls = require("../controllers/product");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary.config");

router.put(
  "/uploadImage/:pid",
  [verifyToken, isAdmin],
  uploadCloud.array("images", 10),
  ctrls.uploadImageProduct
);
router.post(
  "/",
  [verifyToken, isAdmin],
  uploadCloud.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ctrls.createProduct
);
router.get("/", ctrls.getAllProducts);

router.get("/:pid", ctrls.getProduct);
router.put(
  "/:pid",
  [verifyToken, isAdmin],
  uploadCloud.array("images", 10),
  ctrls.updateProduct
);
router.delete("/:id", [verifyToken, isAdmin], ctrls.deleteProduct);

router.post("/:pid/ratings", verifyToken, ctrls.ratings);
router.get("/:pid/ratings", ctrls.getProductRatings);

module.exports = router;
