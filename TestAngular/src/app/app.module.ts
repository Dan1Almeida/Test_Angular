import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastrarPessoaComponent } from './pages/pessoas/cadastrar-pessoa/cadastrar-pessoa.component';
import { EditarPessoaComponent } from './pages/pessoas/editar-pessoa/editar-pessoa.component';
import { ListarPessoaComponent } from './pages/pessoas/listar-pessoa/listar-pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastrarContatoComponent } from './pages/contatos/cadastrar-contato/cadastrar-contato.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    CadastrarPessoaComponent,
    EditarPessoaComponent,
    ListarPessoaComponent,
    CadastrarContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
