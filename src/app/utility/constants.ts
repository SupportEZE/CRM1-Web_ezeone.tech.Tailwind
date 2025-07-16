export enum FormFieldTypes {
  SHORT_TEXT = 'SHORT_TEXT',
  TEXT_AREA = 'TEXT_AREA',
  NUMBER = 'NUMBER',
  // PHONE_NUMBER = 'PHONE_NUMBER',
  EMAIL = 'EMAIL',
  DATE = 'DATE',
  DATE_RANGE = 'DATE_RANGE',
  UPLOAD = 'UPLOAD',
  SINGLE_SELECT = 'SINGLE_SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  TOGGLE = 'TOGGLE',
  // RANGE_SLIDER = 'RANGE_SLIDER',
  // SLIDER = 'SLIDER',
  RADIO_SELECT = 'RADIO_SELECT',
  CHECKBOX_SELECT = 'CHECKBOX_SELECT',
  TIME = 'TIME',
  CHIPS = 'CHIPS',
  EDITOR = 'EDITOR',
  // IMAGE = 'IMAGE'
}

export const PRICE_TYPE = {
  1 : 'Mrp',
  2 : 'Net Price',
  3 : 'Zone Wise Mrp',
  4 : 'Zone Wise Net Price',
}

export const FormFieldTypeOptions = [
  {
    label: 'Single Select',
    value: FormFieldTypes.SINGLE_SELECT
  },
  {
    label: 'Multi Select',
    value: FormFieldTypes.MULTI_SELECT
  },
  {
    label: 'Short Text',
    value: FormFieldTypes.SHORT_TEXT
  },
  {
    label: 'Text Area',
    value: FormFieldTypes.TEXT_AREA
  },
  {
    label: 'Number',
    value: FormFieldTypes.NUMBER
  },
  // {
  //   label: 'Phone Number',
  //   value: FormFieldTypes.PHONE_NUMBER
  // },
  {
    label: 'Date',
    value: FormFieldTypes.DATE
  },
  {
    label: 'Date Range',
    value: FormFieldTypes.DATE_RANGE
  },
  {
    label: 'Email',
    value: FormFieldTypes.EMAIL
  },
  {
    label: 'Upload',
    value: FormFieldTypes.UPLOAD
  },
  {
    label: 'Toggle',
    value: FormFieldTypes.TOGGLE
  },
  // {
  //   label: 'Slider',
  //   value: FormFieldTypes.SLIDER
  // },
  // {
  //   label: 'Range Slider',
  //   value: FormFieldTypes.RANGE_SLIDER
  // },
  {
    label: 'Radio Select',
    value: FormFieldTypes.RADIO_SELECT
  },
  {
    label: 'Checkbox Select',
    value: FormFieldTypes.CHECKBOX_SELECT
  },
  {
    label: 'Time',
    value: FormFieldTypes.TIME
  },
  {
    label: 'Editor',
    value: FormFieldTypes.EDITOR
  }
];

export enum docTypes {
  doc = '.doc',
  docx = '.docx',
  pdf = '.pdf',
  xls = '.xls',
  xlsx = '.xlsx',
  csv = '.csv',
  txt = '.txt',
  gsheet = '.gsheet',
}

export const LOGIN_TYPES = {
  SUPER_ADMIN: 1,
  ORGANIZATION_ADMIN: 2,
  SYSTEM_USER: 3,
  FIELD_USER: 4,
  PRIMARY: 5,
  SUB_PRIMARY: 6,
  SECONDARY: 7,
  END_CONSUMER: 8,
  WHAREHOUSE: 9,
  INFLUENCER: 10,
  SERVICE_VENDOR: 11,
  SERVICE_FIELD_USER: 12,
  SALES_VENDOR: 13,
};

export const CURRENCY_SYMBOLS = {
  RUPEE: '₹',
  DOLLAR: '$',
  INR: 'INR'
};

export const API_TYPE = {
  AUTH: 'authUrl',
};

export const EDIT_STATUS_PEN = [
  'Pending' 
]

export const EDIT_STATUS_APP = [
  'Approve', 'Approved' 
]

export const EDIT_STATUS_PEN_APP = [
  'Pending', 'Approve', 'Approved' 
]

export const EDIT_STATUS_PEN_REJ = [
  'Pending' , 'Reject', 'Rejected' 
];

export const AUTH_KEYS = {
  ORG: 'auth_org',
  TOKEN: 'auth_token',
  USER: 'auth_user',
  MODULE: 'module',
};
