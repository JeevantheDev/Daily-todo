import { db } from '../../config/firebase';
import { getAllTodos } from '../todo/todo.service';

export const getTodoBoardByDate = (userID, dateRange) => {
  return new Promise((resolve, reject) => {
    let response = [];
    dateRange.start && dateRange.end
      ? db
          .collection('todos')
          .where('userID', '==', userID)
          .where('date', '>=', dateRange.start)
          .orderBy('date', 'asc')
          .endBefore(dateRange.end)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              resolve('Sorry!!No Board Found.');
            }
            snapshot.forEach((doc) => {
              response.push({ ...doc.data(), boardID: doc.id });
            });
            console.log(response);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          })
      : getAllTodos(userID)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
  });
};
