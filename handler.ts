import { connectToDatabase } from "./connect_db";
import NoteModel from "./model";

export async function hello(event, context, callback) {
  const response = {
    statusCode: 200,
    body: `Hello world! 🍺🍺🍺 ${process.env.MONGODB_USERNAME}`,
  };

  callback(null, response);
}

export async function getNotes(event, context, callback) {
  /* By default, the callback waits until the runtime event loop is empty before 
  freezing the process and returning the results to the caller. 
  Setting this property to false requests that AWS Lambda freeze the process soon 
  after the callback is invoked, even if there are events in the event loop. 
  AWS Lambda will freeze the process, any state data, and the events in the event loop. 
  Any remaining events in the event loop are processed when the Lambda function is 
  next invoked, if AWS Lambda chooses to use the frozen process. */
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();
  const notes = await NoteModel.find();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(notes),
  });
}

export async function createNote(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { title, completed } = JSON.parse(event.body);

  await connectToDatabase();
  const note = await NoteModel.create({ title, completed });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(note),
  });
}
