package com.devdrip21.controller;

import com.devdrip21.entities.Message;
import com.devdrip21.entities.Room;
import com.devdrip21.payload.MessageRequest;
import com.devdrip21.repositories.RoomRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
@CrossOrigin("http://localhost:3000")
public class chatcontroller {

    @Autowired
    private RoomRepositories roomRepositories;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            @RequestBody MessageRequest request
    ){
        Room room = roomRepositories.findByRoomId(request.getRoomId());
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimestamp(LocalDateTime.now());

        if(room != null){
            room.getMessages().add(message);
            roomRepositories.save(room);
        }else {
            throw new RuntimeException("Room doesn't exists!!");
        }

        return message;
    }
}
