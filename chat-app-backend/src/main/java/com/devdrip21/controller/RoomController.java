package com.devdrip21.controller;

import com.devdrip21.config.AppConstants;
import com.devdrip21.entities.Message;
import com.devdrip21.entities.Room;
import com.devdrip21.repositories.RoomRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(AppConstants.FRONT_END_BASE_URL)
public class RoomController {

    @Autowired
    private RoomRepositories roomRepositories;

    @PostMapping
    public ResponseEntity<?> createroom(@RequestBody String roomId){
        //room already present
        if(roomRepositories.findByRoomId(roomId)!=null){
            return ResponseEntity.badRequest().body("Room already exists");
        }

        //else create new one
        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom =  roomRepositories.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(
           @PathVariable String roomId
           ){
        Room room = roomRepositories.findByRoomId(roomId);
        if(room == null){
            return ResponseEntity.badRequest().body("Room not found!");
        }
        return ResponseEntity.ok(room);
    }

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getmessages(
            @PathVariable String roomId,
            @RequestParam(value = "page",defaultValue = "0",required = false) int page,
            @RequestParam(value="size",defaultValue = "20", required = false) int size
    ){
        Room room = roomRepositories.findByRoomId(roomId);
        if(room == null){
            return ResponseEntity.badRequest().build();
        }
        List<Message> messages = room.getMessages();
        int start = Math.max(0,messages.size()-(page+1)*size);
        int end = Math.min(messages.size(),start+size);
        List<Message> paginatedmessages = messages.subList(start, end);
        return ResponseEntity.ok(paginatedmessages);
    }

}
