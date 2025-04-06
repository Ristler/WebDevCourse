// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?


import promisePool from '../../utils/database.js';


const listAllUsers = async () => {
    const [rows] = await promisePool.query('SELECT * FROM wsk_users');
    console.log('rows', rows);
    return rows;
};

const findUserById = async (id) => {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
    console.log('rows', rows);
     if (rows.length === 0) {
        return false;
     }
     return rows[0];
};




const addUser = async (user) => {
  let {name, username, email, password, role = 'User' } = user;

  console.log("wtf is this", role)
 
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
    return {user_id: rows[0].insertId};
};








const modifyUser = async (user, id) => {
  // Remove any sensitive/non-updatable fields
  //delete user.user_id;  // prevent changing the id
  //delete user.role;     // prevent changing the role

  
  const sql = promisePool.format('UPDATE wsk_users SET ? WHERE user_id = ?', [
    user,
    id,

  ]);
  const [rows] = await promisePool.execute(sql);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};



const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return {message: 'User not found'};
    }

    await connection.commit();
    return {message: 'success'};
  } catch (error) {
    await connection.rollback();
    console.error('Transaction rolled back due to error:', error);
    return {message: 'Transaction failed'};
  } finally {
    connection.release();
  }
};




const login = async (user) => {
  const sql = `SELECT * FROM wsk_users WHERE username = ?`;

  const [rows] = await promisePool.execute(sql, [user]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};


export {listAllUsers, findUserById, addUser, modifyUser, removeUser, login};