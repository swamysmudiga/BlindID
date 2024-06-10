import http from "../http-common";

class UserService {
    create(data) {
        return http.post("/users", data);
    }
 

    getAll() {
        return http.get("/users/students");
    }

    get(id) {
        return http.get(`/users/students/${id}`);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }
 

    /**
     * Get all instructors in a specific department
     * @param {number} department_id - The ID of the department
     * @returns {Promise<User[]>} An array of users
     */
    getInstructor(deptid) {
        return http.get(`/users/teachers/${deptid}`);
    } 

    getAllInstructor(deptid) {
        return http.get(`/users/teachers`);
    } 
    

}

export default new UserService();