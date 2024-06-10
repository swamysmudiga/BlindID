import http from "../http-common";

class RoleService {

    getAll() {
        return http.get("/roles");
    }

}

export default new RoleService();