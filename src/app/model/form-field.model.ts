export interface FormField {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    options?: string[];
    conditionalFields?: { [key: string]: any };
}
