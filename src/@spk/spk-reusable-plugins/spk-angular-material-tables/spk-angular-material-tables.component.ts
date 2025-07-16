import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElements, ELEMENT_DATA2, PeriodicElement2, ELEMENT_DATA3, PeriodicElement3, ELEMENT_DATA4, PeriodicElement4, ELEMENT_DATA5, PeriodicElement5, ELEMENT_DATA6, PeriodicElement6, ELEMENT_DATA1 } from '../../../app/components/tables/angular-material/data';
import { MaterialModuleModule } from '../../../app/material-module/material-module.module';
interface Element {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'spk-angular-material-tables',
  standalone: true,
  imports: [MaterialModuleModule],
  templateUrl: './spk-angular-material-tables.component.html',
  styleUrl: './spk-angular-material-tables.component.scss'
})
export class SpkAngularMaterialTablesComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource!: MatTableDataSource<any>; 
  @Input() showPaginator: boolean = false;
  @Input() showFilter: boolean = false;
  @Input() basicTable: boolean = false;
  @Input() wideTable: boolean = false;
  @Input() matsatheader: any = false;

  columns: any = ['position', 'name', 'weight', 'symbol','email','date','category'];
  sortableColumns: string[] = ['position', 'name'];
  dataSource1 = new MatTableDataSource<PeriodicElements>(ELEMENT_DATA2);
  //Sorting table
  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA3);
  //table slide
  displayedColumns3: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource3 = new MatTableDataSource<PeriodicElement3>(ELEMENT_DATA4);
  //table fixed header
displayedColumns5: string[] = [
  'position',
  'name',
  'weight',
  'symbol',
  'cost',
];
dataSource5 = new MatTableDataSource<PeriodicElement4>(ELEMENT_DATA5);
//*Wide table/
displayedColumns4: string[] = [
  'position',
  'name',
  'weight',
  'symbol',
  'email',
  'date',
  'category',
];
dataSource4 = new MatTableDataSource<PeriodicElement5>(ELEMENT_DATA6);
//Hidden table
displayedColumns6: string[] = [
  'position',
  'name',
  'weight',
  'symbol',
  'email',
  'date',
  'category',
];
dataSource6= new MatTableDataSource<PeriodicElement6>(ELEMENT_DATA1);


//paginators

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild('paginator1') paginator1!: MatPaginator;
@ViewChild('paginator2') paginator2!: MatPaginator;
@ViewChild('paginator3') paginator3!: MatPaginator;
@ViewChild('paginator5') paginator5!: MatPaginator;
@ViewChild('paginator4') paginator4!: MatPaginator;
@ViewChild('paginator6') paginator6!: MatPaginator;
table: any;

//Sorting
constructor() {}
@ViewChild('sort1') sort1!: MatSort;
@ViewChild('sort2') sort2!: MatSort;
@ViewChild('sort4') sort4!: MatSort;
@ViewChild('sort5') sort5!: MatSort;
@ViewChild('sort6') sort6!: MatSort;
@ViewChild('sort7') sort7!: MatSort;
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    if (this.showPaginator) {
      this.dataSource2.paginator = this.paginator;
    }
    this.dataSource2.sort = this.sort;
    this.dataSource = this.getConfiguration(); 
  }
  filterValue: string = '';
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
  
    // search Table
    this.dataSource1.paginator = this.paginator1;
  
    // sorting Table
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort1;
    //table slide
    this.dataSource3.paginator = this.paginator3;
    this.dataSource3.sort = this.sort2;
    //table Fixed header
    this.dataSource5.paginator = this.paginator5;
    this.dataSource5.sort = this.sort4;

    //Wide table/
    this.dataSource4.paginator = this.paginator4;
    this.dataSource4.sort = this.sort5;
    //slide table/ 
    this.dataSource6.paginator = this.paginator6;
    this.dataSource6.sort = this.sort5;
  
  }
  getConfiguration(): MatTableDataSource<any> { // Specify the correct type for your data
    if (this.showPaginator) {
      return this.dataSource2;  // Returns dataSource2 if pagination is enabled
    } 
  
    // if (this.showFilter) {
    //   return this.dataSource2; // Returns dataSource2 for filtering
    // }
    if (this.wideTable) {
      this.displayedColumns2 = [
        'position',
        'name',
        'weight',
        'symbol',
        'cost',
        'category',
        'date',
        'email',
      ];
    } else {
      this.displayedColumns2 = ['position', 'name', 'weight', 'symbol'];
    }
  
    return this.dataSource; // Fallback to the default data source
  }
}
