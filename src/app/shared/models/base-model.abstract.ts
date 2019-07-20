export abstract class BaseModel<T> {
    public build(partial: Partial<T>) {
        if (partial) {
            for (const [key, value] of Object.entries(partial)) {
                this[key] = value || typeof(value) === 'boolean' ? value : undefined;
            }
        }
    }
}
