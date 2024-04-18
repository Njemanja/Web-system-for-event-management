import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfilComponent } from './profil/profil.component';
import { SupportComponent } from './support/support.component';
import { UslugeComponent } from './usluge/usluge.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { IndexComponent } from './index/index.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ProfilUslugaComponent } from './profil-usluga/profil-usluga.component';
import { IzmenaInformacijaComponent } from './izmena-informacija/izmena-informacija.component';
import { UslugaComponent } from './usluga/usluga.component';
import { KalendarComponent } from './kalendar/kalendar.component';
import { GalerijaAdminComponent } from './galerija-admin/galerija-admin.component';
import { UpitnikComponent } from './upitnik/upitnik.component';
import { PonudaComponent } from './ponuda/ponuda.component';
import { PonudaInformacijeComponent } from './ponuda-informacije/ponuda-informacije.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            LoginComponent,
            RegisterComponent,
            AdminComponent,
            ProfilComponent,
            SupportComponent,
            UslugeComponent,
            KorisnikComponent,
            IndexComponent,
            ProfilUslugaComponent,
            IzmenaInformacijaComponent,
            UslugaComponent,
            KalendarComponent,
            GalerijaAdminComponent,
            UpitnikComponent,
            PonudaComponent,
            PonudaInformacijeComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            LeafletModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map