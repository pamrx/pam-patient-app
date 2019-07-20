import { BaseModel } from '../../shared/models/base-model.abstract';

export class Prescription extends BaseModel<Prescription> {
    medicationId: string;
    begdate: Date;
    enddate: Date;
    dosage: string;
    frequency: number;
    frequencyUnit: string;
    doses: number;
    postitiveResponse: number;
    negativeResponse: number;

    checked: boolean;

    constructor(properties?: Partial<Prescription>) {
        super();
        this.medicationId = undefined;
        this.begdate = undefined;
        this.enddate = undefined;
        this.dosage = undefined;
        this.frequency = undefined;
        this.frequencyUnit = undefined;
        this.doses = undefined;
        this.postitiveResponse = undefined;
        this.negativeResponse = undefined;
        this.checked = undefined;
        this.build(properties);
    }

    get adherence(): number {
        return (this.postitiveResponse / (this.postitiveResponse + this.negativeResponse));
    }
}
