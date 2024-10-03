import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormField } from '../../model/form-field.model';

@Injectable({ providedIn: 'root' })

export class DynamicFormService {
  private jsonData = [
    {
      "id": "name",
      "type": "text",
      "label": "Name",
      "required": true
    },
    {
      "id": "age",
      "type": "number",
      "label": "Age",
      "required": true
    },  
    {
      "id": "gender",
      "type": "select",
      "label": "Gender",
      "options": [
        "Male",
        "Female",
        "Other"
      ],
      "required": true
    },
    {
      "id": "subscribe",
      "type": "checkbox",
      "label": "Subscribe to newsletter"
    },
    {
      "id": "comments",
      "type": "text",
      "label": "Comments",
      "conditionalFields": {
        "subscribe": true
      }
    }
  ]

  constructor() { }

  getFormFields(): Observable<FormField[]> {
    return of(this.jsonData)
  }
}
