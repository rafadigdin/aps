import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  public user: User = {};
  private loading: any;
  public nome:string = "";
  public email:string = "";
  public senha:string = "";
  public mensagem:string = "";

  showPassword = false;
  passwordToggleIcon = "eye";

  constructor( 
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {
  }

  async registrar() {
    await this.presentLoading();

    try {
      await this.authService.register(this.user).then(() => {
        this.router.navigate(['login']);
      });
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  togglePassword():void{
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
     } else {
      this.passwordToggleIcon = 'eye';
      }
    }
}
