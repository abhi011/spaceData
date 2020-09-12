import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  state={
    preBtn:false,
    nextBtn:false,
    nextUrl:null,
   preUrl:null,
   oneUrl:'https://api.spaceXdata.com/v3/launches?limit=100'
  }
  pokemonList:any;
  launchStatus=['True','False'];
  pokemons: any;
  pokemonsLoaded: boolean;
  
  launchYear=[];
  @ViewChild('launchStatus') launchStatusFilter:ElementRef;
  
  @Output() exportPokemons = new EventEmitter();
  filterByLaunchStatusValue: boolean;
  filterByLandStatusValue: boolean;
  filterByYear1: boolean;
  landSuccessful: any;
  filterByYearValue: any;
  // preBtn: boolean;
  constructor(private userService: UserService) { }
  
  ngOnInit(): void 
  {
    
    this.pokemonsLoaded = false;
    this.getSpace(this.state.oneUrl);


    if(this.state.preUrl==null || this.state.preUrl==undefined)
    this.state.preBtn=false;
    
  }


  filterByLaunchStatus(event){

    console.log("event "+event);


    

    console.log("launchStatusFilter "+this.launchStatusFilter.nativeElement.value);
    
    this.filterByLaunchStatusValue= event=='True'?true:false;

    this.getSpace(this.state.oneUrl)



  }
  filterByLandStatus(event){

    this.filterByLandStatusValue=event=='True'?true:false;
    this.getSpace(this.state.oneUrl)
  }

  filterByYear(event){
    this.filterByYear1=true;
    // filterYeayValue


this.filterByYearValue=event;
this.getSpace(this.state.oneUrl)

  }


  getSpace(oneUrl:any): void {


    if(this.filterByLaunchStatusValue && this.filterByLandStatusValue && this.filterByYear1){

      this.userService.getSpace(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${this.filterByLandStatusValue}&land_success=${this.filterByLandStatusValue}&launch_year=${this.filterByYearValue}`).subscribe((data: any) => {
        this.pokemons = data;
        ;
        
        for(let i=0;i<data.length;i++){
  
          if(!this.launchYear.includes(data[i].launch_year))
          this.launchYear.push(data[i].launch_year);  }
      });
  return;
    }



  if(this.filterByLaunchStatusValue && this.filterByLandStatusValue){

    this.userService.getSpace(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${this.filterByLaunchStatusValue}&land_success=${this.filterByLandStatusValue}`).subscribe((data: any) => {
      this.pokemons = data;
      ;
      
      for(let i=0;i<data.length;i++){

        if(!this.launchYear.includes(data[i].launch_year))
        this.launchYear.push(data[i].launch_year);  }
    });
return;
  }




  if(this.filterByLaunchStatusValue){

    this.userService.getSpace(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${this.filterByLaunchStatusValue}`).subscribe((data: any) => {
      this.pokemons = data;
      ;
      
      for(let i=0;i<data.length;i++){

        if(!this.launchYear.includes(data[i].launch_year))
        this.launchYear.push(data[i].launch_year);
        
      
      }
    });
return
  }





    this.userService.getSpace(oneUrl).subscribe((data: any) => {
      this.pokemons = data;
      ;
      
      for(let i=0;i<data.length;i++){

        if(!this.launchYear.includes(data[i].launch_year))
        this.launchYear.push(data[i].launch_year);
        
      console.log(" "+ data[i].first_stage);
      
      }
      console.log("this.landSuccessful=data.first_stage.cores[0].land_success;"+data[0].rocket.first_stage.cores[0].land_success);
      // console.log(data.rocket.first_stage.cores.+"0"+.land_success );

      console.log(this.launchYear);
      console.log(data[0].links.mission_patch);
      
      this.state.nextUrl=data.next;

     
      
      

    
    });
  }

 

}
