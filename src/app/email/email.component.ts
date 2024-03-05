import { Component } from '@angular/core';
import { ApiHandlerService } from '../shared/services/api-handler.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailPageComponent {

  constructor(private apiService: ApiHandlerService){}

  async checkEmailMatchDB(id: string){
      let res = await this.apiService.Get(environment.api_url+'checkEmailDB').toPromise();
  }

} 
