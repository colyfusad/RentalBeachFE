export class User {
    id: number;
    userName: string;
    password: string;  
    name: string;  
    email: string;
    phone: string;
    identifier: string;
    address: string;
    ruleId: number;

    constructor(_username: string, _password: string, 
        _name: string, _email: string, _phone: string,
        _identifier: string, _address: string, _ruleId: number) {
        this.userName = _username;
        this.password = _password;
        this.name = _name;
        this.email = _email;
        this.phone = _phone;
        this.identifier = _identifier;
        this.address = _address;
        this.ruleId = _ruleId;
    }   
}
