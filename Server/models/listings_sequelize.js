import pool from "../config/database.js";

const findAll = () => {
  const query = "SELECT * FROM listings ORDER BY id ASC";
  return pool.query(query);
};

const findAllByConstraint = (constraint, value) => {
  if (value) {
    const query = `SELECT * FROM listings WHERE ${constraint}= $1 ORDER BY id ASC`;
    //console.log(pool.query(query, [constraint, value]))
    return pool.query(query, [value]);
  }
};

const findOne = (constraint, value) => {
  const query = `SELECT * FROM listings WHERE ${constraint}= $1`;
  return pool.query(query, [value]);
};

const create = (
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
) => {
  const query =
    "INSERT INTO listings ( Name, Location, Price_per_night, Type, Reviews, Host, About, Bedrooms, Amenities, Booked_days, Photo_gallery) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
  return pool.query(query, [
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
  ]);
};

const update = (
  id,
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
) => {
  const query =
    "UPDATE listings SET Name = $2, Location = $3, Price_per_night = $4, Type = $5, Reviews = $6, Host = $7, About=$8, Bedrooms=$9, Amenities=$10, Booked_days=$11, Photo_gallery=$12  WHERE id = $1 RETURNING *";
  return pool.query(query, [
    id,
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
  ]);
};

const deleteListing = (constraint, value) => {
  const query = `DELETE FROM listings WHERE ${constraint} = $1`;
  return pool.query(query, [value]);
};
export default {
  findAll,
  findAllByConstraint,
  findOne,
  create,
  update,
  deleteListing,
};
