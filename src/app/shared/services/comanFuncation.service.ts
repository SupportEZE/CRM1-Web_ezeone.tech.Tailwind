import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { SweetAlertService } from '../../core/services/alert/sweet-alert.service';
import { LogService } from '../../core/services/log/log.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LogModalComponent } from '../../components/apps/log-modal/log-modal.component';
import { UploadFileModalComponent } from '../components/upload-file-modal/upload-file-modal.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ImageViewModalComponent } from '../components/image-view-modal/image-view-modalcomponent';
import { HighlightService } from './highlight.service';
import { SnackbarService } from '../../core/services/snackbar/snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class ComanFuncationService {
    originalData:any={}
    constructor(private dialog: MatDialog, private api: ApiService, private toastr: ToastrService,private snackbar: SnackbarService,private alert: SweetAlertService, private logService: LogService,
        private highlightService: HighlightService,public router: Router) {}
        
        success(msg:string, btntext:any, position:any){
            this.toastr.success(msg, btntext, {
                timeOut: 3000,
                positionClass: position,
            });
        }
        
        // *****Status Change Function Start*****//   
        statusChange(
            newState: any,
            _id: string,
            status: string,
            submodule: any,
            statusType: string,
            api: string,
            newtext?: any,
            text?: string,
        ): Observable<boolean> {
            return new Observable<boolean>((observer) => {
                this.alert.confirm("Are you sure?", "You want to change status", "Yes it!").then(result => {
                    if (result.isConfirmed) {
                        let updatedData: any = {
                            status: statusType === 'toggle' ? (newState ? 'Active' : 'Inactive') : newState
                        };
                        this.originalData.status = status;
                        const isEditMode = true;
                        if (isEditMode) {
                            const noChanges = this.logService.logActivityOnUpdate(
                                isEditMode,
                                this.originalData,
                                updatedData,
                                submodule.sub_module_id ? submodule.sub_module_id : submodule.module_id,
                                submodule.title ? submodule.title : submodule.module_name,
                                'update',
                                _id || null,
                                () => {},
                                submodule.module_type
                            );
                            if (noChanges) {
                                this.api.disabled = false;
                                this.toastr.warning('No changes detected', '', { positionClass: 'toast-top-right' });
                                return;
                            }
                        }
                        // Call API
                        this.api.patch({ _id: _id, status: statusType === 'toggle' ? (newState ? 'Active' : 'Inactive'): newState , reason : text ? text :  newtext }, api).pipe(
                            map((response: any) => {
                                if (response['statusCode'] === 200) {
                                    this.toastr.success(response['message'], '', { positionClass: 'toast-top-right' });
                                    observer.next(true);
                                    observer.complete();
                                } else {
                                    observer.next(false);
                                    observer.complete();
                                }
                            }),
                            catchError((error: any) => {
                                observer.next(false);
                                observer.complete();
                                return of(false);
                            })
                        ).subscribe();
                    } else {
                        observer.next(false);
                        observer.complete();
                    }
                });
            });
        }      
        // *****Status Change Funcation End*****//
        
        // ***** List Logs Modal Start *****//
        listLogsModal(id: any, row_id?:string, module_type?:string) {
            const dialogRef = this.dialog.open(LogModalComponent, {
                width: '350px',
                panelClass: 'mat-right-modal',
                position: { right: '0px' },
                data: {
                    'moduleId': id,
                    'rowId': row_id,
                    'module_type': module_type
                }
            });
            return dialogRef.afterClosed();
        }
        // ***** List Logs Modal End *****//
        
        // ***** Import Modal Start *****//
        importModal(moduleId:any, formId:any) {
            const dialogRef = this.dialog.open(UploadFileModalComponent, {
                width: '600px',
                data: {
                    'moduleId':moduleId,                
                    'formId':formId,                
                }
            });
            return dialogRef.afterClosed();
        }
        // ***** Import Modal Start *****//
        
        // ***** Delete Funcation Start ***** //
        delete(id: string, moduleData:any, label:any, endpoint: string, action?:any, detaiId?:any): Observable<any> {
            return new Observable(observer => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Once deleted, you will not be able to recover this item!",
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.api.patch({ _id: id, is_delete:1 }, endpoint).subscribe(
                            res => {
                                if (res.statusCode === 200) {
                                    Swal.fire('Deleted!', res['message'], 'success');
                                    if(action === 'single_action'){
                                        this.logService.logActivityOnDelete(moduleData.sub_module_id ? moduleData.sub_module_id : moduleData.module_id, moduleData.sub_module_name ? moduleData.sub_module_name : moduleData.module_name, 'delete', detaiId, label, moduleData.module_type)
                                    }
                                    else{
                                        this.logService.directMainLog(moduleData.sub_module_id ? moduleData.sub_module_id : moduleData.module_id, moduleData.form_id, moduleData.sub_module_name ? moduleData.sub_module_name : moduleData.module_name,label,'deleted', moduleData.module_type)
                                        Swal.fire('Deleted!', res.message, 'success');
                                    }
                                    observer.next(true);
                                    observer.complete();
                                } 
                            },
                            error => {
                                Swal.fire('Error!', 'Something went wrong.', 'error');
                                observer.error(error);
                            }
                        );
                    } else {
                        observer.next({ status: 'cancelled' });
                        observer.complete();
                    }
                });
            });
        }
        // ***** Delete Funcation End ***** //
        
        // ***** Social icon Funcation End ***** //
        getSocialStyles(title: string) {
            const styles: any = {
                "Youtube": { bg: "danger", icon: "youtube", textcolor: "" },
                "X-Twitter": { bg: "dark", icon: "twitter-x", textcolor: "dark" },
                "Facebook": { bg: "info", icon: "facebook", textcolor: "" },
                "Instagram": { bg: "secondary", icon: "instagram", textcolor: "" },
                "LinkedIn": { bg: "secondary", icon: "linkedin-box", textcolor: "" },
                "Google Review": { bg: "secondary", icon: "instagram", textcolor: "" }
            };
            return styles[title] || { bg: "gray", icon: "question", textcolor: "" };
        }
        // ***** Social Funcation End ***** //
        
        removeBlankKeys(obj: any): any {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    
                    // Check for empty string, null, undefined, or blank array
                    if (value === "" || value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
                        delete obj[key];
                    }
                }
            }
            return obj;
        }
        
        // Image Zoom Funcation Start
        zoom(id:string, apiPath:any) {
            const dialogRef = this.dialog.open(ImageViewModalComponent, {
                panelClass:'view-image',
                data: {
                    '_id':id,
                    "apiPath": apiPath
                }
            });
            dialogRef.afterClosed().subscribe(result => {
            });
        }
        // Image Zoom Funcation End
        
        // Set Highlight Funcation Start
        setHighLight(pageKey:string,rowId: string, activeTab: string, filter: any, pageIndex:any) {
            this.highlightService.setHighlight(pageKey, {
                rowId: rowId,
                tab: activeTab,
                filters: filter,
                pageIndex: pageIndex ? pageIndex :  1,
            });
        }
        // Set Highlight Funcation End
        
        // Copy Funcation Start
        copy(text: string) {
            navigator.clipboard.writeText(text).then(() => {
                this.snackbar.defaultSnackbar();
            }).catch(err => {
                console.error('Error copying text: ', err);
            });
        }
        // Copy Funcation End
    }
    