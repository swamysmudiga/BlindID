import http from "../http-common";

class GroupService {
    create(data) {
        return http.post("/groups", data);
    }
 

    getAll() {
        return http.get("/groups");
    }

    get(id) {
        return http.get(`/groups/${id}`);
    }

    update(id, data) {
        return http.put(`/groups/${id}`, data);
    }

    delete(id) {
        return http.delete(`/groups/${id}`);
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

export default new GroupService();