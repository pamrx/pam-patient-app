import { BaseModel } from '../../shared/models/base-model.abstract';
import { JsonProperty } from 'json-typescript-mapper';
import { Prescription } from './prescription.model';

export class Patient extends BaseModel<Patient> {
    pid: string;
    title: string;
    fname: string;
    mname: string;
    lname: string;
    street: string;
    city: string;
    dob: Date;
    sex: string;
    race: string;
    ethnicity: string;
    prescriptions: Prescription[];
    notificationToken: string;

    @JsonProperty('adherence')
    adherence: number;

    @JsonProperty('postal_code')
    postalCode: string;

    @JsonProperty('country_code')
    countryCode: string;

    @JsonProperty('phone_contact')
    phoneContact: string;

    constructor(properties?: Partial<Patient>) {
        super();
        this.pid = undefined;
        this.title = undefined;
        this.fname = undefined;
        this.mname = undefined;
        this.lname = undefined;
        this.street = undefined;
        this.city = undefined;
        this.dob = undefined;
        this.sex = undefined;
        this.race = undefined;
        this.ethnicity = undefined;
        this.prescriptions = [];
        this.notificationToken = undefined;
        this.postalCode = undefined;
        this.countryCode = undefined;
        this.phoneContact = undefined;
        this.adherence = undefined;
        this.build(properties);
    }

    get displayAdherence(): number {
        if (!this.adherence) {
            return null;
        }
        return this.adherence > 100 ? 100 : this.adherence;
    }
}
