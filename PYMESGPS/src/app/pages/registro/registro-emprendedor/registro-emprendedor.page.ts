import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrearEmprendedor } from 'src/app/models/Crear/Usuarios/crearEmprendedor';
import * as bcrypt from 'bcryptjs';
import { EmprendedorService } from 'src/app/services/Usuarios/emprendedor/emprendedor.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro-emprendedor',
  templateUrl: './registro-emprendedor.page.html',
  styleUrls: ['./registro-emprendedor.page.scss'],
})
export class RegistroEmprendedorPage implements OnInit {
  nombreCompleto: string = '';
  correo: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private emprendedorService: EmprendedorService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async registrarEmprendedor() {
    if (!this.nombreCompleto || !this.correo || !this.username || !this.password) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);

      const nuevoEmprendedor: CrearEmprendedor = {
        nombre_completo: this.nombreCompleto,
        correo: this.correo,
        username: this.username,
        contrasena: hashedPassword,
        id_role: 2  // El rol de emprendedor es '2'
      };

      await this.emprendedorService.registrarEmprendedor(nuevoEmprendedor).toPromise();
      console.info("Emprendedor registrado con éxito.");
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error durante el registro del emprendedor:', error);
    }
  }

  private async mostrarMensaje(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: color === 'danger' ? 'warning' : 'checkmark-circle',
        }
      ]
    });
    toast.present();
  }

  volver() {
    this.router.navigate(['/login']);
  }
}
