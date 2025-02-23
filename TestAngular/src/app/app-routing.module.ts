import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarPessoaComponent } from './pages/pessoas/cadastrar-pessoa/cadastrar-pessoa.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Página inicial
  { path: 'pessoas/cadastro', component: CadastrarPessoaComponent }  // Página de cadastro
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
