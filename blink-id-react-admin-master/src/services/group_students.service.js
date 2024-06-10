import http from "../http-common";

class GroupStudentsService {
    create(data) {
        console.log(data);
        return http.post(`/groups/${data.groupid}/users`, data.user);
    }
 

    getAll(id) {
        console.log("Group id",id)
        return http.get(`/groups/${id}/users`);
    }

    getStudents(id) {
        console.log("Group id",id)
        return http.get(`/users/students`);
    }

    get(id,userId) {
        return http.get(`/groups/${id}/users/${userId}`);
    }

    update(id, data) {
        return http.put(`/groups/users/${id}`, data);
    }

    delete(groupId,userId) {
        return http.delete(`/groups/${groupId}/users/${userId}`);
    }

    


    deleteAll() {
        return http.delete(`/groups`);
    }

    /**
     * Get all instructors in a specific department
     * @param {number} department_id - The ID of the department
     * @returns {Promise<User[]>} An array of groups
     */
    getTeacher(deptid) {
        return http.get(`/groups/teachers/${deptid}`);
    } 

    getAllInstructor(deptid) {
        return http.get(`/groups/teachers`);
    } 
    

}

export default new GroupStudentsService();