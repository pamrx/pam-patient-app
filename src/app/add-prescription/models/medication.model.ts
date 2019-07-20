import { BaseModel } from '../../shared/models/base-model.abstract';

export class Medication extends BaseModel<Medication> {
    id: string;
    title: string;
    imageUrl: string;

    constructor(properties?: Partial<Medication>) {
        super();
        this.id = undefined;
        this.title = undefined;
        this.imageUrl = undefined;
        this.build(properties);
    }
}
