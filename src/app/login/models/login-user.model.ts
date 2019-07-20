import { BaseModel } from '../../shared/models/base-model.abstract';

export class LoginUser extends BaseModel<LoginUser> {
    username: string;

    constructor() {
        super();
    }
}
