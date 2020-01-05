import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usuarioActions from '../actions';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class UsuarioEffects{

    constructor(
        private actions$: Actions,
        public usuariosService: UsuarioService
    ){}

    @Effect()
    cargarusuario$ =
        this.actions$.pipe(
            ofType(usuarioActions.CARGAR_USUARIO),
            switchMap( action => {
                console.log(action);
                const id = action['id'];
            
                return this.usuariosService.getUserById(id)
                .pipe(
                    map( user => new usuarioActions.CargarUsuarioSuccess(user)),
                    catchError( error => of(new usuarioActions.CargarUsuarioFail( error )) )
                );
            })
        )

    /** Effect Antiguo
     *  @Effect()
     * cargarUsuarios$ = this.actions$.ofType(usuariosActions.CARGAR_USUARIOS)
                    .pipe(
                        map( action =>{
                            console.log(action);
                            return action;
                         })
                    );
     */

}