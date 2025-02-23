import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarPessoaComponent } from './pages/pessoas/cadastrar-pessoa/cadastrar-pessoa.component';
import { EditarPessoaComponent } from './pages/pessoas/editar-pessoa/editar-pessoa.component';
import { ListarPessoaComponent } from './pages/pessoas/listar-pessoa/listar-pessoa.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pessoas/cadastro', component: CadastrarPessoaComponent },
  { path: 'pessoas/editar', component: EditarPessoaComponent},
  { path: 'pessoas/listar', component: ListarPessoaComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
