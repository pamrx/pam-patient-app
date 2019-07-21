import { BaseModel } from '../../shared/models/base-model.abstract';
import { JsonProperty } from 'json-typescript-mapper';
import { PrescriptionInterval } from './interval.enum';
import { Units } from './units.enum';

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
    @JsonProperty('filled_date')
    filledDate: string;
    @JsonProperty('adherence')
    adherence: number;
    @JsonProperty('timesTakenToday')
    timesTakenToday: number;

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
        this.perRefill = undefined;
        this.filledDate = undefined;
        this.checked = undefined;
        this.build(properties);
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

    get unitsDisplay(): string {
        switch (this.unit) {
            case Units.MCG:
                return 'Micrograms (&mu;g)';
            case Units.MG:
                return 'Milligrams (mg)';
            case Units.G:
                return 'Grams (g)';
            default:
                return null;
        }
    }

    get displayCheckbox(): boolean {
        switch (this.interval) {
            case PrescriptionInterval.AS_NEEDED:
                return this.timesTakenToday === 0;
            case PrescriptionInterval.DAILY:
                return this.timesTakenToday === 0;
            case PrescriptionInterval.TWICE_DAILY:
                return this.timesTakenToday <= 1;
            default:
                return null;
        }
    }

    get textQuestion(): string {
        switch (this.interval) {
            case PrescriptionInterval.AS_NEEDED:
                return 'Did you decide you needed to take this today?';
            case PrescriptionInterval.DAILY:
                return 'Have you taken this today?';
            case PrescriptionInterval.TWICE_DAILY:
                return this.timesTakenToday === 0 ? 'Have you taken your first dose today?' : this.timesTakenToday === 1 ? 'Have you taken your second dose today?' : null;;
            default:
                return null;
        }
    }

    get startDateDisplay(): string {
        const dateArray = this.startDate.split('-');
        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    }

    get filledDateDisplay(): string {
        const dateArray = this.filledDate.split('-');
        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    }
}
