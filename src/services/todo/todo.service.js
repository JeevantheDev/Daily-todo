import { db } from '../../config/firebase';

export const getAllTodos = (userID) => {
  return new Promise((resolve, reject) => {
    let response = [];
    db.collection('todos')
      .where('userID', '==', userID)
      .orderBy('date', 'asc')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          resolve('Sorry!!No Board Found.');
        }
        snapshot.forEach((doc) => {
          response.push({ ...doc.data(), boardID: doc.id });
        });
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addTodoBoard = (userID, date) => {
  return new Promise((resolve, reject) => {
    if (date) {
      db.collection('todos')
        .add({
          userID,
          date,
          todos: [],
          createAt: new Date(),
        })
        .then(() => {
          getAllTodos(userID)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject(new Error('Date is not valid'));
    }
  });
};

export const updateTodoBoard = (todoBoard, boardID, userID) => {
  return new Promise((resolve, reject) => {
    db.collection('todos')
      .doc(boardID)
      .set({
        ...todoBoard,
        createAt: new Date(),
      })
      .then(() => {
        getAllTodos(userID)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteTodoBoard = (id) => {
  return new Promise((resolve, reject) => {
    if (id) {
      db.collection('todos')
        .doc(id)
        .delete()
        .then(() => {
          resolve(id);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject(new Error('Id is not valid'));
    }
  });
};
