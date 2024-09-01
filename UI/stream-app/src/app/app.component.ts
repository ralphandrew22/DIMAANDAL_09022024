import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  get isOnVideoList(): boolean {
    return this.router.url == '/videos';
  }

  get isRootRoute(): boolean {
    return this.router.url == '/';
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.url;
    if (this.isRootRoute) {
      this.router.navigate(['videos']);
    }
  }

  upload() {
    this.router.navigate(['upload']);
  }


}
