package com.example.blinkidspringbootapp.controllers.group;


import com.example.blinkidspringbootapp.entities.Group;
import com.example.blinkidspringbootapp.entities.user.User;
import com.example.blinkidspringbootapp.repositories.GroupRepository;
import com.example.blinkidspringbootapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllGroups() {
        return ResponseEntity.ok(groupRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable long id) {
        return ResponseEntity.ok(groupRepository.findById(id));
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<?> getUsersByGroupId(@PathVariable long id) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        return ResponseEntity.ok(group.getUsers());
    }

    @GetMapping("/{id}/admins")
    public ResponseEntity<?> getAdminsByGroupId(@PathVariable long id) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        return ResponseEntity.ok(group.getAdmins());
    }

    @PostMapping("/{id}/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable long id, @PathVariable long userId) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        group.getUsers().add(user);
        return ResponseEntity.ok(groupRepository.save(group));
    }

    @PostMapping("/{id}/admins/{adminId}")
    public ResponseEntity<?> getAdminById(@PathVariable long id, @PathVariable long adminId) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        User user = userRepository.findById(adminId).orElseThrow(() -> new RuntimeException("User not found"));
        group.getAdmins().add(user);
        return ResponseEntity.ok(groupRepository.save(group));
    }

    @PostMapping
    public ResponseEntity<?> createGroup(@RequestBody Group group) {
        Group newGroup = new Group();
        newGroup.setName(group.getName().trim());
        newGroup.setDescription(group.getDescription().trim());
        return ResponseEntity.ok(groupRepository.save(newGroup));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGroup(@PathVariable long id, @RequestBody Group group) {
        Group existingGroup = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        existingGroup.setName(group.getName());
        existingGroup.setDescription(group.getDescription());
        return ResponseEntity.ok(groupRepository.save(existingGroup));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable long id) {
        groupRepository.deleteById(id);
        return ResponseEntity.ok("Group deleted");
    }

    @PostMapping("/{id}/users")
    public ResponseEntity<?> addUserToGroup(@PathVariable long id, @RequestBody User user) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        group.getUsers().add(user);
        return ResponseEntity.ok(groupRepository.save(group));
    }

    @PostMapping("/{id}/admins")
    public ResponseEntity<?> addAdminToGroup(@PathVariable long id, @RequestBody User admin) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        group.getAdmins().add(admin);
        return ResponseEntity.ok(groupRepository.save(group));
    }

    @DeleteMapping("/{id}/users/{userId}")
    public ResponseEntity<?> removeUserFromGroup(@PathVariable long id, @PathVariable long userId) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        group.getUsers().removeIf(user -> user.getId() == userId);
        return ResponseEntity.ok(groupRepository.save(group));
    }

    @DeleteMapping("/{id}/admins/{adminId}")
    public ResponseEntity<?> removeAdminFromGroup(@PathVariable long id, @PathVariable long adminId) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
        group.getAdmins().removeIf(admin -> admin.getId() == adminId);
        return ResponseEntity.ok(groupRepository.save(group));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAllGroups() {
        groupRepository.deleteAll();
        return ResponseEntity.ok("All groups deleted");
    }

}
