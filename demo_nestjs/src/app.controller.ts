//aqui en el app.controller.ts se crea un controlador que se encarga de manejar las peticiones HTTP que llegan a la aplicación
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//aqui @Controller() se encarga de definir un controlador, en este caso el controlador se llama AppController
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //aqui @Get() se encarga de definir una ruta de tipo GET, en este caso la ruta es la raíz del servidor
  getHello(): string {
    return this.appService.getHello();
  }
}
