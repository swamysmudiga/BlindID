import http from "../http-common";

class GroupAdminService {
    create(data) {
        console.log(data);
        return http.post(`/groups/${data.groupid}/admins`, data.user);
    }
 

    getAll(id) {
        console.log("Group id",id)
        return http.get(`/users/admins`);
    }

    getAdmins(id) {
        console.log("Group id",id)
       
        return http.get(`/groups/${id}/admins`);
    }

    get(id,userId) {
        return http.get(`/groups/${id}/admins/${userId}`);
    }

    update(id, data) {
        return http.put(`/groups/admins/${id}`, data);
    }

    delete(groupId,userId) {
        return http.delete(`/groups/${groupId}/admins/${userId}`);
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

export default new GroupAdminService();