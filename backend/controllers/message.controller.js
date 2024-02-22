import Conversation from '../models/conversation.model.js'
import { io } from './../socket/socket.js';

import Message from '../models/message.model.js'
import { getRecieverSocketId } from './../socket/socket.js'
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id: recieverId } = req.params
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId]
      })
    }
    const newMessage = new Message({
      senderId,
      recieverId,
      message
    })
    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }
    await Promise.all([conversation.save(), newMessage.save()])

    // SOCKET IO

    const recieverSocketId = getRecieverSocketId(recieverId)
    if (recieverSocketId) {
      io.to(recieverSocketId).emit('newMessage', newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    console.log('Error sending message', error.message)
    res.status(500).json({ error: 'internal server error' })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user._id
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate('messages')
    if (!conversation) return res.status(200).json([])

    const messages = conversation.messages

    res.status(200).json(messages)
  } catch (error) {
    console.log('Error recieving message', error.message)
    res.status(500).json({ error: 'internal server error' })
  }
}
