import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usuariosActions from '../actions';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class UsuariosEffects{

    constructor(
        private actions$: Actions,
        public usuariosService: UsuarioService
    ){}

    @Effect()
    cargarusuarios$ =
        this.actions$.pipe(
            ofType(usuariosActions.CARGAR_USUARIOS),
            switchMap( () => {
                return this.usuariosService.getUsers()
                .pipe(
                    map( users => new usuariosActions.CargarUsuariosSuccess(users)),
                    catchError( error => of(new usuariosActions.CargarUsuariosFail( error )) )
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