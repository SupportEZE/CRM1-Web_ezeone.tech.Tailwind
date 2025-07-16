import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { SpkWidgetTotalBudgetCardComponent } from '../../../../../../@spk/reusable-widgets/spk-widget-total-budget-card/spk-widget-total-budget-card.component';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { DateService } from '../../../../../shared/services/date.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { TargetLogService } from '../../../../../core/services/log/target_log.service';

@Component({
    selector: 'app-target-detail',
    imports: [SharedModule, CommonModule, ShowcodeCardComponent,SpkReusableTablesComponent,SpkWidgetTotalBudgetCardComponent],
    templateUrl: './target-detail.component.html',
})
export class TargetDetailComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    submodule:any;
    skLoading:boolean = false;
    DetailId:  any;
    Detail:any = {};
    basiqDetail:any = {};
    overallSummary:any = {};
    additionalTargets:any = {};
    incomeItems:any = [];
    openIndex: number | null = null; 
    logList:any =[]

    constructor(private router: Router,public moduleService: ModuleService,public route:ActivatedRoute,public api:ApiService,public date:DateService,private targetLogService: TargetLogService){}
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Target');
        if (subModule) {
            this.submodule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            if(this.DetailId){
                this.getDetail();
            }
        });
    }
    
    formatRupee(value: number): string {
        if (value == null) return '₹0';
        return CURRENCY_SYMBOLS.RUPEE + value.toLocaleString('en-IN');
    }
    
    toggleCollapse(index: number) {
        this.openIndex = this.openIndex === index ? null : index;
    }
    
    editPage(){
        this.router.navigate(['/apps/sfa/target/target-detail/' + this.DetailId +'/edit']);
    }
    
    getDetail() {
        this.skLoading = true;
        this.api.post({_id: this.DetailId}, 'target/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.Detail = result['data'];
                this.basiqDetail = result['data']['result'];
                this.overallSummary = result['data']['overall_summary'];
                this.additionalTargets = result['data']['additional_target'];

                this.targetLogService.getLogs(this.submodule.module_id, (logs) => {
                    this.logList = logs;
                },this.DetailId ? this.DetailId : '',this.submodule.module_type);
                
                this.incomeItems = [
                    { 
                        title: 'Target Achived',
                        liClass:'border-top',
                        subtitle: 'Total Target Achived',
                        value: this.overallSummary.progress + '%',
                        iconClass: 'ti ti-hourglass text-[22px]',
                        iconBgClass: 'success',
                        valueClass: 'success' 
                    },
                    { 
                        title: 'Days Left',
                        subtitle: 'Total Days Left',
                        value: this.overallSummary.day_left,
                        iconClass: 'ti ti-clock text-[22px]',
                        iconBgClass: 'primary',
                        valueClass: 'primary' 
                    },
                    { 
                        title: 'Target Value',
                        subtitle: 'Total Target Value',
                        value: this.formatRupee(this.overallSummary.total_target),
                        iconClass: 'ti ti-trending-up text-[22px]',
                        iconBgClass: 'secondary',
                        valueClass: 'secondary' 
                    },
                    { 
                        title: 'Achievement Value',
                        subtitle: 'Total Achievement Value',
                        value: this.formatRupee(this.overallSummary.total_achieved),
                        iconClass: 'ti ti-checklist text-[22px]',
                        iconBgClass: 'info',
                        valueClass: 'info' 
                    }
                ]
            }
        });
    }
    
    getCategorySummaries(user: any) {
        return user.filter((item: any) => item.name === 'Category');
    }
    
    getProductSummaries(user: any) {
        return user.filter((item: any) => item.name === 'Product');
    }
    
    getOtherSummaries(user: any) {
        return user.filter(
            (item: any) => item.name !== 'Category' && item.name !== 'Product'
        );
    }
    
    
    summaryColumns=[
        { label: 'Category Name'},
        { label: 'Achievement'},
        { label: 'Progress'},
        { label: 'Status'},
    ]
    
    summaries=[
        {
            sno:1,
            title:'Category',
            tasks:"2,50,000",
            tasks1:"5,00,000",
            percentage:"10%",
            bg:"danger",
            status:"Not Achieved",
            progress:"10"
        },
        {
            sno:2,
            title:'Category',
            tasks:"2,50,000",
            tasks1:"5,00,000",
            percentage:"63%",
            bg:"primary",
            status:"In Progress",
            team:"+2",
            progress:"63"
        },
        {
            sno:3,
            title:'Category',
            tasks:"2,50,000",
            tasks1:"5,00,000",
            percentage:"100%",
            bg:"success",
            status:"Achieved",
            team:"+2",
            progress:"100"
        },
    ]
    
    customers = [
        { name: 'Primary Sale Target',   description: 'Additional primary sale target',       icon: 'shopping_cart',  input_show: true, input_value: '', checked: false },
        { name: 'Secondary Sale',        description: 'Target for secondary sale',            icon: 'repeat',         input_show: true, input_value: '', checked: false },
        { name: 'New Customer',          description: 'New customer create target',           icon: 'person_add',     input_show: true, input_value: '', checked: false },
        { name: 'Enquiry Close',         description: 'Enquiry close target',                 icon: 'done_all',       input_show: true, input_value: '', checked: false },
        { name: 'Site Creation',         description: 'New site creation target',             icon: 'add_location',   input_show: true, input_value: '', checked: false },
        { name: 'Site Close',            description: 'Close site target',                    icon: 'location_off',   input_show: true, input_value: '', checked: false },
        { name: 'Customer Visit',        description: 'Customer visit target',                icon: 'event_available',input_show: true, input_value: '', checked: false },
        { name: 'Event',                 description: 'Event in your area target',            icon: 'event',          input_show: true, input_value: '', checked: false },
        { name: 'Influencer Registration', description: 'New Influencer registration target', icon: 'how_to_reg',     input_show: true, input_value: '', checked: false },
        { name: 'Payment Collection',    description: 'Payment collection target',            icon: 'payments',       input_show: true, input_value: '', checked: false },
        { name: 'Category/Product',      description: 'Category/Product wise target',         icon: 'payments',       input_show: false, input_value: '', checked: true },
    ]
}
