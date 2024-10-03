import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../../model/form-field.model';
import { DynamicFormService } from '../../services/dynamic-form/dynamic-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  form: FormGroup;
  fields: FormField[] = [];
  constructor(private fb: FormBuilder, private dynamicFormService: DynamicFormService) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.dynamicFormService.getFormFields().subscribe(fields => {
      this.fields = fields;
      this.buildForm();
    });
  }

  private buildForm() {
    this.fields?.forEach(field => {
      const control = this.fb.control('', field?.required ? Validators.required : null);
      this.form.addControl(field.id, control);
    });
  }

  onSubmit() {
    let formValue = this.form.getRawValue();
    if (this.form.valid) {
      alert(JSON.stringify(formValue))
    }
  }

  shouldDisplayField(field: FormField): boolean {
    if (!field?.conditionalFields) return true;

    for (const [key, value] of Object.entries(field?.conditionalFields)) {
      const controlValue = this.form?.get(key)?.value;
      if (controlValue !== value) {
        return false;
      }
    }
    return true;
  }
}
