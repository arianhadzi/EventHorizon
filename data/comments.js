import {events} from '../config/mongoCollections.js';
import {users} from '../config/mongoCollections.js';
import { comments } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as e from './events.js'
import validation from '../validation.js';

let exportedMethods = {

createComment: async (user, eventID, comment, rating) => 

{

comment = validation.checkString(comment, "Comment")

const comm = await comments()
const event = await events()
const ev = e.get(eventID)
const evID = ObjectId.createFromHexString(eventID);

if (typeof rating !== 'undefined'  && rating !== null) 

    {

    let total = ev.avgRating * ev.noOfRatings
    let newTotal = total + rating
    let newRatingCount = ev.noOfRatings + 1

    let newAvgRating = newTotal/newRatingCount
    
    }





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
  
  }

}

export default exportedMethods;
