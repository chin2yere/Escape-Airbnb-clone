import users_sequelize from "../models/users_sequelize.js";
import listings_sequelize from "../models/listings_sequelize.js";

const LoginUser = async (req, res) => {
  try {
    const username = req.params.username;
    const password = req.params.password;

    const results = await users_sequelize.findOne("Username", username);
    const user = results.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    if (password != user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const results = await users_sequelize.findAll();
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get many users
const getUsersByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    const results = await users_sequelize.findAllByConstraint(
      constraint,
      parseInt(value)
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get one user
const getUserByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    //console.log(constraint, value);
    const results = await users_sequelize.findOne(constraint, parseInt(value));
    console.log(results.rows);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new user
const createUser = async (req, res) => {
  try {
    const {
      Username,
      Password,
      Name,
      Upcoming_trips,
      Past_trips,
      Wishlists,
      Address,
      Language,
      Intro,
      Ratings,
      Work,
      Picture_url,
    } = req.body;
    const results = await users_sequelize.create(
      Username,
      Password,
      Name,
      Upcoming_trips,
      Past_trips,
      Wishlists,
      Address,
      Language,
      Intro,
      Ratings,
      Work,
      Picture_url
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update existing user
const updateUser = async (req, res) => {
  //console.log(req.body);
  try {
    const {
      Username,
      Password,
      Name,
      Upcoming_trips,
      Past_trips,
      Wishlists,
      Address,
      Language,
      Intro,
      Ratings,
      Work,
      Picture_url,
    } = req.body;
    const results = await users_sequelize.update(
      req.params.id,
      Username,
      Password,
      Name,
      Upcoming_trips,
      Past_trips,
      Wishlists,
      Address,
      Language,
      Intro,
      Ratings,
      Work,
      Picture_url
    );
    //console.log(results);
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete existing user
const deleteUser = async (req, res) => {
  try {
    const { constraint, value } = req.body;
    const results = await users_sequelize.deleteUser(constraint, value);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//now for listings
const getListings = async (req, res) => {
  try {
    const results = await listings_sequelize.findAll();
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get many listings
const getListingsByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    const results = await listings_sequelize.findAllByConstraint(
      constraint,
      parseInt(value)
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get one listing
const getListingByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    //console.log(constraint, value);
    const results = await listings_sequelize.findOne(
      constraint,
      parseInt(value)
    );
    console.log(results.rows);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new listing
const createListing = async (req, res) => {
  try {
    const {
      Name,
      Location,
      Price_per_night,
      Type,
      Reviews,
      Host,
      About,
      Bedrooms,
      Amenities,
      Booked_days,
      Photo_gallery,
    } = req.body;
    const results = await listings_sequelize.create(
      Name,
      Location,
      Price_per_night,
      Type,
      Reviews,
      Host,
      About,
      Bedrooms,
      Amenities,
      Booked_days,
      Photo_gallery
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update existing listing
const updateListing = async (req, res) => {
  //console.log(req.body);
  try {
    const {
      Name,
      Location,
      Price_per_night,
      Type,
      Reviews,
      Host,
      About,
      Bedrooms,
      Amenities,
      Booked_days,
      Photo_gallery,
    } = req.body;
    const results = await listings_sequelize.update(
      req.params.id,
      Name,
      Location,
      Price_per_night,
      Type,
      Reviews,
      Host,
      About,
      Bedrooms,
      Amenities,
      Booked_days,
      Photo_gallery
    );
    //console.log(results);
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete existing user
const deleteListing = async (req, res) => {
  try {
    const { constraint, value } = req.body;
    const results = await listings_sequelize.deleteUser(constraint, value);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export default {
  LoginUser,
  getUsers,
  getUsersByConstraint,
  getUserByConstraint,
  createUser,
  updateUser,
  deleteUser,
  getListings,
  getListingsByConstraint,
  getListingByConstraint,
  createListing,
  updateListing,
  deleteListing,
};
