import http from "../http-common";

class LoginService {

    login(email, password) {
        return http.post("/users/login", { email, password });
    }

}

export default new LoginService();