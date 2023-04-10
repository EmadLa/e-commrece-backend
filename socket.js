// const express = require('express');
// const { Message } = require("./Models/Message");
// const { Chat } = require("./Models/User");
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
//
// const PORT = 3005
// server.listen(PORT);
//
// const io = require('socket.io')(server);
//
// const socketApi = {
//     io: io,
// };
//
// io.on('connection', (socket) => {
//     console.log("connection");
//     socket.on('sendChatToServer', async (data) => {
//         console.log("Test data from socket");
//         console.log(data);
//         let storedMessage = await storeMessage(data);
//
//
//     });
//     socket.on('disconnect', (socket) => {
//         console.log("Disconnect");
//     });
// });
//
// async function storeMessage(data) {
//     let dataContent = JSON.parse(data);
//     let checkIfExists = await Chat.findOne({
//         $or: [{
//             $and: [
//                 {
//                     source_user_id: dataContent.source_user_id
//                 },
//                 {
//                     destination_user_id: dataContent.destination_user_id
//                 },
//             ]
//         },
//         {
//             $and: [
//                 {
//                     source_user_id: dataContent.destination_user_id
//                 },
//                 {
//                     destination_user_id: dataContent.source_user_id
//                 },
//             ]
//         },
//         ]
//     });
//
//     if (!checkIfExists) {
//         let chat = new Chat({
//             source_user_id: dataContent.source_user_id,
//             destination_user_id: dataContent.destination_user_id,
//         });
//         await chat.save();
//         let storedMessage = new Message({
//             message: dataContent.message,
//             source_user_id: dataContent.source_user_id,
//             destination_user_id: dataContent.destination_user_id,
//             chat_id: chat.id
//         });
//         await storedMessage.save();
//         io.sockets.emit('sendChatToClientـ' + chat.id, JSON.stringify(storedMessage));
//         await sendNotification(dataContent.destination_user_id, dataContent.message);
//         return storedMessage;
//
//     } else {
//         await Chat.findOneAndUpdate({ _id: checkIfExists.id }, { last_message: dataContent.message }, {
//             returnOriginal: false
//         });
//         const storedMessage = new Message({
//             message: dataContent.message,
//             source_user_id: dataContent.source_user_id,
//             destination_user_id: dataContent.destination_user_id,
//             chat_id: checkIfExists.id
//         });
//         await storedMessage.save();
//         io.sockets.emit('sendChatToClientـ' + checkIfExists.id, JSON.stringify(storedMessage));
//         await sendNotification(dataContent.destination_user_id, dataContent.message);
//         return storedMessage;
//     }
//
//
// }
//
// async function sendNotification(to, message) {
//     try {
//
//         let payload = { destination_user_id: to, message: message };
//
//         let req = await axios.post("https://staging.tryflikk.com/api/send_chat_notification", payload);
//         console.log(req);
//         return req.data
//     }
//     catch (err) {
//         console.log(err)
//         return ({ code: 400, message: 'invalid fcmToken' })
//     }
// }
//
// module.exports = socketApi;
