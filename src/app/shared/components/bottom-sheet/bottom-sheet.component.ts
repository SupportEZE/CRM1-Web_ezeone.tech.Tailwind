import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { SpkFlatpickrComponent } from '../../../../@spk/spk-flatpickr/spk-flatpickr.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api/api.service';
import { ToastrServices } from '../../services/toastr.service ';
import { Router } from '@angular/router';
import { FormValidationService } from '../../../utility/form-validation';
import { CommonApiService } from '../../services/common-api.service';
import { SpkNgSelectComponent } from '../../../../@spk/spk-ng-select/spk-ng-select.component';
import { LOGIN_TYPES } from '../../../utility/constants';
import { ComanFuncationService } from '../../services/comanFuncation.service';

@Component({
    selector: 'app-bottom-sheet',
    imports: [SharedModule, CommonModule, FormsModule, ModalHeaderComponent, MaterialModuleModule, ReactiveFormsModule, SpkNgSelectComponent, SpkFlatpickrComponent],
    templateUrl: './bottom-sheet.component.html',
    styleUrl: './bottom-sheet.component.scss'
})
export class BottomSheetComponent {
    today = new Date();
    filterForm!: FormGroup;
    @Output() valueChange = new EventEmitter<any>();
    
    
    constructor(private commonFunction :ComanFuncationService,private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, public CommonApiService: CommonApiService, public api: ApiService, private toastr: ToastrServices, private router: Router, private formValidation: FormValidationService, private fb: FormBuilder) {
        this.CommonApiService.getUserData([LOGIN_TYPES.FIELD_USER]);
    }
    
    ngOnInit() {
        this.filterForm = this.fb.group({
            user_ids: ['',],
            user_array: ['',],
            start_date: ['',],
            end_date: ['',],
        });
    }
    
    onDateChange() {
        this.filterForm.get('end_date')?.reset();
    }
    
    private lastSearchTerm: string = '';
    onSearch(search: string, type:any) {
        const trimmedSearch = search?.trim() || '';
        if (trimmedSearch === this.lastSearchTerm) {
            return;
        }
        this.lastSearchTerm = trimmedSearch;
        if(type === 'user'){
            this.CommonApiService.getUserData([LOGIN_TYPES.FIELD_USER], search);
        }
        
    }
    onSingleSelectChange(value: any) {
        this.valueChange.emit(value)
    }
    findName(event: any, type: string) {
        const selectedIds = event;
        if (Array.isArray(selectedIds) && selectedIds.length > 0) {
            if (type === 'user') {
                const filteredUsers = this.CommonApiService.userData
                .filter((row: any) => selectedIds.includes(row.value));
                this.filterForm.patchValue({ user_array: filteredUsers });
                return filteredUsers;
            }
        }
        return [];
    }
    
    applyFilter() {
        const returnData = this.filterForm.value;
        let data = this.commonFunction.removeBlankKeys(returnData);
        const hasAnyValue = Object.keys(data).length > 0;
        this.bottomSheetRef.dismiss({'data':data, 'dismiss': hasAnyValue});
    }
}
