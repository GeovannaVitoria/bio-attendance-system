import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PagesModule } from './pages/pages.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css', 
  providers: [PagesModule]
})
export class App {
  protected title = 'ponto-eletronico-biometrico';
}
