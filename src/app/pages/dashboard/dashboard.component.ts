import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private authService:AuthService,
    private router:Router
  ){
    this.router.navigate(['/dashboardInicio']);
  }

  rutas=[
    
    {icon:'nc-icon nc-paper-2',
     link:'/libros',
     name:'Libros',
     id:1
    },
    {icon:'nc-icon nc-badge',
     link:'/autor',
     name:'Autor',
     id:2
    },
    {icon:'nc-icon nc-planet',
     link:'/editorial',
     name:'Editorial',
     id:3
    },
    {icon:'nc-icon nc-single-02',
     link:'/usuarios',
     name:'Usuarios',
     id:4
    },
    {icon:'nc-icon nc-settings-gear-64',
     link:'/configuracion',
     name:'Configuracion',
     id:5
    },
    {icon:'nc-icon nc-backpack',
     link:'/estudiantes',
     name:'Estudiantes',
     id:6
    },
    {icon:'nc-icon nc-app',
     link:'/materias',
     name:'Materias',
     id:7
    },
    {icon:'nc-icon nc-chart-bar-32',
     link:'/reportes',
     name:'Reportes',
     id:8
    },
    {icon:'nc-icon nc-preferences-circle-rotate',
     link:'/prestamos',
     name:'Prestamos',
     id:9
    },
  ]
  logout(){
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
