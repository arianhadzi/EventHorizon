import {events} from '../config/mongoCollections.js';
import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../validation.js';

let exportedMethods = {

create: async (eventOrganizer, eventOrganizerName, eventName, eventDate, eventDescription, eventLocation, eventCategory) => 

{

const event = await events()

if (!eventCategory || eventCategory.length === 0) throw 'Please provide at least one category'
if (!eventDate) throw 'Please provide date'

eventName = validation.checkString(eventName, "Event Name")
eventDescription = validation.checkString(eventDescription, "Event Description")
eventLocation = validation.checkString(eventLocation, "Event Location")
eventCategory = validation.checkStringArray(eventCategory, "Event Category")

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
    eventID = validation.checkId(eventID)

    const event = await events();
  
    const idno = ObjectId.createFromHexString(eventID);
    
    const ev = await event.findOne({_id: idno});
    
    if (!ev) throw 'Could not find event';
    
    //ev._id = idno.toString();
    
    return ev;

},

remove : async(eventID) => 

{

    eventID = validation.checkId(eventID)
      
    const event = await events();
    
    const idno = ObjectId.createFromHexString(eventID);
    
    const deletedEv = await event.findOneAndDelete({_id: idno});
    
    if (!deletedEv) throw 'Could not find event';
    
    return deletedEv.eventName + ' has been deleted';

},

update : async(eventID, eventName, eventDate, eventDescription, eventLocation, eventCategory) =>

{

const event = await events()

eventID = validation.checkId(eventID)
if (!eventCategory || eventCategory.length === 0) throw 'Please provide at least one category'
if (!eventDate) throw 'Please provide date'

eventName = validation.checkString(eventName, "Event Name")
eventDescription = validation.checkString(eventDescription, "Event Description")
eventLocation = validation.checkString(eventLocation, "Event Location")
eventCategory = validation.checkStringArray(eventCategory, "Event Category")

const idno = ObjectId.createFromHexString(eventID);

let eventUpdate = {eventName, eventDate, eventDescription, eventLocation, eventCategory}

const updatedEvent = event.findOneAndUpdate({_id: idno},
    {$set: eventUpdate},
    {returnDocument: 'after'})


if (!updatedEvent) throw 'Could not update event'

//updatedEvent._id = idno.toString();
  
return updatedEvent;

}
}

export default exportedMethods;
