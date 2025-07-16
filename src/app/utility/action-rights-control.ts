import { LOGIN_TYPES } from "./constants";

export type AccessRights = {
    addRight?: boolean;
    approveRight?: boolean;
    deleteRight?: boolean;
    exportRight?: boolean;
    importRight?: boolean;
    modifyRight?: boolean;
    viewRight?: boolean;
};

export const MODULE_ACTION_ACCESS = {
    [LOGIN_TYPES.ORGANIZATION_ADMIN]: {
        'SFA_Expense': {
            addRight: true,
            approveRight: true,
            deleteRight: false,
            exportRight: true,
            importRight: true,
            modifyRight: true,
            viewRight: true,
        },
        'SFA_Stock_Stock Audit': {
            addRight: false,
            approveRight: true,
            deleteRight: true,
            exportRight: true,
            importRight: true,
            modifyRight: true,
            viewRight: true,
        },
        'SFA_Leave': {
            addRight: false,
            approveRight: true,
            deleteRight: true,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        'SFA_Payment Collection': {
            addRight: true,
            approveRight: true,
            deleteRight: true,
            exportRight: true,
            importRight: true,
            modifyRight: true,
            viewRight: true,
        },
        'WCMS_Spare Part': {
            addRight: true,
            approveRight: true,
            deleteRight: true,
            exportRight: true,
            importRight: true,
            modifyRight: true,
            viewRight: true,
        },
        'SFA_Event Plan': {
            addRight: false,
            approveRight: true,
            deleteRight: true,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        
    },
    [LOGIN_TYPES.FIELD_USER]: {
        'SFA_Attendance': {
            addRight: false,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: false,
        },
        'Customers': {
            addRight: false,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        'SFA_Enquiry': {
            addRight: false,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        'SFA_Order_Primary': {
            addRight: false,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        'SFA_Expense': {
            addRight: true,
            approveRight: false,
            deleteRight: true,
            exportRight: true,
            importRight: true,
            modifyRight: true,
            viewRight: true,
        },
        'SFA_Stock_Stock Audit': {
            addRight: true,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        'SFA_Leave': {
            addRight: false,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        'SFA_Payment Collection': {
            addRight: false,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        'WCMS_Spare Part': {
            addRight: true,
            approveRight: true,
            deleteRight: true,
            exportRight: true,
            importRight: true,
            modifyRight: true,
            viewRight: true,
        },
        'Ticket': {
            addRight: true,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
        'SFA_Event Plan': {
            addRight: true,
            approveRight: false,
            deleteRight: false,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: true,
        },
    },
    [LOGIN_TYPES.PRIMARY]: {
        'Customers': {
            addRight: false,
            approveRight: false,
            deleteRight: true,
            exportRight: false,
            importRight: false,
            modifyRight: false,
            viewRight: false,
        },
    },
};


// ri-edit-line
// ri-delete-bin-line
// ri-apps-2-add-line

// public moduleService: ModuleService
// accessRight:any = {};
// const accessRight = this.moduleService.getAccessMap('SFA', 'Attendance');
// if (accessRight) {
//     this.accessRight = accessRight;
// }
// *ngIf="accessRight?.modifyRight"
// *ngIf="accessRight?.addRight"
// *ngIf="accessRight?.deleteRight"