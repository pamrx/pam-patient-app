import { BaseModel } from '../../shared/models/base-model.abstract';
import { JsonProperty } from 'json-typescript-mapper';
import { PrescriptionInterval } from './interval.enum';

export class Prescription extends BaseModel<Prescription> {
    @JsonProperty('id')
    id: string;
    @JsonProperty('patient_id')
    patientId: string;
    @JsonProperty('start_date')
    startDate: string;
    @JsonProperty('drug')
    drug: string;
    @JsonProperty('form')
    form: string;
    @JsonProperty('dosage')
    dosage: string;
    @JsonProperty('quantity')
    quantity: string;
    @JsonProperty('size')
    size: string;
    @JsonProperty('unit')
    unit: string;
    @JsonProperty('route')
    route: string;
    @JsonProperty('interval')
    interval: number;
    @JsonProperty('refills')
    refills: string;
    @JsonProperty('per_refill')
    perRefill: string;

    checked: boolean;

    constructor(properties?: Partial<Prescription>) {
        super();
        this.id = undefined;
        this.patientId = undefined;
        this.startDate = undefined;
        this.drug = undefined;
        this.form = undefined;
        this.dosage = undefined;
        this.quantity = undefined;
        this.size = undefined;
        this.unit = undefined;
        this.route = undefined;
        this.interval = undefined;
        this.refills = undefined;
        this.checked = undefined;
        this.build(properties);
    }

    get adherence(): number {
        return 0.67;
        // return (this.postitiveResponse / (this.postitiveResponse + this.negativeResponse));
    }

    get intervalDisplay(): string {
        switch (this.interval) {
            case PrescriptionInterval.AS_NEEDED:
                return 'As Needed';
            case PrescriptionInterval.DAILY:
                return 'Daily';
            case PrescriptionInterval.TWICE_DAILY:
                return 'Twice Daily';
            default:
                return null;
        }
    }

    get startDateDisplay(): string {
        const dateArray = this.startDate.split('-');
        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    }
}
