import AddressComponent from '../../prototype/addressComponent'
import AdminModel from '../../models/admin/admin'
import chalk from 'chalk';
import createResData from '../../util/createResData'

class Admin extends AddressComponent{
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
        this.adminList = this.adminList.bind(this);
        this.getAdminInfo = this.getAdminInfo.bind(this);
    }

    login() {

    }

    logout() {

    }

    register() {

    }

    getAdminInfo() {

    }

    adminList() {

    }


}


export default new Admin();