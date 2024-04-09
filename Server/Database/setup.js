import pool from "../config/database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userdata = fs.readFileSync(path.resolve(__dirname, "users.json"), "utf8");
const listingsdata = fs.readFileSync(
  path.resolve(__dirname, "listings.json"),
  "utf8"
);

const createUsersTable = async () => {
  try {
    const createTableQuery = `
      DROP TABLE IF EXISTS users;
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        Username VARCHAR(255) NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Name VARCHAR(255) NOT NULL,
        Upcoming_trips JSON[] NOT NULL,
        Past_trips JSON[] NOT NULL,
        Wishlists JSON[] NOT NULL,
        Address VARCHAR(255) NOT NULL,
        Language VARCHAR(255) NOT NULL,
        Intro VARCHAR(255) NOT NULL,
        Chats VARCHAR(255)[] NOT NULL,
        Work VARCHAR(255) NOT NULL,
        Picture_url VARCHAR(255) NOT NULL
      )
    `;
    await pool.query(createTableQuery);
  } catch (error) {
    console.log(error);
  }
};

const insertUsers = async () => {
  try {
    const insertQuery = `
      INSERT INTO users ( Username, Password, Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Chats, Work, Picture_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    const users = JSON.parse(userdata);

    for (let user of users) {
      const values = [
        user.Username,
        user.Password,
        user.Name,
        user.Upcoming_trips,
        user.Past_trips,
        user.Wishlists,
        user.Address,
        user.Language,
        user.Intro,
        user.Chats,
        user.Work,
        user.Picture_url,
      ];

      await pool.query(insertQuery, values);
      console.log(`✅ added ${user.Name}`);
    }
  } catch (error) {
    console.log(error);
  }
};
//listings
const createListingsTable = async () => {
  try {
    const createTableQuery = `
      DROP TABLE IF EXISTS listings;
      CREATE TABLE IF NOT EXISTS listings (
        id SERIAL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Location VARCHAR(255) NOT NULL,
        Price_per_night INT NOT NULL,
        Type VARCHAR(255) NOT NULL,
        Reviews JSON[] NOT NULL,
        Host VARCHAR(255) NOT NULL,
        About VARCHAR(255) NOT NULL,
        Bedrooms INT NOT NULL,
        Amenities VARCHAR(255)[] NOT NULL,
        Booked_days JSON NOT NULL,
        Photo_gallery VARCHAR(255)[] NOT NULL
      )
    `;
    await pool.query(createTableQuery);
  } catch (error) {
    console.log(error);
  }
};

const insertListings = async () => {
  try {
    const insertQuery = `
      INSERT INTO listings ( Name, Location, Price_per_night, Type, Reviews, Host, About, Bedrooms, Amenities, Booked_days, Photo_gallery)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;

    const listings = JSON.parse(listingsdata);

    for (let listing of listings) {
      const values = [
        listing.Name,
        listing.Location,
        listing.Price_per_night,
        listing.Type,
        listing.Reviews,
        listing.Host,
        listing.About,
        listing.Bedrooms,
        listing.Amenities,
        listing.Booked_days,
        listing.Photo_gallery,
      ];

      await pool.query(insertQuery, values);
      console.log(`✅ added ${listing.Name}`);
    }
  } catch (error) {
    console.log(error);
  }
};
const setup = async () => {
  await createUsersTable();
  await insertUsers();
  await createListingsTable();
  await insertListings();
};

export default setup;
