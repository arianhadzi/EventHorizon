import {comments, events} from '../config/mongoCollections.js';
import {users} from '../config/mongoCollections.js';
import { comments } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../validation.js';

let exportedMethods = {

create: async () => {

},


getAll : async () => {
  const comments = await comments()
  let commentList = await comments.find({}).toArray();
  if (!commentList) throw 'Could not get all comments';
 
  return commentList;
  },


get : async(commentID) => {
  commentID = validation.checkId(commentID)
  const comments = await comments();
  const idno = ObjectId.createFromHexString(eventID);
  const comment = await comments.findOne({_id: idno});
  
  if (!comment) throw 'Could not find comment';

  return comment;

},

remove : async(commentID) => {
  commentID = validation.checkId(commentID)
  const comments = await events();
  const idno = ObjectId.createFromHexString(commentID);
  const deletedComment = await comments.findOneAndDelete({_id: idno});
  
  if (!deletedComment) throw 'Could not find comment';
  
  return deletedComment.comment + ' has been deleted';

},

update : async() =>

{


},

search : async() =>

{



}

}

export default exportedMethods;
