import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';

import { ProfilComponent } from './profil/profil.component';
import { SupportComponent } from './support/support.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { UslugeComponent } from './usluge/usluge.component';
import { IndexComponent } from './index/index.component';
import { ProfilUslugaComponent } from './profil-usluga/profil-usluga.component';
import { IzmenaInformacijaComponent } from './izmena-informacija/izmena-informacija.component';
import { KalendarComponent } from './kalendar/kalendar.component';
import { UslugaComponent } from './usluga/usluga.component';
import { GalerijaAdminComponent } from './galerija-admin/galerija-admin.component';
import { UpitnikComponent } from './upitnik/upitnik.component';
import { PonudaComponent } from './ponuda/ponuda.component';
import { PonudaInformacijeComponent } from './ponuda-informacije/ponuda-informacije.component';
import { JednaPonudaComponent } from './jedna-ponuda/jedna-ponuda.component';
import { PozivnicaComponent } from './pozivnica/pozivnica.component';
import { ProslavaInformacijaComponent } from './proslava-informacija/proslava-informacija.component';
import { RasporedSedenjaComponent } from './raspored-sedenja/raspored-sedenja.component';
import { PrikazRasporedaComponent } from './prikaz-rasporeda/prikaz-rasporeda.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "profil", component: ProfilComponent},
  {path: "support", component: SupportComponent},
  {path: "korisnik", component: KorisnikComponent},
  {path: "usluge", component: UslugeComponent},
  {path: "", component: IndexComponent},
  {path: "usluge/profil", component: ProfilUslugaComponent},
  {path: "usluge/profil/informacije", component: IzmenaInformacijaComponent},
  {path: "usluge/profil/usluga", component: UslugaComponent},
  {path: "usluge/profil/kalendar", component: KalendarComponent},
  {path: "admin/galerija", component: GalerijaAdminComponent},
  { path: "upitnik/:jsondata", component: UpitnikComponent },
  { path: "ponuda", component: PonudaComponent },
  { path: "informacijeOPonudi", component: PonudaInformacijeComponent },
  { path: "jednaPonuda", component: JednaPonudaComponent },
  { path: "pozivnica", component: PozivnicaComponent },
  { path: "informacijeOProslavi", component: ProslavaInformacijaComponent },
  { path: "raspored", component: RasporedSedenjaComponent },
  { path: "raspored/:number", component: PrikazRasporedaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
