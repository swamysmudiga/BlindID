import http from "../http-common";

class UserService {
    async create(data) {
        return http.post("/users", data);
    }

    createStudent(data) {
        return http.post("/users/student", data);
    }

    login(data) {
        return http.post("/users/login", data);
    }

    getAll() {
        return http.get("/users");
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);    
    }

    getAllStudents() {
        return http.get("/users/students");
    }
    getAllTeachers() {
        return http.get("/users/teachers");
    }
    getAllAdmins() {
        return http.get("/users/admins");
    }
    getAllStaff(){
        return http.get("/users/staff");
    }

    deleteAll() {
        return http.delete(`/users`);
    }

    /**
     * Get all instructors in a specific department
     * @param {number} department_id - The ID of the department
     * @returns {Promise<User[]>} An array of users
     */
    getTeacher(deptid) {
        return http.get(`/users/teachers/${deptid}`);
    } 

    getAllInstructor(deptid) {
        return http.get(`/users/teachers`);
    } 
    async addPictureToUser(userid,pic) {
       const  payload = {
            'id':0,
            'url': pic 
        }
        console.log("userid: " + userid);
        console.log("pic: " + pic);
        return http.post(`/users/${userid}/images`, payload);
    }
    

}

export default new UserService();