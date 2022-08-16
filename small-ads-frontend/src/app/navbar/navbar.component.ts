import { Component, OnInit } from '@angular/core';
import { faGear, faMagnifyingGlass, faPlus, faHome} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //Solid
  faGear = faGear;
  faMagnifyingGlass = faMagnifyingGlass;
  faPlus = faPlus;
  faHome = faHome;

  //Regular
  faHeart = faHeart;
  faPaperPlane = faPaperPlane;
  
  constructor() { }

  ngOnInit(): void {
  }

}
