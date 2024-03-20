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

const create = (Username, Password, Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url) => {
  
    const query = 'INSERT INTO users ( Username, Password, Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'
    return pool.query(query, [ Username, Password, Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url])
  }
  
const update = (id, Username, Password, Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url) => {
    const query = 'UPDATE users SET Username = $2, Password=$3, Name = $4, Upcoming_trips = $5, Past_trips = $6, Wishlists = $7, Address = $8, Language = $9, Intro=$10, Ratings=$11, Work=$12, Picture_url=$13  WHERE id = $1'
    return pool.query(query, [id, Username, Password, Name, Upcoming_trips, Past_trips, Wishlists, Address, Language, Intro, Ratings, Work, Picture_url])
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