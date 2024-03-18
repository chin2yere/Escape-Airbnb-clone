import express from "express";

import route_functions from "../controllers/route_functions.js";

const router = express.Router();
router.get("/users", route_functions.getUsers);
router.get("/users/:constraint/:value", route_functions.getUsersByConstraint);
router.get("/user/:constraint/:value", route_functions.getUserByConstraint);

router.post("/user", route_functions.createUser);
router.patch("/user/:id", route_functions.updateUser);
router.delete("/car", route_functions.deleteUser);
//everything company
router.get("/listings", route_functions.getListings);
router.get("/listings/:constraint/:value", route_functions.getListingsByConstraint);
router.get("/listing/:constraint/:value",  route_functions.getListingByConstraint);
router.post("/listing", route_functions.createListing);
router.patch("/listing/:id", route_functions.updateListing);
router.delete("/listing", route_functions.deleteListing);

export default router;