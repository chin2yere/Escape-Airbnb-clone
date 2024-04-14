import users_sequelize from "../models/users_sequelize.js";
import listings_sequelize from "../models/listings_sequelize.js";
import nodemailer from "nodemailer";

const sendEmailBook = async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chinyereofforcode@gmail.com",
        pass: process.env.EMAILTOKEN,
      },
    });

    var mailOptions = {
      from: "chinyereofforcode@gmail.com",
      to: "obiagelichinyere566@gmail.com",
      subject: "Your upcoming trip with escape",
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank You for Booking!</h1>
          <p>We are thrilled to have you as our guest. Your booking has been confirmed.</p>
          <p>You have made an initial payment of $250. you will meet in person on the day of your travel to sign your lease and complete your payment.</p>
          <p>If you have any questions or need further assistance, feel free to contact us.</p>
          <p>We look forward to welcoming you!</p>
        </div>
      </body>
    </html>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//
const sendEmailCancel = async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chinyereofforcode@gmail.com",
        pass: process.env.EMAILTOKEN,
      },
    });

    var mailOptions = {
      from: "chinyereofforcode@gmail.com",
      to: "obiagelichinyere566@gmail.com",
      subject: "Your trip has been cancelled",
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <h1>You canceled!</h1>
        <p>Your reservation has been successfully cancelled.</p>
        <p>We hope to welcome you back soon for another great experience!</p>
        <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
        <p>Thank you for choosing us!</p>
        </div>
      </body>
    </html>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//
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
    //console.log(results.rows);
    return res.status(200).json(results.rows[0]);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
      Chats,
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
      Chats,
      Work,
      Picture_url
    );
    res.status(201).json(results.rows[0]);
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
      Chats,
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
      Chats,
      Work,
      Picture_url
    );
    console.log(results.rows[0]);
    res.status(201).json(results.rows[0]);
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
    //console.log(value);
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
    //console.log(results.rows);
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
      Pin,
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
      Pin,
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
      Pin,
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
      Pin,
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
    res.status(201).json(results.rows[0]);
    //res.status(201).json(results.rows);
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
  sendEmailBook,
  sendEmailCancel,
};
