import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormFieldTypes } from '../../../utility/constants';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FilePondOptions } from 'filepond';
import { Editor, Toolbar, Validators as EditorValdator } from 'ngx-editor';
import jsonDoc from '../../data/editor'
import { ToastrServices } from '../../services/toastr.service ';
import { DatePipe } from '@angular/common';
import * as FilePond from 'filepond';import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

FilePond.registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateSize
  // FilePondPluginImagePreview
);
export interface FormFieldConfig {
  type: FormFieldTypes | string;
  label: string;
  placeholder?: string;
  hint?: string;
  control: FormControl;
  options?: any[];
  min: number;
  max: number;
  step?: number;
  showTicks?: boolean;
  thumbLabel?: boolean;
  disabled?: boolean;
  required?: boolean;
  formGroupName?: string;
  formGroupSize?: string;
  name:any
}

@Component({
  selector: 'app-form-field',
  standalone: false,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  providers: [DatePipe]
})
export class FormFieldComponent implements OnInit {
  @Input() field: any;
  @Input() form!: FormGroup;
  @Output() valueChange = new EventEmitter<any>();
  @Output() searchChanged = new EventEmitter<any>();
  @Input() control!: FormControl;
  @Input() formControlName!: string; // Get form control name from parent
  
  image:any =[];
  binary:any =[];
  
  
  readonly fieldTypes = FormFieldTypes;
  checkboxGroup: FormGroup = new FormGroup({});
  
  
  pondFiles: File[] = [];
  
  
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  
  constructor(public toastr:ToastrServices, private formGroupDirective: FormGroupDirective, private cdr:ChangeDetectorRef, private datePipe: DatePipe){}
  
  ngOnInit() {
    if (this.formGroupDirective.form) {
      this.control = this.formGroupDirective.form.get(this.formControlName) as FormControl;
    }
    this.field.control = new FormControl(this.field.value || null);
    console.log(this.field.control, 'field');
    
    if (!this.field) {
      return;
    }
    
    // if (this.field.type === 'EMAIL') {
    //   this.field.control = new FormControl('', [
    //     Validators.required,
    //     Validators.email
    //   ]);
    // }
    
    // if (this.field.type == 'EDITOR') {
    //   this.editor = new Editor();
    //   this.form = new FormGroup({
    //     editorContent: new FormControl(
    //       { value: jsonDoc, disabled: false },
    //       EditorValdator.required()
    //     ),
    //   });
    // }
    
    // if (this.field.type === 'PHONE_NUMBER') {
    //   this.field.control = new FormControl('', [
    //     Validators.required,
    //     Validators.pattern(/^\+?[1-9]\d{1,14}$/) 
    //   ]);
    // } 
    
    // if (this.field.type === FormFieldTypes.CHECKBOX_SELECT && this.field.options) {
    //   this.field.options.forEach((option : any) => {
    //     this.checkboxGroup.addControl(option.value.toString(), new FormControl(false));
    //   });
    // }
    // if(this.field.type === FormFieldTypes.SLIDER) {
    //   this.field.control = new FormControl([this.field.min || 0, this.field.max/2 || 100/2]);
    // }
    
    // if (this.field.type === FormFieldTypes.RANGE_SLIDER) {
    //   this.field.control = new FormControl([this.field.max/4 || 100*3/4, this.field.max*3/4 || 100*3/4]);
    // }
  }
  
  onSingleSelectChange(value: any) {
    this.valueChange.emit(value);

  }
  
  onMultiSelectChange(value: any) {
    this.valueChange.emit(value)
  }
  
  getInputType(): string {
    switch (this.field.type) {
      case FormFieldTypes.NUMBER:
      // case FormFieldTypes.PHONE_NUMBER:
      return 'number';
      case FormFieldTypes.EMAIL:
      return 'email';
      default:
      return 'text';
    }
  }
  
  onValueChange(event: any) {
    if (!this.field || !this.field.control) {
      return;
    }
    this.field.control.setValue(event);
    this.valueChange.emit(event);
    this.valueChange.emit(event.target.value);
  }


  onsearchChange(event: any) {
    this.searchChanged.emit(event);

    // if (!this.field || !this.field.control) {
    //   return;
    // }
    // this.field.control.setValue(event);
    // this.valueChange.emit(event);
    // this.valueChange.emit(event.target.value);
  }
  
 
  onToggleSwitch(event:any){
    this.valueChange.emit(this.field.control.value);
  }
  
  emitValueChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }
  
  
  onDateSelected(date: any, name:any) {
  const formControl = this.form.get(name);
    if (formControl) {
        formControl.setValue(date);
        formControl.markAsTouched();
        formControl.markAsDirty();
    }
    this.valueChange.emit(date);
  }
  
  onDateRangeSelected(range: any) {
    if (range.to !== undefined && range.from !== undefined) {
      this.valueChange.emit(range);
    }
  }
  
  onFileRemove(event: any, type:any) {
    const file = event.file.file;
    Object.assign(file, { image_type: type })
    const index = this.pondFiles.findIndex(f => f.name === file.name && f.size === file.size);
    if (index > -1) {
      this.pondFiles.splice(index, 1);
    }
    this.field.control.setValue(this.pondFiles);
    this.valueChange.emit(this.pondFiles);
  }
  onFileProcessed(event: any, type:any) {
    const file = event.file.file;
    Object.assign(file, { image_type: type })
    this.pondFiles = [...(this.pondFiles || []), file];
    this.field.control.setValue(this.pondFiles);
    this.valueChange.emit(this.pondFiles);
  }

  pondOptions = this.getPondOptions('image');
  getPondOptions(type: 'image'): any {
    const commonOptions = {
      allowMultiple: true,
      allowFileTypeValidation: true,
      labelIdle: "Click or drag files here to upload...",
      maxFiles: 5,
      server: {
        process: (_fieldName: any, file: any, _metadata: any, load: (arg0: string) => void) => {
          setTimeout(() => {
            load(Date.now().toString());
          }, 1000);
        },
        revert: (_uniqueFileId: any, load: () => void) => {
          load();
        }
      }
    };

    if (type === 'image') {
      return {
        ...commonOptions,
        acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
        maxFileSize: '2MB',
        allowImageValidateSize: true,
        // imageValidateSizeMinWidth: 300,
        // imageValidateSizeMinHeight: 300,
        // imageValidateSizeMaxWidth: 300,
        // imageValidateSizeMaxHeight: 300,
        labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
        fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
        labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
        labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
      };
    }
  }

  onEvent(event: any){
    this.valueChange.emit(event.target.value);
  }
  
  
  onCheckboxChange(event: any) {
    if (!this.field || !this.field.control) {
      return;
    }
    
    this.form.controls[this.field.name].setValue(event.target.checked); // Update form value
    this.valueChange.emit(event.target.checked);
  }

  onRadioSelect(event: any){
    console.log(event.target.value, 'event.target.value');
    
    this.form.controls[this.field.name].setValue(event.target.value); // Update form value
    this.valueChange.emit(event.target.value);
  }
  
  debugDateChange(event: any, controlName: string) {
    if (this.form?.get(controlName)) {
      this.form.get(controlName)?.setValue(event);
      this.form.get(controlName)?.markAsTouched();
      this.form.get(controlName)?.updateValueAndValidity();
    } else {
    }
  }
  
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.field.control.setValue(file);
    this.onValueChange(file);
  }
  
  // Emit value when slider changes
  onSliderChange(event: any) {
    this.valueChange.emit(event);
  }
  
  
  
  onUploadChange(event: Event, fieldValue: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.processImageFile(file).then(({ dataURL, cleanedFile }) => {
      if (cleanedFile) {
        this.image.push({'srcUrl':dataURL, 'imageName':file.name});
        this.binary.push({file});
        this.form.patchValue({ [fieldValue.name]: cleanedFile });
        this.form.get(fieldValue.name)?.updateValueAndValidity();
        // Emit value change to update the parent component
        this.valueChange.emit({ name: fieldValue.name, value: cleanedFile, images: this.image, binary: this.binary, field_name: this.field.label});
      }
    })
    // .catch(err => {
    // });
  }
  
  
  
  processImageFile(file: File, maxSizeMB: number = 2): Promise<{ dataURL: string, cleanedFile: File }> {
    return new Promise((resolve, reject) => {
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      const byte = 1000000; // 1 MB in bytes
      
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Only .png, .jpg, .jpeg files are accepted', '', 'Ok');
        return reject('Only .png, .jpg, .jpeg files are accepted')
      }
      
      if (file.size > (maxSizeMB * byte)) {
        // this.toastr.error(`Image file size is too large, maximum file size is ${maxSizeMB} MB.`, '', 'Ok')
        return  reject(`Image file size is too large, maximum file size is ${maxSizeMB} MB.`);
      }
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const dataURL = canvas.toDataURL(file.type);
          
          fetch(dataURL)
          .then(res => res.blob())
          .then(blob => {
            const cleanedFile = new File([blob], file.name, { type: file.type });
            resolve({ dataURL, cleanedFile });
          })
          .catch(err => reject(err));
        };
        
        img.onerror = () => reject('Error loading image');
      };
      
      reader.onerror = () => reject('Error reading file');
      reader.readAsDataURL(file);
    });
  }
  
}
