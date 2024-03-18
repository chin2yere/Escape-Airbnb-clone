import pool from '../config/database.js'

const findAll = () => {
  
    const query = 'SELECT * FROM users ORDER BY id ASC'
    return pool.query(query)
  
}

const findAllByConstraint = (constraint, value) => {
  if (value) {
    const query = `SELECT * FROM users WHERE ${constraint}= $1 ORDER BY id ASC`
    //console.log(pool.query(query, [constraint, value]))
    return pool.query(query, [ value])
  }
  
}

const findOne = (constraint, value) => {
  
  const query = `SELECT * FROM users WHERE ${constraint}= $1`
  return pool.query(query, [value])
}

const create = (Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url) => {
  
    const query = 'INSERT INTO users ( Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'
    return pool.query(query, [ Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url])
  }
  
const update = (id, Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url) => {
    const query = 'UPDATE users SET Name = $2, Upcoming_trips = $3, Past_trips = $4, Wishlists = $5, Address = $6, Language = $7, Intro=$8, Ratings=$9, Work=$10, Picture_url=$11  WHERE id = $1'
    return pool.query(query, [id, Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url])
  }
  
const deleteUser = (constraint,value) => {
    const query = `DELETE FROM users WHERE ${constraint} = $1`
    return pool.query(query, [value])
  }
export default {
  findAll,
  findAllByConstraint,
  findOne,
  create,
  update,
  deleteUser
}