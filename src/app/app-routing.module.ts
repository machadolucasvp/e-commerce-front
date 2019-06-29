import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'categorias', loadChildren: './categorias/categorias.module#CategoriasPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosPageModule' },
  { path: 'produto-details', loadChildren: './produto-details/produto-details.module#ProdutoDetailsPageModule' },
  { path: 'carrinho', loadChildren: './carrinho/carrinho.module#CarrinhoPageModule' },
  { path: 'confpedido', loadChildren: './confpedido/confpedido.module#ConfpedidoPageModule' },
  { path: 'pagamento', loadChildren: './pagamento/pagamento.module#PagamentoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
