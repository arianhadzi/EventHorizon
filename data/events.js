import {events} from '../config/mongoCollections.js';
import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../validation.js';

let exportedMethods = {

create: async (eventOrganizer, eventOrganizerName, eventName, eventDate, eventDescription, eventLocation, eventCategory) => 

{

const event = await events()

if (!eventName || !eventDate || !eventDescription || !eventCategory) throw 'Please provide date, description and at least one category'

eventDescription = eventDescription.trim()

if (eventName.length === 0 || eventDescription.length === 0 || eventCategory.length === 0) throw 'Please provide description and at least one category'

let newEvent = {eventOrganizer, eventOrganizerName, eventDate, eventDescription, eventLocation, eventCategory, eventComments : [], noOfComments : 0, avgRating : 0}

const insertInfo = await event.insertOne(newEvent);
  
if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add event';

const newId = insertInfo.insertedId.toString();

const insertedEvent = await get(newId);

return insertedEvent;

},

getAll : async () => {

    const event = await events()
  
    let eventList = await event.find({}).toArray();
    
    if (!eventList) throw 'Could not get all events';
    /*
    eventList = eventList.map((element) => 
    
    {
    
    return {
    _id : element._id.toString(),
    eventName :  element.eventName
    };
  
    }
    
    );
    
    */return eventList;
  
  },


get : async(eventID) => 

{

    if (typeof eventID != 'string') throw 'ID must be a string';

    let id = eventID.trim();
    
    if (id.length === 0) throw 'ID cannot be empty';
    
    if (!ObjectId.isValid(id)) throw 'Invalid ID';

    const event = await events();
  
    const idno = ObjectId.createFromHexString(id);
    
    const ev = await event.findOne({_id: idno});
    
    if (!ev) throw 'Could not find event';
    
    //ev._id = idno.toString();
    
    return ev;

},

remove : async(eventID) => 

{

    if (typeof eventID != 'string') throw 'ID must be a string';

    eventID = eventID.trim();
      
    if (eventID.length === 0) throw 'ID cannot be empty';
      
    if (!ObjectId.isValid(eventID)) throw 'Invalid ID';
      
    const event = await events();
    
    const idno = ObjectId.createFromHexString(eventID);
    
    const deletedEv = await event.findOneAndDelete({_id: idno});
    
    if (!deletedEv) throw 'Could not find event';
    
    return deletedEv.eventName + ' has been deleted';

}


}

export default exportedMethods;
