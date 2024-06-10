import http from "../http-common";

class examservice {
    create(data) {
        return http.post("/exams", data);
    }
 

    getAll() {
        return http.get("/exams");
    }

    get(id) {
        return http.get(`/exams/${id}`);
    }

    update(id, data) {
        return http.put(`/exams/${id}`, data);
    }

    delete(id) {
        return http.delete(`/exams/${id}`);
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

export default new examservice();