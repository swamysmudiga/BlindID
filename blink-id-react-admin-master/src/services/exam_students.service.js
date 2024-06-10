import http from "../http-common";

class examstudentsService {
    create(data) {
        console.log(data);
        return http.post(`/exams/${data.groupid}/users/${data.user_id}`, data.user);
    }
 

    getAll(id) {
        console.log("Group id",id)
        return http.get(`/exams/${id}/users`);
    }

    getStudents(id) {
        console.log("Group id",id)
        return http.get(`/users/students`);
    }

    get(id,userId) {
        return http.get(`/exams/${id}/users/${userId}`);
    }

    update(id, data) {
        return http.put(`/exams/users/${id}`, data);
    }

    delete(groupId,userId) {
        return http.delete(`/exams/${groupId}/users/${userId}`);
    }

    


    deleteAll() {
        return http.delete(`/exams`);
    }

    /**
     * Get all instructors in a specific department
     * @param {number} department_id - The ID of the department
     * @returns {Promise<User[]>} An array of exams
     */
    getTeacher(deptid) {
        return http.get(`/exams/teachers/${deptid}`);
    } 

    getAllInstructor(deptid) {
        return http.get(`/exams/teachers`);
    } 
    

}

export default new examstudentsService();