package com.devdrip21.repositories;

import com.devdrip21.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepositories extends MongoRepository<Room,String> {
    Room findByRoomId(String roomId);
}
