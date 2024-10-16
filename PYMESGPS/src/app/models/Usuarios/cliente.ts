import { Role } from "./role";

export interface Cliente {
  id_cliente: number;
  nombre_completo: string;
  correo: string;
  username: string;
  contrasena: string;
  direccion: string;
  region: string;
  comuna: string;
  telefono: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  id_role: Role;
}