import http from "../http-common";

class GroupAdminService {
    create(data) {
        console.log(data);
        return http.post(`/exams/${data.groupid}/admins/${data.user_id}`, data.user);
    }
 

    getAll(id) {
        console.log("Group id",id)
        return http.get(`/users/admins`);
    }

    getAdmins(id) {
        console.log("Group id",id)
       
        return http.get(`/exams/${id}/admins`);
    }

    get(id,userId) {
        return http.get(`/exams/${id}/admins/${userId}`);
    }

    update(id, data) {
        return http.put(`/exams/admins/${id}`, data);
    }

    delete(groupId,userId) {
        return http.delete(`/exams/${groupId}/admins/${userId}`);
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

export default new GroupAdminService();