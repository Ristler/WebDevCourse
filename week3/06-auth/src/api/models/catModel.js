// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?


import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.execute(
    'SELECT wsk_cats.*, wsk_users.name as "owner_name" FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id'
  );
  console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
    console.log('rows', rows);
     if (rows.length === 0) {
        return false;
     }
     return rows[0];
};


const addCat = async (cat, tokenId) => {
  const {cat_name, weight, filename, birthdate} = cat;
  
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, tokenId, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};



const modifyCat = async (cat, id, tokenId, admin) => {

  if(admin) {
    const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
    const rows = await promisePool.execute(sql);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
     return {message: 'success'};
  }
  console.log("Tokenidddd", tokenId)
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`, [cat, id, tokenId]);
    const rows = await promisePool.execute(sql);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
     return {message: 'success'};
};








const removeCat = async (id, tokenId, admin) => {
  try {
    console.log('Remove cat called with:', { id, tokenId, admin });
    
    const catId = Number(id);
    const userId = Number(tokenId);
    
    let sql;
    let params;
    
    if (admin) {
      sql = 'DELETE FROM wsk_cats WHERE cat_id = ?';
      params = [catId];
    } else {
      sql = 'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?';
      params = [catId, userId];
    }
    
    console.log('SQL query:', { sql, params });
    
    const [rows] = await promisePool.execute(sql, params);
    console.log('Delete result:', rows);
    
    if (rows.affectedRows === 0) {
      return { message: 'Cat not found or not authorized' };
    }
    return { message: 'success' };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};



const findCatByOwnerId = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE owner = ?', [id]);
  
    console.log('rows', rows);
     if (rows.length === 0) {
        return false;
     }
     return rows;

  // todo: Implement this function
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat, findCatByOwnerId};